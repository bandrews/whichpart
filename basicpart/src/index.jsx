import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Resistors } from './pages/Resistors.jsx';
import { CeramicCapacitors } from './pages/CeramicCapacitors.jsx';
import { ElectrolyticCapacitors } from './pages/ElectrolyticCapacitors.jsx';
import { Diodes } from './pages/Diodes.jsx';
import { OtherComponents } from './pages/OtherComponents.jsx';
import { NotFound } from './pages/NotFound.jsx';

import './styles/global.css';
import './styles/components.css';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/resistors" component={Resistors} />
					<Route path="/capacitors" component={CeramicCapacitors} />
					<Route path="/electrolytic" component={ElectrolyticCapacitors} />
					<Route path="/diodes" component={Diodes} />
					<Route path="/other" component={OtherComponents} />
					<Route default component={NotFound} />
				</Router>
			</main>
			<Footer />
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
