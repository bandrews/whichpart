import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	return (<>
		<header>
			<div class="headerlogo">basicp.art</div>
			<nav>
				<a href="/home" class={url == '/home' && 'active'}>
					Home
				</a>
				<a href="/resistors" class={(url == '/resistors' || url == '/') && 'active'}>
					Resistors
				</a>
				<a href="/other" class={url == '/other' && 'active'}>
					Other
				</a>
			</nav>
		</header>
		</>
	);
}
