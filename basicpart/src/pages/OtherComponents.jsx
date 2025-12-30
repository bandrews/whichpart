import { useState } from 'preact/hooks';
import { JlcLink } from '../components/JlcLink.jsx';
import { TierLegend } from '../components/TierLegend.jsx';
import componentData from '../data/other-components.json';
import imgIC from '../assets/integratedcircuit.png';

export function OtherComponents() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	const categories = ['All', ...componentData.categories.map(c => c.name)];

	const filteredComponents = componentData.categories
		.filter(cat => selectedCategory === 'All' || cat.name === selectedCategory)
		.map(cat => ({
			...cat,
			items: cat.items.filter(item =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.part.toLowerCase().includes(searchTerm.toLowerCase())
			),
		}))
		.filter(cat => cat.items.length > 0);

	const totalParts = componentData.categories.reduce((sum, cat) => sum + cat.items.length, 0);

	return (
		<div>
			<div class="page-header">
				<img src={imgIC} alt="" class="page-header-image" />
				<div class="page-header-text">
					<h1 class="page-title">Our Picks</h1>
					<p class="page-subtitle">
						Curated selection of {totalParts} useful ICs, connectors, and other components. These are our recommendations for common design needs.
					</p>
				</div>
			</div>

			<TierLegend />

			{/* Search and filter */}
			<div class="filter-bar">
				<div class="filter-group" style={{ flex: 1 }}>
					<label htmlFor="search">Search</label>
					<input
						id="search"
						type="text"
						placeholder="Search components..."
						value={searchTerm}
						onInput={(e) => setSearchTerm(e.target.value)}
						style={{
							padding: 'var(--spacing-xs) var(--spacing-sm)',
							border: '1px solid var(--border)',
							borderRadius: 'var(--radius-sm)',
							backgroundColor: 'var(--bg-primary)',
							color: 'var(--text-primary)',
							fontSize: '0.875rem',
							width: '100%',
							maxWidth: '300px',
						}}
					/>
				</div>
				<div class="filter-group">
					<label htmlFor="category">Category</label>
					<select
						id="category"
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						{categories.map(cat => (
							<option key={cat} value={cat}>{cat}</option>
						))}
					</select>
				</div>
			</div>

			{/* Component tables by category */}
			{filteredComponents.map(cat => (
				<div key={cat.name} style={{ marginBottom: 'var(--spacing-xl)' }}>
					<h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>
						{cat.name}
					</h2>
					<div class="component-grid-container">
						<table class="component-grid">
							<thead>
								<tr>
									<th>Component</th>
									<th>Description</th>
									<th>Package</th>
									<th>Part Number</th>
								</tr>
							</thead>
							<tbody>
								{cat.items.map(item => (
									<tr key={item.part}>
										<td><strong>{item.name}</strong></td>
										<td>
											{item.description}
											{item.notes && (
												<div class="component-notes">
													{item.notes}
												</div>
											)}
										</td>
										<td>{item.package}</td>
										<td>
											<JlcLink
												part={item.part}
												tier={item.tier}
												info={`${item.name} - ${item.description}`}
												description={item.notes}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			))}

			{filteredComponents.length === 0 && (
				<p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--spacing-xl)' }}>
					No components found matching your search.
				</p>
			)}

			<p style={{ marginTop: 'var(--spacing-lg)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
				Data curated from JLCPCB basic parts. Last updated: {componentData.meta?.lastUpdated}.
			</p>
		</div>
	);
}
