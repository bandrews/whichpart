var e=`---
part: C32574
mpn: TP4054-42-SOT25R
manufacturer: TOPPOWER(Nanjing Extension Microelectronics)
category: Battery Management
kind: battery-management
package: SOT-23-5
tier: preferred
catalog_snapshot: 2026-07-24
summary: The smallest of the family — 450 mA of lithium charging in five pins.
---

# TP4054-42-SOT25R

> **Note on sources.** No manufacturer datasheet for the TP4054 could be
> retrieved: the LCSC-hosted copy is blocked to automated fetching and Nanjing
> Top Power's own site did not respond. Every figure below therefore comes from
> the JLCPCB/LCSC catalog record and is cited as \`[1]\`. Where the TP4056's
> datasheet is quoted for family context it is cited separately as \`[2]\`. See
> \`ISSUES.md\`.

## What it is

The TP4054 is the five-pin member of this lithium-charger family: standalone
constant-current / constant-voltage charging for one cell, at up to 450 mA, in a
SOT-23-5. It is the smallest and simplest of the three chargers in this
catalog. [1]

Fewer pins means fewer features — with five pins you get input, ground, battery,
programming resistor and one status output, and that is all. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Standalone constant-current / constant-voltage single-cell lithium charger [1] | Same profile as the rest of the family. |
| Charge voltage | 4.2 V [1] | Fixed lithium-ion float voltage. |
| Charge current | Up to 450 mA, programmable [1] | Slightly below the TP4057's 500 mA. |
| Input voltage range | 4 V to 9 V [1] | Same as the TP4057. |
| Termination and status | Constant-current, constant-voltage, trickle charge, automatic recharge, charge termination, programmable charge current, soft-start and undervoltage lockout [1] | The same nominal feature list, but with only one status pin available in a 5-pin package. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the specification implies

**No battery temperature detection and no zero-volt charging**, both marked "Not
supported" in the catalog record — the same limitations as the TP4057. [1]

**Quiescent current is 45 µA**, the highest of the three chargers here. The
TP4056's 2 µA is 20× better if standby drain matters. [1]

**One status pin, not two.** The TP4056's separate "charging" and "standby"
outputs let you drive two LEDs; with five pins there is only room for one. Check
the pinout before designing a two-LED indicator.

**Linear charging means heat.** At 450 mA from 5 V into a 3.6 V cell, roughly
0.6 W is dissipated in a SOT-23-5. Expect thermal throttling in practice. [2]

## Watch out for

- **No protection circuit**, as with the whole family.
- **No temperature sensing, no 0 V charging.**
- **SOT-23-5 dissipates very little.** The 450 mA rating assumes a cool part.
- **The specification here rests on the catalog record alone.** See the source
  note above.

## In this catalog

Preferred Extended part in SOT-23-5. At the 2026-07-24 snapshot: 53,796 in stock,
$0.16 at quantity 1, falling to $0.072 at 6,000. [1]

## Sources

1. JLCPCB / LCSC catalog record for C32574, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/battery-management_toppower-nanjing-extension-microelectronics-tp4054-42-sot25r_C32574.html>
2. NanJing Top Power ASIC Corp., *TP4056 — 1A Standalone Linear Li-Ion Battery
   Charger with Thermal Regulation in SOP-8*. Cited only for family context on
   how a linear lithium charger dissipates heat.
   <https://dlnmh9ip6v2uc.cloudfront.net/datasheets/Prototyping/TP4056.pdf>
`;export{e as default};