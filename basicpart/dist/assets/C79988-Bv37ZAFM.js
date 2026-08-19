var e=`---
part: C79988
mpn: M24C64-RMN6TP
manufacturer: STMicroelectronics
category: EEPROM
kind: memory
package: SOIC-8
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: M24C64-W, M24C64-R, M24C64-F, M24C64-DF — 64-Kbit serial I²C bus EEPROM
  publisher: STMicroelectronics
  document: DS6638 Rev 38
  revised: 2023-02
  url: https://www.st.com/resource/en/datasheet/m24c64-r.pdf
summary: 8 kilobytes of I²C non-volatile storage — thirty-two times the M24C02, for a couple of cents more.
---

# M24C64-RMN6TP

## What it is

The larger sibling of the M24C02: a 64 Kbit (8 kilobyte) I²C EEPROM in the same
8-pin SOIC, organised as 8K × 8 bits. It costs about two cents more than the
256-byte part, which makes it the sensible default unless you are counting every
fraction of a cent. [1] [2]

8 kilobytes is enough for a real configuration store, a font table, a lookup
table, or a modest data log. The \`-R\` in the order code is the 1.8 V-to-5.5 V
supply variant. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Capacity | 64 Kbit (8 Kbyte), organised as 8K × 8, with a 32-byte page size [1] | Twice the page size of the M24C02, so bulk writes are twice as efficient. |
| Interface | I²C, compatible with 100 kHz, 400 kHz and 1 MHz bus modes [1] | 1 MHz Fast-mode Plus support is a genuine advantage over the M24C02's 400 kHz ceiling. |
| Maximum clock | 1 MHz [1] | At 8 kB, bus speed starts to matter for a full read. |
| Supply voltage | 1.8 V to 5.5 V for the \`-R\` variant, which is this part. (The \`-W\` is 2.5 V–5.5 V; the \`-F\` and \`-DF\` are 1.7 V–5.5 V) [1] | The suffix is the voltage range. \`-R\` covers everything from a 1.8 V rail to 5 V logic. |
| Endurance and retention | More than 4 million write cycles, more than 200 years' data retention [1] | Same excellent endurance as the smaller part. |
| Operating temperature | −40 °C to +85 °C [1] | Standard industrial range. |

## What the datasheet actually says

**Error correction is not on every part.** ST states that ECC "is offered only in
devices identified with process letter K"; other process letters do not have it.
The ECC works on groups of four bytes and corrects a single bad bit within the
group. The catalog record lists ECC as a feature of this part number, but the
datasheet ties it to the process letter, not the order code — so it is worth
confirming with your actual delivery rather than assuming. This is recorded in
\`ISSUES.md\`. [1] [2]

**ECC changes how write cycling is counted.** When ECC is present, writing one
byte cycles all four bytes in its group. The endurance budget is therefore
defined per four-byte group, not per byte. If you are rewriting one counter
constantly, spread it across groups. [1]

**Poll the acknowledge to shorten write delays.** The 5 ms figure is a maximum;
the typical write is shorter, and ST documents an acknowledge-polling sequence
that lets you carry on as soon as the device is actually ready. [1]

**The \`-D\` variants add a lockable identification page** — an extra 32 bytes you
can write once and then permanently make read-only. Useful for a serial number
that must not be alterable. That is a different order code from this one. [1]

## Watch out for

- **Kilobits, not kilobytes.** 64 Kbit is 8 kB.
- **32-byte page boundaries.** Writes wrap within the page; align them.
- **The voltage suffix is part of the part number.** \`-R\` here means 1.8 V
  minimum.
- **Do not assume ECC.** See above and \`ISSUES.md\`.

## In this catalog

Preferred Extended part in SOIC-8. At the 2026-07-24 snapshot: 124,197 in stock,
$0.15 at quantity 1, falling to $0.077 at 5,000 — essentially the same price as
the 256-byte M24C02. The catalog attributes record 64 Kbit, I²C at 1 MHz,
1.8 V–5.5 V, 4,000,000 write cycles, 200-year retention, 5 ms write cycle, 3 µA
standby current and −40 °C to +85 °C, all matching the datasheet. Its ECC feature
claim needs the caveat described above. [2]

## Sources

1. STMicroelectronics, *M24C64-W, M24C64-R, M24C64-F, M24C64-DF — 64-Kbit serial
   I²C bus EEPROM*, DS6638 Rev 38, February 2023. Features page 1, Section 1
   (Description), Section 5.1.5 (ECC and write cycling), Section 5.1.6
   (Minimizing write delays by polling on ACK).
   <https://www.st.com/resource/en/datasheet/m24c64-r.pdf>
2. JLCPCB / LCSC catalog record for C79988, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/eeprom_stmicroelectronics-m24c64-rmn6tp_C79988.html>
`;export{e as default};