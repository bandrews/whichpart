var e=`---
part: C719499
mpn: FEMDRM008G-58A39
manufacturer: FORESEE
category: eMMC
kind: memory
package: FBGA-153
tier: preferred
catalog_snapshot: 2026-07-24
summary: 8 GB of managed flash storage in one chip — a solid-state disk for an embedded Linux board.
---

# FEMDRM008G-58A39

> **Note on sources.** FORESEE's datasheet for this part is served through LCSC,
> which blocks automated retrieval. Every figure below comes from the JLCPCB/LCSC
> catalog record and is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

eMMC is raw NAND flash with a controller bonded into the same package, presenting
itself to the host as a block device — essentially a soldered-down memory card.
The controller handles the things that make raw NAND difficult: wear levelling,
bad-block management, and error correction. [1]

This is 8 gigabytes of it, in a 153-ball BGA. It is the storage in the kind of
board that boots Linux: a single-board computer, an industrial gateway, a smart
display. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Capacity | 8 GB [1] | Enough for a small Linux root filesystem with room for an application and logs. |
| Interface | eMMC 5.1 [1] | A standard host interface — Linux and U-Boot support it directly, with no special driver. |
| Maximum clock | Sequential read 230 MB/s, sequential write 105 MB/s [1] | Fast enough that boot time is dominated by software, not storage. |
| Supply voltage | Controller (V<sub>CCQ</sub>) 1.7–1.95 V or 2.7–3.6 V; NAND (V<sub>CCF</sub>) 2.7–3.6 V [1] | Two supplies. The controller rail can be 1.8 V or 3.3 V; the NAND rail must be 3.3 V. |
| Endurance and retention | Not recorded in the catalog; the controller provides wear levelling, bad-block management and ECC [1] | eMMC endurance depends on the NAND type and the controller's algorithms. If your application writes constantly, ask FORESEE for the figure. |
| Operating temperature | −25 °C to +85 °C [1] | Narrower at the cold end than most parts here. |

## What the specification implies

**The controller is what you are buying.** Raw NAND requires the host to manage
wear, bad blocks and ECC in software — a substantial and error-prone job. eMMC
moves all of it into the package, which is why an 8 GB eMMC costs more than 8 GB
of raw NAND and is worth it for most designs.

**Power-down data protection is listed as a feature.** That matters a great deal:
an unexpected power loss during a write can corrupt an unprotected flash device
badly enough to make it unbootable. Whether the protection is sufficient for your
application is worth testing rather than assuming.

**Standby currents are 50 µA for the NAND and 120 µA for the controller** — low
enough that leaving it powered in a sleeping system is reasonable. [1]

**BGA-153 is not a hand-assembly package.** It needs reflow, and it needs
X-ray or boundary-scan to inspect. This is a part for a professionally
manufactured board.

## Watch out for

- **Stock was zero at the snapshot date.** See \`ISSUES.md\`. Check availability
  before committing a design.
- **Two supply rails.** Get the V<sub>CCQ</sub> / V<sub>CCF</sub> arrangement
  right; they are not interchangeable.
- **−25 °C cold limit.** Narrower than most of this catalog.
- **eMMC part numbers change often.** Vendors revise the NAND inside while
  keeping the interface; qualify the specific part you receive.

## In this catalog

Preferred Extended part in FBGA-153. At the 2026-07-24 snapshot: **0 in stock**,
with prices listed from $6.73 at quantity 1 down to $4.46 at 100. [1]

## Sources

1. JLCPCB / LCSC catalog record for C719499, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/emmc_foresee-femdrm008g-58a39_C719499.html>
`;export{e as default};