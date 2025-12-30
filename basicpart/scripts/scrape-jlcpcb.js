#!/usr/bin/env node
/**
 * Scrape JLCPCB basic parts data using Playwright
 *
 * This script applies the "Basic" and "Promotional Extended" filters
 * on the JLCPCB parts page, then paginates through all results.
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

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function extractPageData(page) {
	return await page.evaluate(() => {
		const data = window.__NUXT__?.data?.[0]?.tableInfo;
		if (!data) return null;

		return {
			total: data.total,
			currentPage: data.pageNum,
			pageSize: data.pageSize,
			parts: (data.tableList || []).map(part => ({
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
				tier: part.componentLibraryType === 'base' ? 'basic' : 'preferred',
			})),
		};
	});
}

async function scrapeBasicParts() {
	console.log('Starting JLCPCB basic parts scraper...\n');

	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	const browser = await chromium.launch({ headless: true });
	// const browser = await chromium.launch({ headless: false, slowMo: 500 }); // Debug mode
	const context = await browser.newContext({
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
	});

	const page = await context.newPage();
	const allParts = new Map();

	try {
		console.log(`Loading ${PARTS_URL}...`);
		await page.goto(PARTS_URL, { waitUntil: 'networkidle', timeout: 60000 });

		await page.waitForFunction(
			() => window.__NUXT__?.data?.[0]?.tableInfo?.tableList?.length > 0,
			{ timeout: 30000 }
		);
		await sleep(2000);

		// Take a screenshot for debugging
		await page.screenshot({ path: path.join(OUTPUT_DIR, 'page-initial.png'), fullPage: true });
		console.log('Saved screenshot to raw-data/page-initial.png');

		// Apply the Basic and Promotional Extended filters
		console.log('Applying Basic and Promotional Extended filters...');

		try {
			// First, look for and click a filter expand button if there is one
			// Common patterns: "Filter", "More Filters", an icon, etc.
			const filterButtons = await page.$$('[class*="filter"], button:has-text("Filter"), [class*="expand"]');
			console.log(`  Found ${filterButtons.length} potential filter buttons`);

			// Look for the filter section - it might be a collapsible panel
			// Try to find the Stock Type section specifically
			const stockTypeSection = await page.$('text=Stock Type');
			if (stockTypeSection) {
				console.log('  Found "Stock Type" section');
				// Click it to expand if needed
				await stockTypeSection.click().catch(() => {});
				await sleep(500);
			}

			// Take another screenshot after trying to expand
			await page.screenshot({ path: path.join(OUTPUT_DIR, 'page-after-expand.png'), fullPage: true });

			// Now try to find the checkboxes
			// Look for label elements containing "Basic" and checkbox inputs near them
			const basicLabel = await page.$('label:has-text("Basic")');
			const promoLabel = await page.$('label:has-text("Promotional")');

			if (basicLabel) {
				await basicLabel.click();
				console.log('  Clicked "Basic" label');
			}

			if (promoLabel) {
				await promoLabel.click();
				console.log('  Clicked "Promotional" label');
			}

			// Alternative: look for el-checkbox components
			const checkboxes = await page.$$('.el-checkbox');
			console.log(`  Found ${checkboxes.length} el-checkbox elements`);

			// Look for an Apply button and click it
			await sleep(500);
			const applyButton = await page.$('button:has-text("Apply")');
			if (applyButton) {
				await applyButton.click();
				console.log('  Clicked Apply button');
				await sleep(2000);

				await page.waitForFunction(
					() => window.__NUXT__?.data?.[0]?.tableInfo?.tableList?.length > 0,
					{ timeout: 15000 }
				);
			} else {
				console.log('  No Apply button found');
			}

			// Final screenshot
			await page.screenshot({ path: path.join(OUTPUT_DIR, 'page-after-apply.png'), fullPage: true });

		} catch (filterErr) {
			console.log(`  Filter application error: ${filterErr.message}`);
			console.log('  Continuing with current state...');
		}

		// Get initial data after filters
		let pageData = await extractPageData(page);
		if (!pageData) {
			throw new Error('Failed to extract initial page data');
		}

		const expectedTotal = pageData.total;
		const pageSize = pageData.pageSize || 25;
		const totalPages = Math.ceil(expectedTotal / pageSize);

		console.log(`\nFound ${expectedTotal} total parts, ${pageSize} per page, ${totalPages} pages\n`);

		// Scrape page 1
		console.log(`Scraping page 1/${totalPages}...`);
		for (const part of pageData.parts) {
			allParts.set(part.partNumber, part);
		}
		console.log(`  Added ${pageData.parts.length} parts (total: ${allParts.size})`);

		// Scrape remaining pages
		for (let targetPage = 2; targetPage <= totalPages; targetPage++) {
			console.log(`Scraping page ${targetPage}/${totalPages}...`);

			try {
				const currentFirstPart = pageData.parts[0]?.partNumber;

				// Click next button
				const nextBtn = await page.$('.el-pagination .btn-next:not([disabled])');
				if (!nextBtn) {
					console.log('  No next button found, stopping');
					break;
				}

				await nextBtn.click();
				await sleep(1500);

				// Wait for data to change
				await page.waitForFunction(
					(oldFirst) => {
						const data = window.__NUXT__?.data?.[0]?.tableInfo;
						const newFirst = data?.tableList?.[0]?.componentCode;
						return newFirst && newFirst !== oldFirst;
					},
					currentFirstPart,
					{ timeout: 10000 }
				);

				// Extract new data
				pageData = await extractPageData(page);

				if (!pageData) {
					console.log(`  Failed to extract data for page ${targetPage}`);
					continue;
				}

				// Check if we're still in the filtered view
				if (Math.abs(pageData.total - expectedTotal) > 100) {
					console.log(`  WARNING: Total changed from ${expectedTotal} to ${pageData.total}`);
					console.log(`  Filter may have been lost. Stopping.`);
					break;
				}

				// Add parts
				let newCount = 0;
				for (const part of pageData.parts) {
					if (!allParts.has(part.partNumber)) {
						allParts.set(part.partNumber, part);
						newCount++;
					}
				}
				console.log(`  Added ${newCount} new parts (total: ${allParts.size})`);

			} catch (err) {
				console.log(`  Error on page ${targetPage}: ${err.message}`);
			}

			await sleep(300);
		}

		// Save results
		const partsArray = Array.from(allParts.values());
		const timestamp = new Date().toISOString().split('T')[0];
		const outputPath = path.join(OUTPUT_DIR, `jlcpcb-basic-parts-${timestamp}.json`);

		fs.writeFileSync(outputPath, JSON.stringify({
			scrapedAt: new Date().toISOString(),
			totalExpected: expectedTotal,
			totalScraped: partsArray.length,
			parts: partsArray,
		}, null, 2));

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
		await browser.close();
	}
}

scrapeBasicParts()
	.then(() => process.exit(0))
	.catch(() => process.exit(1));
