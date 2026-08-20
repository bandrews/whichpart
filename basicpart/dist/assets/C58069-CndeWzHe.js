var e=`---
part: C58069
mpn: L78M05ABDT-TR
manufacturer: STMicroelectronics
category: Voltage Regulators - Linear, Low Drop Out (LDO) Regulators
kind: power-linear
package: TO-252-2(DPAK)
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: L78MxxAB, L78MxxAC — Precision 500 mA regulators
  publisher: STMicroelectronics
  document: DS0425 Rev 24
  revised: 2020-09
  url: https://www.st.com/resource/en/datasheet/l78m05ab.pdf
summary: A 5 V, 500 mA three-terminal regulator — the classic 7805 in a surface-mount package, with ±2 % accuracy.
---

# L78M05ABDT-TR

> **Note on the datasheet.** An earlier version of this note warned that ST's
> datasheet was watermarked "Obsolete Product(s)". That watermark belongs to a
> superseded document (the 2012 *L78MxxAB, L78MxxAC* datasheet, Doc ID 2147
> Rev 13). ST's current document for the family is DS0425 Rev 24 of September
> 2020, which carries no such marking and lists this order code in its ordering
> table; ST's product page shows the part in volume production. The figures below
> are taken from DS0425 Rev 24. See \`ISSUES.md\`. [1] [3]

## What it is

This is the surface-mount descendant of the 7805: a three-terminal linear
regulator that takes any input from about 7 V to 35 V and produces a fixed 5 V at
up to 500 mA. You need the chip and two capacitors, and that is the whole
circuit. [1]

Linear regulators waste the voltage difference as heat, so this is the wrong
choice when the input is far above 5 V at high current. It is the right choice
when you want a quiet, simple, cheap 5 V rail and the drop is modest. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Fixed 5 V, ±2 % tolerance: 4.9 V to 5.1 V at 25 °C, widening to 4.8 V–5.2 V over 5 mA to 350 mA and 7 V to 20 V input [1] | The "A" in the part number is the ±2 % precision grade; ordinary 78M05 parts are ±4 %. |
| Output current | Up to 500 mA, internally limited; short-circuit current 300 mA typical, 700 mA peak [1] | Current limiting and thermal shutdown make it, in ST's words, "essentially indestructible". |
| Input voltage range | Up to 35 V absolute maximum for the 5 V version [1] | The practical minimum is the output plus the dropout voltage. |
| Dropout voltage | 2 V typical at 25 °C [1] | This is the number people forget: you need at least 7 V in to get 5 V out. It is *not* a low-dropout regulator despite the catalog's category name. |
| Quiescent current | 6 mA maximum at 25 °C; it rises by up to 0.5 mA as the load goes from 5 mA to 350 mA [1] | High by modern standards, and it is drawn continuously — a real cost in a battery design. ST publishes only the maximum here, not a typical. |
| Output accuracy | ±2 % at 25 °C; supply voltage rejection at least 62 dB at 120 Hz; output noise 40 µV typical over 10 Hz to 100 kHz [1] | The noise and rejection figures are the reason linear regulators are still used for analogue supplies. The 62 dB is a guaranteed minimum, so real parts do better. |
| Operating temperature | −40 °C to +125 °C junction for the \`AB\` grade, which is this part. (The \`AC\` grade is 0 °C to +125 °C) [1] | The letter after \`A\` is the temperature grade. |

## What the datasheet actually says

**Thermal resistance decides everything.** ST gives 100 °C/W junction-to-ambient
for the DPAK package and 8 °C/W junction-to-case. Dropping 12 V to 5 V at 300 mA
dissipates 2.1 W, which at 100 °C/W would raise the junction 210 °C above
ambient — impossible. The DPAK tab must be soldered to a copper pour, and even
then you must do the arithmetic. [1]

**Protection is comprehensive:** thermal overload shutdown, short-circuit
protection, and output transition safe-operating-area protection. [1]

**Line regulation is 100 mV** over a 7 V to 25 V input swing at 200 mA, or 50 mV
over 8 V to 25 V. Both are maxima. [1]

**The short-circuit behaviour has two numbers.** Steady short-circuit current is
300 mA typical with 35 V on the input, but the peak during the initial fault is
700 mA. Anything downstream that has to survive a short — a fuse, a trace, a
connector — should be sized against the peak. [1]

## Watch out for

- **An earlier revision of the datasheet carried an "Obsolete Product(s)"
  watermark**, which this note previously reported as a lifecycle warning. That
  was a stale document. ST's current datasheet for the family, DS0425 Rev 24 of
  September 2020, carries no such marking, lists this exact order code
  (\`L78M05ABDT-TR\`) in its ordering table, and ST's product page shows the part
  as active. See \`ISSUES.md\`. [1] [3]
- **2 V dropout, not low dropout.** The catalog's "LDO Regulators" category is
  misleading for this part. For a genuine LDO at low input-output difference, use
  something like the XC6206 or HT7533.
- **Heat is the real limit, not the 500 mA rating.** Compute the dissipation.
- **6 mA quiescent current** rules it out of always-on battery designs.

## In this catalog

Basic part in TO-252-2 (DPAK), so no assembly surcharge at JLCPCB. At the
2026-07-24 snapshot: 117,309 in stock, $0.22 at quantity 1, falling to $0.118 at
5,000. The catalog attributes record fixed 5 V, 500 mA, 35 V maximum input, 2 V
dropout at 350 mA, 6 mA standby current, 40 µV noise, 62 dB PSRR at 120 Hz and
−40 °C to +125 °C junction — all matching the datasheet, with the 6 mA being a
guaranteed maximum rather than a typical, and the 62 dB a guaranteed minimum. [1] [2]

## Sources

1. STMicroelectronics, *L78M — Precision 500 mA regulators*, DS0425 Rev 24,
   September 2020. Features and Description page 1, Table 1 (Absolute maximum
   ratings), Table 2 (Thermal data), Table 4 (Electrical characteristics of
   L78M05A), Table 27 (Order codes).
   <https://www.st.com/resource/en/datasheet/l78m05ab.pdf>
2. JLCPCB / LCSC catalog record for C58069, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/voltage-regulators-linear-low-drop-out-ldo-regulators_stmicroelectronics-l78m05abdt-tr_C58069.html>
3. STMicroelectronics product page for the L78M series, checked 2026-08-19: the
   series is listed as in volume production, with \`L78M05ABDT-TR\` orderable.
   <https://www.st.com/en/power-management/l78m.html>
`;export{e as default};