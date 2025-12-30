import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	const links = [
		{ path: '/', label: 'Home' },
		{ path: '/resistors', label: 'Resistors' },
		{ path: '/capacitors', label: 'Capacitors' },
		{ path: '/diodes', label: 'Diodes' },
		{ path: '/transistors', label: 'Transistors' },
		{ path: '/all', label: 'All Parts' },
		{ path: '/picks', label: 'Our Picks' },
	];

	return (
		<header>
			<a href="/" class="headerlogo">basicp.art</a>
			<nav>
				{links.map(link => (
					<a
						key={link.path}
						href={link.path}
						class={url === link.path ? 'active' : ''}
					>
						{link.label}
					</a>
				))}
			</nav>
		</header>
	);
}
