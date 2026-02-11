import { useLocation } from 'preact-iso';
import { useRef, useEffect } from 'preact/hooks';

export function Header() {
	const { url } = useLocation();
	const headerRef = useRef();

	useEffect(() => {
		const header = headerRef.current;
		if (!header) return;

		const observer = new ResizeObserver(() => {
			document.documentElement.style.setProperty(
				'--header-height',
				`${header.offsetHeight}px`
			);
		});
		observer.observe(header);
		return () => observer.disconnect();
	}, []);

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
		<header ref={headerRef}>
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
