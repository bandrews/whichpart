#!/usr/bin/env node
/**
 * Scrape JLCPCB basic parts data using Playwright
 *
 * The JLCPCB basic-parts URL currently returns both "Basic" (`base`) and
 * "Preferred Extended" (`expand`) parts. This script validates those source
 * tier codes, paginates through the complete result set, and refuses to write
 * a snapshot if any page is missing or inconsistent.
 *
 * Usage: npm run scrape
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../raw-data');
const PARTS_URL = 'https://jlcpcb.com/parts/basic_parts';
const PARTS_API = '/api/overseas-pcb-order/v1/shoppingCart/smtGood/selectSmtComponentList/v2';
const PAGE_SIZE = 100;

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPageData(page, currentPage) {
	const requestPage = async ({ apiUrl, currentPage, pageSize }) => {
		const payload = {
			currentPage,
			pageSize,
			searchType: 2,
			keyword: null,
			componentLibraryType: 'base',
			presaleType: '',
			preferredComponentFlag: true,
			stockFlag: null,
			stockSort: null,
			firstSortName: null,
			secondSortName: null,
			componentBrand: null,
			componentSpecification: null,
			componentAttributes: [],
			firstSortNameList: [],
			componentBrandList: [],
			componentSpecificationList: [],
			componentAttributeList: [],
			searchSource: 'search',
			presaleTypes: [],
			componentLibTypes: ['base'],
			pcbAType: null,
		};
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(payload),
			signal: AbortSignal.timeout(60000),
		});
		if (!response.ok) {
			throw new Error(`JLCPCB API returned HTTP ${response.status}`);
		}
		const body = await response.json();
		if (body.code !== 200 || !body.data?.componentPageInfo) {
			throw new Error(`Unexpected JLCPCB API response code: ${body.code}`);
		}
		return body.data.componentPageInfo;
	};
	const params = { apiUrl: page ? PARTS_API : new URL(PARTS_API, PARTS_URL).href, currentPage, pageSize: PAGE_SIZE };
	const result = page ? await page.evaluate(requestPage, params) : await requestPage(params);

	const tierNames = {
		base: 'basic',
		expand: 'preferred',
	};
	return {
		total: result.total,
		currentPage: result.pageNum,
		pageSize: result.pageSize,
		parts: (result.list || []).map(part => ({
			partNumber: part.componentCode,
			manufacturerPart: part.componentModelEn,
			manufacturer: part.componentBrandEn,
			category: part.componentTypeEn,
			firstSort: part.firstSortName,
			secondSort: part.secondSortName,
			package: part.componentSpecificationEn,
			description: part.describe,
			attributes: part.attributes || [],
			stock: part.stockCount,
			prices: part.componentPrices || [],
			minOrder: part.minPurchaseNum,
			lcscUrl: part.lcscGoodsUrl,
			datasheetUrl: part.dataManualUrl,
			libraryType: part.componentLibraryType,
			tier: tierNames[part.componentLibraryType] || 'unknown',
		})),
	};
}

function validatePageData(pageData, expectedTotal = null) {
	if (!pageData || !Array.isArray(pageData.parts)) {
		throw new Error('JLCPCB page data was not found in the expected API response shape');
	}
	if (!Number.isInteger(pageData.total) || pageData.total <= 0) {
		throw new Error(`Invalid catalog total: ${pageData.total}`);
	}
	if (expectedTotal !== null && pageData.total !== expectedTotal) {
		throw new Error(`Catalog total changed during pagination (${expectedTotal} -> ${pageData.total})`);
	}
	if (!pageData.parts.length) {
		throw new Error(`Page ${pageData.currentPage || '?'} contained no parts`);
	}

	for (const part of pageData.parts) {
		if (!/^C\d+$/.test(part.partNumber || '')) {
			throw new Error(`Invalid or missing JLCPCB part number: ${part.partNumber}`);
		}
		if (!['base', 'expand'].includes(part.libraryType)) {
			throw new Error(
				`Unexpected library type "${part.libraryType}" for ${part.partNumber}; ` +
				'the Basic/Preferred filter or upstream schema may have changed'
			);
		}
	}
}

async function scrapeBasicParts() {
	console.log('Starting JLCPCB basic parts scraper...\n');

	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	const transport = process.env.JLCPCB_SCRAPER_TRANSPORT || 'browser';
	if (!['browser', 'http'].includes(transport)) {
		throw new Error(`Unknown JLCPCB_SCRAPER_TRANSPORT: ${transport}`);
	}
	// The public catalog endpoint can also be fetched without a browser session.
	// HTTP mode keeps the same request, normalization, and completeness checks.
	const browser = transport === 'browser' ? await chromium.launch({ headless: true }) : null;
	const context = browser ? await browser.newContext({
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
	}) : null;
	const page = context ? await context.newPage() : null;
	const allParts = new Map();

	try {
		console.log(`Loading ${PARTS_URL}...`);
		if (page) await page.goto(PARTS_URL, { waitUntil: 'networkidle', timeout: 60000 });

		if (page && process.env.SCRAPER_DEBUG_SCREENSHOTS === '1') {
			const screenshotPath = path.join(OUTPUT_DIR, 'page-initial.png');
			await page.screenshot({ path: screenshotPath, fullPage: true });
			console.log(`Saved debug screenshot to ${screenshotPath}`);
		}

		let pageData = await fetchPageData(page, 1);
		validatePageData(pageData);

		const expectedTotal = pageData.total;
		const pageSize = pageData.pageSize || PAGE_SIZE;
		const totalPages = Math.ceil(expectedTotal / pageSize);

		console.log(`\nFound ${expectedTotal} total parts, ${pageSize} per page, ${totalPages} pages\n`);

		// Scrape page 1
		console.log(`Scraping page 1/${totalPages}...`);
		for (const part of pageData.parts) {
			allParts.set(part.partNumber, part);
		}
		console.log(`  Added ${pageData.parts.length} parts (total: ${allParts.size})`);

		// Fetch remaining pages with the tier filter in the API payload. Clicking
		// the site's pagination control drops this hidden filter.
		for (let targetPage = 2; targetPage <= totalPages; targetPage++) {
			console.log(`Scraping page ${targetPage}/${totalPages}...`);

			pageData = await fetchPageData(page, targetPage);
			validatePageData(pageData, expectedTotal);
			if (pageData.currentPage !== targetPage) {
				throw new Error(
					`Requested catalog page ${targetPage} but received page ${pageData.currentPage}`
				);
			}

			let newCount = 0;
			for (const part of pageData.parts) {
				if (!allParts.has(part.partNumber)) {
					allParts.set(part.partNumber, part);
					newCount++;
				}
			}
			if (newCount !== pageData.parts.length) {
				throw new Error(
					`Page ${targetPage} contained duplicate parts: ` +
					`${pageData.parts.length - newCount} already seen`
				);
			}
			console.log(`  Added ${newCount} new parts (total: ${allParts.size})`);
			await sleep(250);
		}

		const partsArray = Array.from(allParts.values());
		if (partsArray.length !== expectedTotal) {
			throw new Error(
				`Incomplete scrape: collected ${partsArray.length} of ${expectedTotal} expected parts`
			);
		}

		const tierCounts = partsArray.reduce((counts, part) => {
			counts[part.tier] = (counts[part.tier] || 0) + 1;
			return counts;
		}, {});
		if (!tierCounts.basic || !tierCounts.preferred || tierCounts.unknown) {
			throw new Error(`Unexpected tier coverage: ${JSON.stringify(tierCounts)}`);
		}

		const timestamp = new Date().toISOString().split('T')[0];
		const outputPath = path.join(OUTPUT_DIR, `jlcpcb-basic-parts-${timestamp}.json`);
		const tempPath = `${outputPath}.tmp`;
		const snapshot = {
			scrapedAt: new Date().toISOString(),
			totalExpected: expectedTotal,
			totalScraped: partsArray.length,
			tierCounts,
			parts: partsArray,
		};
		fs.writeFileSync(tempPath, JSON.stringify(snapshot, null, 2));
		fs.renameSync(tempPath, outputPath);

		console.log(`\nScraping complete!`);
		console.log(`Total: ${partsArray.length}/${expectedTotal} parts`);
		console.log(`Saved to: ${outputPath}`);

		// Category summary
		const categories = {};
		for (const part of partsArray) {
			categories[part.category || 'Unknown'] = (categories[part.category || 'Unknown'] || 0) + 1;
		}
		console.log('\nParts by category:');
		for (const [cat, count] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
			console.log(`  ${cat}: ${count}`);
		}

	} catch (error) {
		console.error('Error:', error);
		throw error;
	} finally {
		if (browser) await browser.close();
	}
}

scrapeBasicParts()
	.catch(error => {
		console.error(`Scrape failed: ${error.stack || error.message}`);
		process.exitCode = 1;
	});
