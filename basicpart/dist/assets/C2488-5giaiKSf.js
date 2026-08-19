var e=`---
part: C2488
mpn: MB10S-50MIL
manufacturer: MDD(Microdiode Semiconductor)
category: Bridge Rectifiers
kind: discrete-diode
package: MBS
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: MB1S THRU MB10S — Single Phase Glass Passivated Bridge Rectifiers
  publisher: MDD (Microdiode Semiconductor)
  revised: 2024A2
  url: https://datasheet.lcsc.com/datasheet/pdf/d166b641999f7c4a86c69b88af3f89c6.pdf
summary: Four diodes wired as a bridge in one small package — turns AC into DC, or makes a supply polarity-proof.
---

# MB10S-50MIL

## What it is

A bridge rectifier is four diodes arranged so that whichever way round the input
polarity arrives, the output always comes out the same way. The MB10S packs all
four into a small surface-mount body with four pins: two for the alternating or
unknown-polarity input, two for the direct-current output. It is the top of MDD's
MB1S–MB10S family, the one rated for the highest reverse voltage. [1]

Two everyday uses: rectifying a low-voltage AC transformer into DC, and making a
DC input polarity-proof so that a user cannot destroy the board by plugging the
barrel jack in backwards. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Single-phase full-wave bridge rectifier, four glass-passivated diode legs in one JEDEC MBS moulded body [1] | Two input pins, two output pins, no external diodes needed. |
| Repetitive peak reverse voltage | 1,000 V, with a 700 V RMS and 1,000 V DC blocking rating [1] | Far more than most applications need, but it costs nothing to have. The 700 V RMS figure is the one to check a mains input against. |
| Average forward current | 1.0 A average rectified output current **at a case temperature of 115 °C**, for a resistive or inductive load; the datasheet's own header adds "for capacitive load current derate by 20 %", so 0.8 A with the usual reservoir capacitor. Peak surge 35 A for one 8.3 ms half sine on top of rated load; fusing rating 5.08 A²s [1] | This settles a long-standing doubt about the part: MDD really does rate it at 1 A, matching the catalog. But the rating is tied to case temperature and load type, not to a bare board in still air. |
| Forward voltage | 1.1 V maximum per leg at 1.0 A [1] | Current flows through *two* legs in series at every instant, so you lose about 2.2 V in total. That matters a great deal at low voltages. |
| Recovery or capacitance | No reverse-recovery time is specified; typical junction capacitance is 13 pF per leg, measured at 1 MHz with 4 V of reverse bias [1] | These are 50/60 Hz mains-frequency rectifiers. A part with no recovery-time specification is not one to put in a switching converter. |
| Operating temperature | Junction and storage both −55 °C to +150 °C [1] | Wide. The current rating, though, is gone by the time the case reaches 150 °C. |

## What the datasheet actually says

**The 1 A rating is real, but it is measured at the case, not in your enclosure.**
The maximum ratings table gives I<sub>F(AV)</sub> = 1.0 A "at T<sub>C</sub> = 115 °C",
and Fig. 1 draws the consequence: the curve is flat at 1.0 A until the case
reaches 115 °C, then falls in a straight line to zero at 150 °C. That is a
statement about the silicon, not about your board — it says the die can carry an
amp provided you can hold the plastic body at 115 °C or below. Whether you can is
a thermal design question the datasheet answers only indirectly. [1]

**Getting the heat out is the whole problem.** At the full 1.0 A the bridge burns
about 2.2 W (1.1 V through two conducting legs, or 0.55 W in each of the four),
and MDD's typical thermal resistance of 85 °C/W per leg from junction to ambient
is quoted for a part "mounted on glass epoxy PC board with 4 × 1.5" × 1.5"
(3.81 × 3.81 cm) copper pad" — four copper squares nearly four centimetres on a
side. The suggested land pattern on page 3 of the same document is four pads of
1.84 mm × 1.20 mm on a 6.00 × 2.40 mm grid. Solder it to that and nothing like
the datasheet's thermal performance is available to you. Junction-to-case is
25 °C/W, which is the part of the path MDD controls. [1]

**Other makers of the same type rate it at half the current.** EIC
Semiconductor's MB1S–MB10S datasheet gives 0.5 A on a glass-epoxy board with
13 × 13 mm pads and 0.8 A only on an aluminium substrate — a *system* rating at
25 °C ambient, where MDD's 1 A is a *case-referenced* rating. Both quote the same
85 °C/W. The two are not really contradicting each other about the silicon; they
are answering different questions. If you buy an MB10S from another supplier,
check which convention its datasheet uses before assuming an amp. [1][3]

**Reverse leakage rises eightfold when hot.** 5 µA maximum at rated blocking
voltage and 25 °C, 40 µA at 125 °C. Small either way, but worth knowing in a
warm enclosure. [1]

## Watch out for

- **You lose two diode drops, up to 2.2 V.** Budget for it, and consider an
  active bridge or a P-channel MOSFET for reverse protection in low-voltage
  designs. [1]
- **1 A is the resistive-load figure.** Feeding a reservoir capacitor — which is
  what a rectifier usually does — the datasheet's own instruction is to derate by
  20 %, giving 0.8 A. [1]
- **Give the pads real copper.** The published thermal resistance assumes four
  3.81 cm copper squares, not the 1.84 × 1.20 mm land pattern. [1]
- **Not for switching converters.** No recovery time is specified; these are
  mains-frequency parts. [1]
- **The catalog quotes the forward voltage at a different current.** It says
  1.1 V at 400 mA [2]; MDD specifies 1.1 V maximum per leg at 1.0 A [1]. The
  datasheet figure is the more useful and the more demanding of the two.
- **The datasheet covers MB1S through MB10S and never mentions the "-50MIL"
  suffix** in the catalog's part number, so nothing in it tells you what that
  suffix denotes. [1][2]
- **Mains-adjacent circuits need proper clearance** on the board, whatever the
  diode is rated for.

## In this catalog

Basic part in the MBS package, so no assembly surcharge at JLCPCB. At the
2026-07-24 snapshot: 799,342 in stock, $0.027 at quantity 1, falling to $0.013 at
21,000. [2]

## Sources

1. MDD (Microdiode Semiconductor), *MB1S THRU MB10S — Single Phase Glass
   Passivated Bridge Rectifiers*, Rev. 2024A2. Features and Mechanical Data;
   Maximum Ratings and Electrical Characteristics, with notes 1 and 2 (page 1);
   Fig. 1, Average Rectified Output Current Derating Curve (page 2); Suggested
   Pad Layout (page 3).
   <https://datasheet.lcsc.com/datasheet/pdf/d166b641999f7c4a86c69b88af3f89c6.pdf>
2. JLCPCB / LCSC catalog record for C2488, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). Source for package, tier,
   price, stock and the catalog attribute strings.
   <https://www.lcsc.com/product-detail/bridge-rectifiers_mdd-microdiode-semiconductor-mb10s_C2488.html>
3. EIC Semiconductor, *MB1S – MB10S Mini-Bridge Rectifiers*, Rev. 03,
   25 October 2006. Maximum Ratings and Electrical Characteristics, with notes 1
   and 2 on the mounting each current rating assumes. Cited only for the
   comparison above, as another manufacturer's version of the same type.
   <http://www.eicsemi.com/datasheet/MB1S_10S.pdf>
`;export{e as default};