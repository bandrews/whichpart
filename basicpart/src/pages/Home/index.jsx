//import preactLogo from '../../assets/preact.svg';
import './style.css';

export function Home() {
	return (
		<div class="home">
			
			<section>
				<Resource
					title="Resistors"
					description="Shop for surface mount resistors available in the Basic or Preferred Extended jlcpcb.com parts library"
					href="/resistors"
				/>
				<Resource
					title="Capacitors"
					description="Coming Soon"
					
				/>
				<Resource
					title="Other"
					description="A scattered, incomplete collection of other components we tend to reach for in our projects"
					href="/other"
				/>
			</section>
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}
