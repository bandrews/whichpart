import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import { Resistors } from './pages/Home/resistors.jsx';
import { OtherComponents } from './pages/Home/other.jsx';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/home" component={Home} />
					<Route path="/resistors" component={Resistors} />
					<Route path="/other" component={OtherComponents} />
					<Route default component={Resistors} />
				</Router>
			</main>
			<footer><h4>All trademarks used within are property of their respective owners.  basicp.art is not affiliated with LCSC or JLCPCB.  By using this site, you accept all risk associated with use, including the risk of inaccurate information in the parts table.</h4></footer>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
