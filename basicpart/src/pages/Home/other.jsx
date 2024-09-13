import './style.css';
import database from '../../assets/resistors.json';
import { JlcLink } from './JlcLink';

export function OtherComponents() {
	return (
		<div class="otherComponents">
			
			<table>
				<thead>
					<tr>
					<td>Function</td>
					<td>Manufacturer</td>
					<td>Component</td>
					<td>Footprint</td>
					<td>Part Number</td>
					<td>Notes</td>
					</tr>
				</thead>
					<tr>
						<td>I2C I/O Expander</td>
						<td>Hgsemi</td>
						<td>PCF8574M/TR</td>
						<td>SOP-16-150</td>
						<td><JlcLink part="C5310792"></JlcLink></td>				
					</tr>
					<tr>
						<td>RS485 Transciever</td>
						<td>Hgsemi</td>
						<td>SP3485EIMM/TR</td>
						<td>MSOP-8</td>
						<td><JlcLink part="C5310822"></JlcLink></td>
					</tr>
					<tr>
						<td>5V ESD Protection TVS Diode Array</td>
						<td>ProTek Devices</td>
						<td>SRV05-4-P-T7</td>
						<td>SOT-23-6</td>
						<td><JlcLink part="C85364"></JlcLink></td>
					</tr>
					<tr>
						<td>Addressable LED</td>
						<td>XINGLIGHT</td>
						<td>XL-1010RGBC-WS2812B</td>
						<td>1mm x 1mm</td>
						<td><JlcLink part="C5349953"></JlcLink></td>
					</tr>
					<tr>
						<td>Connector (JST-SH 4P / Qwiic)</td>
						<td>BOOMELE</td>
						<td>1.0T-4P</td>
						<td>SMD P=1mm Top Entry</td>
						<td><JlcLink part="C145961"></JlcLink></td>
					</tr>
					<tr>
						<td>Connector (JST-SH 3P / RP Debug)</td>
						<td>BOOMELE</td>
						<td>1.0T-3P</td>
						<td>SMD P=1mm Top Entry</td>
						<td><JlcLink part="C145960"></JlcLink></td>
					</tr>
					<tr>
						<td>Microcontroller</td>
						<td>Raspberry Pi</td>
						<td>RP2040</td>
						<td>LQFN-56 7x7</td>
						<td><JlcLink part="C2040"></JlcLink></td>
					</tr>
					<tr>
						<td>12Mhz Crystal</td>
						<td>YXC</td>
						<td>X322512MSB4SI</td>
						<td>SMD3225-4P</td>
						<td><JlcLink part="C9002"></JlcLink></td>
						<td>Note:  Not RP foundation's recommended crystal, but seems to work okay in practice?  YMMV</td>
					</tr>

					<tr>
						<td>16MB (128MBit) SPI Flash</td>
						<td>Winbond Elec</td>
						<td>W25Q128JVSIQ</td>
						<td>SMD3225-4P</td>
						<td><JlcLink part="C97521"></JlcLink></td>
					</tr>
					<tr>
						<td>2Kbit EUI-48 EEPROM (MAC Address)</td>
						<td>Microchip</td>
						<td>24AA025E48T-I/OT</td>
						<td>SOT-23-6</td>
						<td><JlcLink part="C129895"></JlcLink></td>
					</tr>
					<tr>
						<td>TF Card Socket</td>
						<td>Shou Han</td>
						<td>TF PUSH</td>
						<td>SMD</td>
						<td><JlcLink part="C393941"></JlcLink></td>
					</tr>

					<tr>
						<td>USB-C Connector (20V/5A 16P)</td>
						<td>HCTL</td>
						<td>HC-TYPE-C-16P-01A</td>
						<td>USB-C SMD</td>
						<td><JlcLink part="C2894897"></JlcLink></td>
					</tr>

					
					<tr>
						<td>SPI Ethernet PHY+MAC</td>
						<td>Wiznet</td>
						<td>W5500</td>
						<td>LQFP-48_7x7</td>
						<td><JlcLink part="C32843"></JlcLink></td>
					</tr>
					<tr>
						<td>25Mhz Crystal</td>
						<td>YXC</td>
						<td>X322525MOB4SI</td>
						<td>SMD3225-4P</td>
						<td><JlcLink part="C9006"></JlcLink></td>
						<td>Note:  Works well with W5500</td>
					</tr>
					<tr>
						<td>10/100 Ethernet Connector</td>
						<td>HanRun</td>
						<td>HR913550A</td>
						<td>Through Hole</td>
						<td><JlcLink part="C163507"></JlcLink></td>
						<td>Note:  Includes magnetics and LEDs, but not PoE compatible.</td>
					</tr>

					<tr>
						<td>Optocoupler (AC, 4-channel)</td>
						<td>Everlight</td>
						<td>ELQ3H4(TA)-G</td>
						<td>SSOP-16-1.27mm</td>
						<td><JlcLink part="C150957"></JlcLink></td>
					</tr>
					<tr>
						<td>Darlington high current driver array</td>
						<td>Texas Instruments</td>
						<td>ULN2003ADR</td>
						<td>SOIC-16</td>
						<td><JlcLink part="C7512"></JlcLink></td>
					</tr>
					<tr>
						<td>3V to 5V Unidirectional Level Shifter</td>
						<td>Texas Instruments</td>
						<td>SN74AHCT1G125DCKR</td>
						<td>SC-70-5</td>
						<td><JlcLink part="C350557"></JlcLink></td>
					</tr>
					<tr>
						<td>LED (0603, Red)</td>
						<td>Hubei Kento Elec</td>
						<td>KT-0603R</td>
						<td>0603</td>
						<td><JlcLink part="C2286"></JlcLink></td>
					</tr>
					<tr>
						<td>LED (0603, White)</td>
						<td>Hubei Kento Elec</td>
						<td>KT-0603W</td>
						<td>0603</td>
						<td><JlcLink part="C2290"></JlcLink></td>
					</tr>
					<tr>
						<td>LED (0603, Yellow)</td>
						<td>Everlight</td>
						<td>19-213/Y2C-CQ2R2L/3T(CY)</td>
						<td>0603</td>
						<td><JlcLink part="C72038"></JlcLink></td>
					</tr>
			</table>
			
		</div>
	);
}