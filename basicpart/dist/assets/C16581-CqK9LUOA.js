var e=`---
part: C16581
mpn: TP4056-42-ESOP8
manufacturer: TOPPOWER(Nanjing Extension Microelectronics)
category: Battery Management
kind: battery-management
package: ESOP-8
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: TP4056 — 1A Standalone Linear Li-Ion Battery Charger with Thermal Regulation in SOP-8
  publisher: NanJing Top Power ASIC Corp.
  document: see datasheet cover
  url: https://dlnmh9ip6v2uc.cloudfront.net/datasheets/Prototyping/TP4056.pdf
summary: Charges a single lithium cell from USB with one resistor setting the current — and no protection whatsoever.
---

# TP4056-42-ESOP8

## What it is

The TP4056 is the chip on every cheap red lithium-charging module. It charges one
lithium-ion or lithium-polymer cell using the proper constant-current then
constant-voltage profile, terminating when the current falls to a tenth of the
programmed value. You set the charge current with a single resistor, and it runs
directly from a USB port or a wall adapter. [1]

Everything else about it is what it does *not* do — see the warnings below. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Complete standalone constant-current / constant-voltage linear charger for a single lithium-ion cell, with thermal regulation [1] | "Standalone" means no microcontroller needed. |
| Charge voltage | Preset 4.2 V with 1.5 % accuracy — 4.137 V to 4.263 V, specified from 0 °C to 85 °C [1] | Fixed. Lithium cells are unforgiving about overcharge, so a tight, non-adjustable float voltage is a feature. |
| Charge current | Programmable up to 1,000 mA with one external resistor on the PROG pin: 1.2 kΩ gives 1,000 mA (950–1,050 mA guaranteed), 2.4 kΩ gives 500 mA, 10 kΩ gives 130 mA [1] | Match it to your cell's C rating — a 500 mAh cell should not be charged at 1 A. The datasheet prints a resistor-to-current table, so there is no arithmetic to get wrong. |
| Input voltage range | 4.0 V to 8.0 V, which is also the absolute maximum on V<sub>CC</sub> [1] | Sized for USB's 5 V, with nothing between the recommended top of the range and the rating that destroys the part. Do not feed it 12 V. |
| Termination and status | Terminates automatically at C/10 after reaching the float voltage; automatic recharge; two open-drain status pins; 2.9 V trickle-charge threshold with 80 mV of hysteresis; soft-start limits inrush [1] | The two status pins drive the "charging" and "done" LEDs on every module. Being open-drain, each needs its own pull-up or LED and series resistor. |
| Operating temperature | −40 °C to +85 °C ambient; maximum junction temperature 145 °C [1] | The thermal regulation keeps the die within limits by reducing charge current. |

## What the datasheet actually says

**Thermal regulation reduces the charge current rather than shutting down.** At
1 A from a 5 V input into a 3.6 V cell, the chip dissipates about 1.4 W. The
TP4056 responds by cutting the current to hold the die temperature, so a hot
charger charges slowly rather than failing. That is good behaviour, but it means
your 1 A setting is an upper bound, not a promise. [1]

**No blocking diode is needed.** The internal PMOSFET architecture prevents
reverse current from the battery into the input. [1]

**The exposed pad matters.** The datasheet notes "the Radiator need connect GND
or impending" — the ESOP-8 package's thermal pad should be soldered to ground or
left unconnected, and soldering it to a copper pour is what lets the part reach
its rated current. [1]

**Trickle charge below 2.9 V.** A deeply discharged cell is charged at 130 mA
(with the 1.2 kΩ programming resistor) until it recovers above that threshold —
the correct and safe behaviour. [1]

**The TEMP pin is a real battery-temperature input, and it is not optional
unless you disable it.** The chip watches the pin against its own supply: if the
voltage there sits below 45 % or above 80 % of V<sub>IN</sub> for more than
0.15 s, it reads that as a pack that is too hot or too cold and suspends
charging. It expects the NTC thermistor built into a lithium pack. If you are
charging a bare cell with no thermistor, ground the TEMP pin to switch the
function off — leave it floating and the charger may simply refuse to run. [1]

**Standing current is tens of microamps, not single figures.** The chip draws
150 µA typical (500 µA maximum) from the input while charging and 55 µA typical
(100 µA maximum) once charging has terminated. The often-quoted 2 µA is a
different number: it is what the *battery* pin draws back through the chip in
sleep or disabled mode, which is what matters for self-discharge but not for what
your input supply sees. [1]

## Watch out for

- **This is a charger, not a protection circuit.** It does not protect the cell
  against over-discharge, over-current on the load side, or short circuit. The
  repository's own note on this part says exactly that, and it is the single most
  important thing to know. Use a cell with an integral protection board, or add a
  separate protection IC. [3]
- **There is no power-path management.** With a load connected to the battery
  while charging, the charger cannot distinguish load current from charge
  current, and termination misbehaves.
- **8 V absolute maximum.** A 12 V supply destroys it.
- **Set the PROG resistor for your cell**, not for the maximum the chip allows.

## In this catalog

Preferred Extended part in ESOP-8. At the 2026-07-24 snapshot: 90,085 in stock,
$0.19 at quantity 1, falling to $0.089 at 4,000. The catalog attributes record
4.2 V charge voltage, 1 A maximum charge current, single cell, 4 V–8 V supply,
2 µA supply current, battery temperature detection support, and constant-current /
constant-voltage / trickle / automatic-recharge / termination / programmable
current / soft-start / undervoltage-lockout features. All match the datasheet
except the "2 µA supply current" attribute, which is the battery-pin sleep
current rather than the supply current: from the input the part draws 55 µA
typical in standby and 150 µA typical while charging. [1] [2]

## Sources

1. NanJing Top Power ASIC Corp., *TP4056 — 1A Standalone Linear Li-Ion Battery
   Charger with Thermal Regulation in SOP-8*. Description, Features, Package/Order
   Information, Absolute Maximum Ratings.
   <https://dlnmh9ip6v2uc.cloudfront.net/datasheets/Prototyping/TP4056.pdf>
2. JLCPCB / LCSC catalog record for C16581, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/battery-management_toppower-nanjing-extension-microelectronics-tp4056-42-esop8_C16581.html>
3. basicp.art curated recommendations, \`src/data/other-components.json\`, which
   already carries the note that this part provides no battery protection or
   power-path management.
`;export{e as default};