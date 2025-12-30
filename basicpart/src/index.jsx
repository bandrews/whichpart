import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { TierFilterProvider } from './context/TierFilter.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Resistors } from './pages/Resistors.jsx';
import { CeramicCapacitors } from './pages/CeramicCapacitors.jsx';
import { ElectrolyticCapacitors } from './pages/ElectrolyticCapacitors.jsx';
import { Diodes } from './pages/Diodes.jsx';
import { Transistors } from './pages/Transistors.jsx';
import { OtherComponents } from './pages/OtherComponents.jsx';
import { AllBasicParts } from './pages/AllBasicParts.jsx';
import { PartDetails } from './pages/PartDetails.jsx';
import { NotFound } from './pages/NotFound.jsx';

import './styles/global.css';
import './styles/components.css';

export function App() {
	return (
		<TierFilterProvider>
			<LocationProvider>
				<Header />
				<main>
					<Router>
						<Route path="/" component={Home} />
						<Route path="/resistors" component={Resistors} />
						<Route path="/capacitors" component={CeramicCapacitors} />
						<Route path="/electrolytic" component={ElectrolyticCapacitors} />
						<Route path="/diodes" component={Diodes} />
						<Route path="/transistors" component={Transistors} />
						<Route path="/picks" component={OtherComponents} />
						<Route path="/all" component={AllBasicParts} />
						<Route path="/part/:id" component={PartDetails} />
						<Route default component={NotFound} />
					</Router>
				</main>
				<Footer />
			</LocationProvider>
		</TierFilterProvider>
	);
}

render(<App />, document.getElementById('app'));
