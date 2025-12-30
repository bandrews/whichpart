/**
 * Utility functions for formatting component values
 */

/**
 * Parse a capacitance string and return value in farads
 * @param {string} display - Display string like "100pF", "1nF", "4.7uF"
 * @returns {number} Value in farads
 */
export function parseCapacitance(display) {
	if (!display) return 0;
	const match = display.match(/^([\d.]+)\s*(p|n|µ|u)?F?$/i);
	if (!match) return 0;

	let value = parseFloat(match[1]);
	const unit = match[2]?.toLowerCase();

	switch (unit) {
		case 'p': return value * 1e-12;
		case 'n': return value * 1e-9;
		case 'u':
		case 'µ': return value * 1e-6;
		default: return value;
	}
}

/**
 * Format capacitance with unit conversion shown in parentheses
 * @param {string} display - Original display string like "100pF"
 * @returns {object} { main: "100pF", alt: "0.1nF" }
 */
export function formatCapacitanceWithAlt(display) {
	if (!display) return { main: '', alt: null };

	const farads = parseCapacitance(display);
	if (farads === 0) return { main: display, alt: null };

	const match = display.match(/^([\d.]+)\s*(p|n|µ|u)?F?$/i);
	if (!match) return { main: display, alt: null };

	const unit = match[2]?.toLowerCase();
	let alt = null;

	if (unit === 'p') {
		// pF - show nF if >= 100pF
		const nF = farads * 1e9;
		if (nF >= 0.1) {
			alt = formatNumber(nF) + 'nF';
		}
	} else if (unit === 'n') {
		// nF - show µF if >= 100nF, or pF if < 1nF
		const uF = farads * 1e6;
		const pF = farads * 1e12;
		if (uF >= 0.1) {
			alt = formatNumber(uF) + 'µF';
		} else if (pF < 1000) {
			alt = formatNumber(pF) + 'pF';
		}
	} else if (unit === 'u' || unit === 'µ') {
		// µF - show nF if < 1µF
		const nF = farads * 1e9;
		if (nF < 1000) {
			alt = formatNumber(nF) + 'nF';
		}
	}

	return { main: display, alt };
}

/**
 * Format a number nicely (remove trailing zeros)
 */
function formatNumber(num) {
	if (num >= 100) return Math.round(num).toString();
	if (num >= 10) return num.toFixed(1).replace(/\.0$/, '');
	if (num >= 1) return num.toFixed(2).replace(/\.?0+$/, '');
	return num.toPrecision(2).replace(/\.?0+$/, '');
}

/**
 * Sort capacitance values by actual value
 * @param {string[]} keys - Array of keys from capacitor data
 * @param {object} data - The capacitor data object
 * @returns {string[]} Sorted keys
 */
export function sortCapacitanceKeys(keys, data) {
	return keys.sort((a, b) => {
		const displayA = data[a]?.display || '';
		const displayB = data[b]?.display || '';
		return parseCapacitance(displayA) - parseCapacitance(displayB);
	});
}
