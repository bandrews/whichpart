import { ComponentGrid } from '../components/ComponentGrid.jsx';
import { TierLegend } from '../components/TierLegend.jsx';
import resistorData from '../data/resistors.json';

// Import package images
import img0402 from '../assets/0402.jpg';
import img0603 from '../assets/0603.jpg';
import img0805 from '../assets/0805.jpg';
import img1206 from '../assets/1206.jpg';

const columnImages = {
	'0402': img0402,
	'0603': img0603,
	'0805': img0805,
	'1206': img1206,
};

const columnLabels = {
	'0402': '0402',
	'0603': '0603',
	'0805': '0805',
	'1206': '1206',
};

/**
 * Sort resistor values numerically
 * Handles decimal values (0.1, 2.2, 4.7, etc.) and integer values
 */
function sortResistorValues(keys) {
	return keys.sort((a, b) => {
		const numA = parseFloat(a);
		const numB = parseFloat(b);
		return numA - numB;
	});
}

export function Resistors() {
	return (
		<div>
			<h1 class="page-title">Resistors</h1>
			<p class="page-subtitle">
				SMD chip resistors available as JLCPCB basic parts.
				All values are 1% tolerance unless otherwise noted.
			</p>

			<TierLegend />

			<ComponentGrid
				data={resistorData}
				columns={['0402', '0603', '0805', '1206']}
				columnImages={columnImages}
				columnLabels={columnLabels}
				sortRows={sortResistorValues}
				unit="Ω"
				renderRowHeader={(row) => (
					<strong>{row.display}Ω</strong>
				)}
			/>
		</div>
	);
}
