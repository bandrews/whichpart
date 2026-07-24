// Import kawaii component images
import imgResistor from '../assets/resistor.png';
import imgCeramicCap from '../assets/ceramiccapacitor.png';
import imgElectrolyticCap from '../assets/electrolyticcapacitor.png';
import imgDiode from '../assets/diode.png';
import imgTransistor from '../assets/transistor.png';
import imgIC from '../assets/integratedcircuit.png';
import imgBucket from '../assets/bucketoparts.png';
import partsIndex from '../data/parts-index.json';

export function Home() {
	const catalogPartCount = Object.keys(partsIndex).length;
	const categories = [
		{
			title: 'Resistors',
			description: 'SMD chip resistors in 0402, 0603, 0805, and 1206 packages',
			href: '/resistors',
			image: imgResistor,
			ready: true,
		},
		{
			title: 'Ceramic Capacitors',
			description: 'MLCC capacitors with various voltage ratings and dielectrics',
			href: '/capacitors',
			image: imgCeramicCap,
			ready: true,
		},
		{
			title: 'Electrolytic Capacitors',
			description: 'Tantalum capacitors (limited basic options)',
			href: '/electrolytic',
			image: imgElectrolyticCap,
			ready: true,
		},
		{
			title: 'Diodes',
			description: 'Schottky, Zener, TVS, and switching diodes',
			href: '/diodes',
			image: imgDiode,
			ready: true,
		},
		{
			title: 'Transistors',
			description: 'BJTs, MOSFETs, and Darlington arrays',
			href: '/transistors',
			image: imgTransistor,
			ready: true,
		},
		{
			title: 'All Basic & Preferred Parts',
			description: `Browse all ${catalogPartCount} Basic and Preferred Extended parts from JLCPCB`,
			href: '/all',
			image: imgBucket,
			ready: true,
		},
		{
			title: 'Our Picks',
			description: 'Curated selection of useful ICs, connectors, and more',
			href: '/picks',
			image: imgIC,
			ready: true,
		},
	];

	return (
		<div>
			<h1 class="page-title">JLCPCB Basic & Preferred Parts Finder</h1>
			<p class="page-subtitle">
				Find basic and preferred extended parts for your PCB designs.
				Click a part number for details; Shift-click or use the copy button to copy it.
			</p>

			<div class="home-grid">
				{categories.map(cat => (
					<a
						key={cat.href}
						href={cat.ready ? cat.href : null}
						class={`home-card ${!cat.ready ? 'coming-soon' : ''}`}
					>
						{cat.image && (
							<img
								src={cat.image}
								alt={cat.title}
								class="home-card-image"
							/>
						)}
						<h2>{cat.title}</h2>
						<p>{cat.description}</p>
						{!cat.ready && <p><em>Coming Soon</em></p>}
					</a>
				))}
			</div>
		</div>
	);
}
