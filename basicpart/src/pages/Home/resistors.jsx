//import preactLogo from '../../assets/preact.svg';
import R1206 from '../../assets/1206.jpg';
import R0805 from '../../assets/0805.jpg';
import R0603 from '../../assets/0603.jpg';
import R0402 from '../../assets/0402.jpg';

import './style.css';
import database from '../../assets/resistors.json';
import { JlcLink } from './JlcLink';

export function Resistors() {
	console.log(database);
	const values = Object.keys(database).sort((a,b) => {return (a-b)});
	console.log(values);
	return (
		<div class="resistors">
			
			<table>
				<thead>
					<tr>
					<td>Value</td>
					<td><img class="resistorHeader" src={R1206}></img><div>1206</div></td>
					<td><img class="resistorHeader" src={R0805}></img><div>0805</div></td>
					<td><img class="resistorHeader" src={R0603}></img><div>0603</div></td>
					<td><img class="resistorHeader" src={R0402}></img><div>0402</div></td>
					</tr>
				</thead>
				<tbody>
				{
					values.map(value => { return (
						<tr>
							<td><b>{database[value].FriendlyName} Ω</b></td>
							<td><JlcLink part={database[value]["SMD1206"]}/></td>
							<td><JlcLink part={database[value]["SMD0805"]}/></td>
							<td><JlcLink part={database[value]["SMD0603"]}/></td>
							<td><JlcLink part={database[value]["SMD0402"]}/></td>

						</tr>)
					})
				}
				</tbody>
			</table>
			
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
