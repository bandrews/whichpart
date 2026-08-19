var e=`---
part: C7859
mpn: SN74LVC4245APWR
manufacturer: Texas Instruments
category: Translators, Level Shifters
kind: logic
package: TSSOP-24
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: SN74LVC4245A — 8-Bit Dual-Supply Bus Transceiver With Configurable Voltage Translation
  publisher: Texas Instruments
  document: SCAS375K
  revised: 2026-05
  url: https://www.ti.com/lit/ds/symlink/sn74lvc4245a.pdf
summary: Translates eight signals between a 5 V bus and a 3.3 V bus, in whichever direction a control pin selects.
---

# SN74LVC4245APWR

## What it is

This chip solves the everyday problem of connecting 5 V logic to 3.3 V logic
eight signals at a time. It has two supply pins — one for each voltage — and a
direction pin that decides which side drives and which side listens. All eight
bits move together in the selected direction. [1]

Typical uses: hanging a 5 V peripheral off a 3.3 V microcontroller's parallel
bus, or driving a 5 V display or memory from a modern low-voltage part. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | 8-bit direction-controlled translating bus transceiver [1] | One direction pin, eight bits. It cannot translate different bits in different directions at once. |
| Logic family | LVC — CMOS, TTL-compatible thresholds [1] | Control-pin thresholds are referenced to V<sub>CCA</sub>, so drive them from the 5 V side. |
| Supply voltage | V<sub>CCA</sub> 4.5 V to 5.5 V (A port); V<sub>CCB</sub> 2.7 V to 3.6 V (B port) [1] | Both supplies must be present and in range. This is a 5 V-to-3.3 V part specifically, not a general translator. |
| Output drive | ±24 mA at a 3 V supply [1] | High enough to drive a loaded backplane or a long ribbon cable. |
| Propagation delay | 6.7 ns maximum A→B, 6.4 ns maximum B→A, with a 50 pF load [1] | Fast enough for most parallel buses, but it is a real delay to include in timing budgets. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the datasheet actually says

**If either supply drops below 100 mV or is left floating, all I/O go high
impedance.** TI calls this the V<sub>CC</sub> isolation and disconnect feature.
It means you can power down one side of your board without the translator
back-feeding the other — a genuinely useful safety property. [1]

**The control inputs follow V<sub>CCA</sub>.** The direction and output-enable
pins have their thresholds referenced to the A-side (5 V) supply, not the B side.
Driving them from a 3.3 V microcontroller may not meet the high-level threshold
reliably. [1]

**Power sequencing is glitch-free.** The datasheet states the part tolerates
either supply coming up first without producing spurious output transitions. [1]

**I<sub>off</sub> supports partial-power-down operation**, meaning the part will
not load a live bus when it is unpowered. [1]

## Watch out for

- **Not for I²C or any bidirectional open-drain bus.** This is a directional
  push-pull transceiver; it cannot arbitrate a shared line. Use a dedicated I²C
  level translator instead.
- **Drive the direction pin from the 5 V side**, or verify that your 3.3 V
  logic-high clears the V<sub>CCA</sub>-referenced threshold.
- **Both supplies must be live** for the part to pass anything.
- **It is 5 V-to-3.3 V specifically.** The recommended B-side range stops at
  3.6 V and starts at 2.7 V, so 1.8 V translation is out of scope.

## In this catalog

Preferred Extended part in TSSOP-24. At the 2026-07-24 snapshot: 52,175 in stock,
$0.55 at quantity 1, falling to $0.30 at 1,000. The catalog attributes record
4.5 V–5.5 V on V<sub>CCA</sub>, 2.7 V–3.6 V on V<sub>CCB</sub>, 8 bidirectional
tri-state circuits and −40 °C to +85 °C, all matching the datasheet. [2]

## Sources

1. Texas Instruments, *SN74LVC4245A — 8-Bit Dual-Supply Bus Transceiver With
   Configurable Voltage Translation*, SCAS375K, March 1994, revised May 2026.
   Section 1 (Features), Sections 5.4 and 5.5 (Recommended Operating Conditions
   for V<sub>CCA</sub> and V<sub>CCB</sub>), Section 5.9 (Switching
   Characteristics). <https://www.ti.com/lit/ds/symlink/sn74lvc4245a.pdf>
2. JLCPCB / LCSC catalog record for C7859, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
`;export{e as default};