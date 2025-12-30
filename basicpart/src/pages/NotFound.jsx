export function NotFound() {
	return (
		<div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
			<h1 class="page-title">404 - Page Not Found</h1>
			<p class="page-subtitle">
				The page you're looking for doesn't exist.
			</p>
			<a href="/" style={{ marginTop: 'var(--spacing-lg)', display: 'inline-block' }}>
				Go back to Home
			</a>
		</div>
	);
}
