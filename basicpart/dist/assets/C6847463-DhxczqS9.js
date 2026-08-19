var e=`---
part: C6847463
mpn: MT25QU512ABB8E12-0AUT
manufacturer: Micron Tech
category: NOR FLASH
kind: memory
package: FBGA-24
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: MT25QU512ABB — 512Mb, 1.8V Multiple I/O Serial Flash Memory
  publisher: Micron Technology
  document: mt25q-qlkt-u512-abb-0
  revised: 2018-01
  url: https://datasheet.lcsc.com/datasheet/pdf/4d14a968eb85adb3f2716281a66f0576.pdf
summary: 512 Mbit (64 MB) of 1.8 V NOR flash in an AEC-Q100 automotive grade rated to 125 °C — a code store for hot places, at a price to match.
---

# MT25QU512ABB8E12-0AUT

## What it is

NOR flash is the kind a processor can execute code from directly, byte by byte,
without copying it somewhere else first — which is why boot flash is almost
always NOR. This is 512 Mbit of it, meaning 64 MB, arranged as 1,024 sectors of
64 kB that can also be erased in 32 kB and 4 kB pieces. It runs from a single
1.8 V supply and speaks SPI in single, dual and quad I/O modes. [1]

The long part number is worth unpicking, because Micron's ordering table decodes
every field of it: \`MT25Q\` is the SPI NOR family, \`U\` the 1.7–2.0 V voltage
option (\`L\` would be 2.7–3.6 V), \`512\` the density in megabits, \`A\` a single
monolithic die rather than a stack, the two \`B\`s device generation and die
revision, \`8\` a version with both RESET# and HOLD# pins, \`E\` the 64 kB sector
layout, and \`12\` the 24-ball T-PBGA, 6 mm × 8 mm. The suffix is where the
interesting part hides: \`0\` is standard security, \`A\` is **automotive grade,
AEC-Q100**, and \`UT\` is the **−40 °C to +125 °C** temperature range. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Capacity | 512 Mbit — 64 MB, as 1,024 uniform 64 kB sectors, each divisible into 32 kB and 4 kB subsectors, plus a separate 64-byte one-time-programmable area [1] | The datasheet's own ordering table spells the density both ways: "512 = 512Mb (64MB)". Unlike NAND there is no hidden spare area; the whole 64 MB is addressable, from 000000h to 03FFFFFFh. |
| Interface | SPI, in extended (single), dual and quad I/O protocols, each available at single (STR) and double (DTR) transfer rate. Execute-in-place, program/erase suspend, 3-byte and 4-byte addressing [1] | 4-byte addressing is not optional here: 3-byte addresses only reach 128 Mb, so anything above the first 16 MB needs the 4-byte commands or the extended address register. |
| Maximum clock | 166 MHz maximum (single transfer rate), 90 MHz double transfer rate. **For this −40 to +125 °C \`UT\` grade specifically**, quad I/O is capped at 133 MHz STR and 80 MHz DTR, while single and dual I/O still reach 166 MHz STR / 90 MHz DTR. The legacy READ command (03h) runs at 54 MHz STR / 27 MHz DTR on every grade [1] | The catalog's flat "133 MHz" is really one cell of a table — it is the quad-I/O ceiling for the hot grade. Whether you get 54, 133 or 166 MHz depends on which read command you use and how many dummy cycles you allow. |
| Supply voltage | 1.7 V to 2.0 V (absolute maximum 2.4 V) [1] | **1.8 V only** — the \`U\` in \`MT25QU\` is what says so. The otherwise near-identical \`MT25QL\` is the 2.7–3.6 V part, one letter away in the order code. |
| Endurance and retention | Minimum 100,000 erase cycles per sector; data retention 20 years (typical). Both quoted as JESD47H-compliant [1] | Note the asymmetry: the cycle count is a guaranteed minimum, the retention is a typical. Retention also shortens as a part accumulates cycles — 20 years is not a promise for a worn device. |
| Operating temperature | −40 °C to +125 °C, the \`UT\` grade named by the \`-0AUT\` suffix. The same die is also sold as \`IT\` (−40 to +85 °C) and \`AT\` (−40 to +105 °C) [1] | This is the reason the part exists and most of the reason it costs what it does. Confirmed against the ordering table for this exact order code, not just the datasheet header. |

## What the datasheet actually says

**The temperature grade quietly costs you speed and standby current.** Micron
publishes separate clock-frequency tables for the \`IT\`/\`AT\` parts and for the
\`UT\` part this order code specifies. On \`IT\`/\`AT\`, quad I/O gets to 166 MHz with
enough dummy cycles; on \`UT\` it stops at 133 MHz however many you allow, and in
double-transfer-rate mode at 80 MHz rather than 90 MHz. Standby current tells the
same story: 20 µA typical for every grade, but the maximum rises from 100 µA on
\`IT\` to 200 µA on \`AT\` to **300 µA on \`UT\`**. Deep power-down maximum climbs from
50 µA to 150 µA the same way. Hot parts leak. [1]

**Read speed is bought with dummy cycles, and above 133 MHz it needs tuning.**
The frequency you can run is a function of how many idle clock cycles you let the
device insert before it returns data — quad I/O fast read manages 39 MHz with one
dummy cycle and 133 MHz with eleven. Micron also notes that above 133 MHz in
single-transfer-rate mode, or 66 MHz in double, the host should use the tuning
data pattern to adjust where it samples the data. And the whole table is
"guaranteed by characterization and not 100% tested in production" — a weaker
promise than the rest of the electrical specification. [1]

**Erasing 64 MB of NOR takes minutes, not seconds.** A full bulk erase is
typically 153 seconds and may take up to 460 — nearly eight minutes. A 64 kB
sector erase is 0.15 s typical but up to 1 s, and a 256-byte page program is
120 µs typical against an 1,800 µs maximum. The gap between typical and maximum
is wide enough that driver timeouts and production programming estimates both
have to be built on the maximum. Program/erase suspend exists precisely because
these waits are long enough to be a problem. [1]

## Watch out for

- **Stock was zero at the snapshot date.** See \`ISSUES.md\`.
- **$24.39 in ones** — by a wide margin the most expensive memory in this
  catalog, and more than three times the price of the 8 GB eMMC. The AEC-Q100
  automotive qualification and the 125 °C rating are what you are paying for; if
  you do not need them, the W25Q128JV costs about a tenth as much. [2]
- **1.8 V only.** [1]
- **A naive SPI driver will be slow.** Fall back to the plain 03h READ command
  and you are limited to 54 MHz on a single data line, against 133 MHz on four. [1]
- **The catalog's 15 µA standby figure does not appear in the datasheet.** For
  this \`UT\` grade the datasheet gives 20 µA typical and 300 µA maximum. If
  standby current matters to your power budget, use the datasheet's numbers. [1]
- **Check the exact order code.** The MT25Q family differs by voltage,
  temperature grade, package, pin configuration and security features, all
  encoded in the part number — and the catalog description does not spell out the
  automotive grade at all. [1]

## In this catalog

Preferred Extended part in FBGA-24. At the 2026-07-24 snapshot: **0 in stock**,
with prices listed from $24.39 at quantity 1 down to $23.24 at 30 — an unusually
flat price curve, which typically signals a specialist, low-volume line. It is
the only memory part in this catalog rated above +85 °C; every other flash and
EEPROM here stops at +85 °C. [2]

## Sources

1. Micron Technology, *MT25QU512ABB — 512Mb, 1.8V Multiple I/O Serial Flash
   Memory*, mt25q-qlkt-u512-abb-0, Rev. F, January 2018. Features and Options
   (page 1), Figure 1 (Part Number Ordering Information), Memory Map — 512Mb
   Density, Supported Clock Frequencies (Tables 10–13), Absolute Ratings and
   Operating Conditions (Tables 44–45), DC Characteristics and Operating
   Conditions (Table 48), AC Characteristics and Operating Conditions
   (Tables 50–51).
   <https://datasheet.lcsc.com/datasheet/pdf/4d14a968eb85adb3f2716281a66f0576.pdf>
2. JLCPCB / LCSC catalog record for C6847463, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/nor-flash_micron-tech-mt25qu512abb8e12-0aut_C6847463.html>
`;export{e as default};