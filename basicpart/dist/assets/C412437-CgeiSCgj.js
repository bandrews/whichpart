var e=`---
part: C412437
mpn: US1M
manufacturer: MDD(Microdiode Semiconductor)
category: Fast Recovery / High Efficiency Diodes
kind: discrete-diode
package: SMA
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: US1A THRU US1M — Surface Mount Ultra Fast Rectifier
  publisher: MDD (Microdiode Semiconductor)
  revised: 2025A6
  url: https://datasheet.lcsc.com/datasheet/pdf/89b4a1927916d4412d7e6f222faa3abd.pdf
summary: A 1 A, 1000 V ultrafast rectifier — high voltage and quick to turn off, where a Schottky cannot reach.
---

# US1M

## What it is

Where the SS14 is a Schottky diode rated for 40 V, the US1M is a silicon
ultrafast-recovery rectifier rated for 1,000 V — twenty-five times the voltage.
It gives up the Schottky's low forward drop in exchange for standing off
mains-level voltages while still turning off in 75 nanoseconds. It is the
highest-voltage member of MDD's US1A–US1M family, all of which share the SMA
(JEDEC DO-214AC) body. [1]

Use it in offline (mains-connected) supplies, snubber networks and flyback
converters — anywhere a rectifier has to handle high voltage and stop conducting
quickly. It is also the usual faster stand-in for the slow 1N4007 in circuits
where recovery time matters. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Single ultrafast-recovery silicon rectifier in a moulded UL 94V-0 plastic SMA body, with built-in strain relief for automatic placement [1] | A standalone diode, not a pair or a bridge. |
| Repetitive peak reverse voltage | 1,000 V, with a 700 V RMS and 1,000 V DC blocking rating [1] | Enough for rectified mains with margin. The 700 V RMS figure is the one to check a mains input against. |
| Average forward current | 1.0 A average rectified **at a lead temperature of 125 °C**, resistive or inductive load; derate 20 % for a capacitive load. Fig. 1 holds 1.0 A flat to 125 °C and then falls to zero at 150 °C. Peak surge 30 A for one 8.3 ms half sine on top of rated load [1] | The headline amp is conditional on keeping the solder joints at or below 125 °C, and on the load being resistive or inductive rather than a reservoir capacitor. |
| Forward voltage | 1.70 V maximum at 1.0 A (the figure MDD gives for the US1J, US1K and US1M; the lower-voltage members of the family are specified at 1.0 V or 1.30 V) [1] | Three times a Schottky's drop, which is what the voltage rating costs you. The catalog's 1.65 V [2] does not appear anywhere in the datasheet. |
| Recovery or capacitance | Reverse recovery time 75 ns maximum, measured at I<sub>F</sub> = 0.5 A, I<sub>R</sub> = 1.0 A, I<sub>rr</sub> = 0.25 A; typical junction capacitance 15 pF at 1 MHz and 4 V reverse [1] | A 1N4007 takes microseconds. In a switching circuit that difference is the whole point of buying this part. |
| Operating temperature | Junction and storage −55 °C to +150 °C [1] | Wide. Note that the current rating has already fallen to zero by 150 °C. |

## What the datasheet actually says

**One amp continuous needs a real copper pour and a cool board.** MDD's typical
thermal resistance from junction to ambient is 55 °C/W, and note 2 says how it
was obtained: "P.C.B. mounted with 2.0 × 2.0" (5.0 × 5.0 cm) copper pad areas" —
a copper square five centimetres on a side. At the full amp the diode dissipates
up to 1.7 W, which across 55 °C/W is roughly a 90 °C rise above ambient. On a
small footprint, in a warm enclosure, you will not get there. Junction-to-case is
11 °C/W, the part of the path the manufacturer controls. [1]

**The 75 ns is measured under specific conditions, not at your operating point.**
Note 1 defines them: forward current 0.5 A, reverse current 1.0 A, recovery
current 0.25 A. Recovery time depends on how hard and how fast you switch the
diode off, so treat 75 ns as a comparative figure — good against the 50 ns MDD
gives the lower-voltage US1A–US1G, and vastly better than a standard rectifier —
rather than as a number to design a timing budget around. [1]

**Leakage climbs twentyfold when hot.** At 25 °C the catalog's 5 µA at 1,000 V is
right, and it is beautifully low. At 125 °C the same part is specified at 100 µA.
At 1,000 V that is a tenth of a watt of loss doing nothing useful, and it warms
the diode further. Check it in any design that runs hot at high voltage. [1][2]

**The family shares one datasheet but not one forward drop.** US1A through US1D
are specified at 1.0 V, the US1G at 1.30 V, and the US1J, US1K and US1M at 1.70 V,
all at 1 A. Reading the wrong column understates your losses by 40 %. [1]

## Watch out for

- **Check the thermal path before assuming 1 A.** The rating is referenced to a
  125 °C lead temperature, and the published thermal resistance assumes 5 × 5 cm
  of copper. [1]
- **A Schottky is better below about 40 V.** Use the SS14 (C7420316) there; the
  US1M's voltage rating is wasted and its drop is three times higher.
- **Leakage at 125 °C is 100 µA, not the catalog's 5 µA** — that figure is the
  25 °C one. [1][2]
- **The catalog's 1.65 V forward drop is optimistic.** MDD specifies 1.70 V
  maximum at 1 A. [1][2]
- **Not fast enough for high-frequency resonant work.** 75 ns is fast for a
  1,000 V silicon part, but a silicon-carbide diode is faster still.
- **Mains-adjacent circuits need clearance and creepage** on the board, whatever
  the diode is rated for.

## In this catalog

Basic part in SMA, so no feeder-loading fee for Economic PCBA at JLCPCB. At the
2026-07-24 snapshot: 2,456,639 in stock — one of the deepest positions in the
catalog — at $0.0132 at quantity 1, falling to $0.0093 at 1,500, $0.0067 at 5,000
and $0.0061 at 50,000. The catalog attributes record 1 kV, 1 A, 30 A surge,
5 µA at 1 kV, 75 ns recovery and −55 °C to +150 °C, all of which match MDD's
datasheet; only the 1.65 V forward drop does not. [2]

## Sources

1. MDD (Microdiode Semiconductor), *US1A THRU US1M — Surface Mount Ultra Fast
   Rectifier*, Rev. 2025A6. Features and Mechanical Data; Maximum Ratings and
   Electrical Characteristics, with notes 1 to 3 (page 1); Fig. 1, Forward
   Current Derating Curve, and Fig. 3, Typical Forward Characteristics (page 2).
   <https://datasheet.lcsc.com/datasheet/pdf/89b4a1927916d4412d7e6f222faa3abd.pdf>
2. JLCPCB / LCSC catalog record for C412437, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). Source for package, tier,
   price, stock and the catalog attribute strings.
   <https://www.lcsc.com/product-detail/fast-recovery-high-efficiency-diodes_mdd-microdiode-semiconductor-us1m_C412437.html>
`;export{e as default};