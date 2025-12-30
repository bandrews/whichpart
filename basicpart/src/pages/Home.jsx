export function Home() {
	const categories = [
		{
			title: 'Resistors',
			description: 'SMD chip resistors in 0402, 0603, 0805, and 1206 packages',
			href: '/resistors',
			ready: true,
		},
		{
			title: 'Ceramic Capacitors',
			description: 'MLCC capacitors with various voltage ratings and dielectrics',
			href: '/capacitors',
			ready: true,
		},
		{
			title: 'Electrolytic Capacitors',
			description: 'Tantalum capacitors (limited basic options)',
			href: '/electrolytic',
			ready: true,
		},
		{
			title: 'Diodes',
			description: 'Schottky, Zener, TVS, and switching diodes',
			href: '/diodes',
			ready: true,
		},
		{
			title: 'Transistors',
			description: 'BJTs, MOSFETs, and Darlington arrays',
			href: '/transistors',
			ready: true,
		},
		{
			title: 'All Basic Parts',
			description: 'Browse all 1585 basic and preferred parts from JLCPCB',
			href: '/all',
			ready: true,
		},
		{
			title: 'Our Picks',
			description: 'Curated selection of useful ICs, connectors, and more',
			href: '/picks',
			ready: true,
		},
	];

	return (
		<div>
			<h1 class="page-title">JLCPCB Basic Parts Finder</h1>
			<p class="page-subtitle">
				Find basic and preferred extended parts for your PCB designs.
				Click a part number to copy it to your clipboard.
			</p>

			<div class="home-grid">
				{categories.map(cat => (
					<a
						key={cat.href}
						href={cat.ready ? cat.href : null}
						class={`home-card ${!cat.ready ? 'coming-soon' : ''}`}
					>
						<h2>{cat.title}</h2>
						<p>{cat.description}</p>
						{!cat.ready && <p><em>Coming Soon</em></p>}
					</a>
				))}
			</div>
		</div>
	);
}
