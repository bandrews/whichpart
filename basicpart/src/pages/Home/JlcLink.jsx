//import preactLogo from '../../assets/preact.svg';
import R1206 from '../../assets/1206.jpg';
import R0805 from '../../assets/0805.jpg';
import R0603 from '../../assets/0603.jpg';
import R0402 from '../../assets/0402.jpg';

import './style.css';
import database from '../../assets/resistors.json';

export function JlcLink(props) {
	
	return (
		<div class="hover-copy" onClick={() => {navigator.clipboard.writeText(props.part)}}>
			{props.part}
		</div>
	);
}
