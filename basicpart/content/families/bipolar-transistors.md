---
family: Bipolar transistors (BJT)
part_count: 90
categories:
  - Bipolar (BJT)
kind: discrete
catalog_snapshot: 2026-07-24
summary: Current-controlled switches and amplifiers — still the cheapest way to drive a small load from a logic pin.
---

# Bipolar transistors (BJT)

## What they are

A bipolar transistor amplifies current: a small base current lets a much larger
collector current flow. It is the older cousin of the MOSFET, and it survives
because for small signals and small loads it is cheaper, simpler and needs no
gate-drive care. There are 90 in this catalog, mostly in SOT-23, from
hongjiacheng and Changjing. [1]

They come in two polarities. **NPN** switches the ground side of a load (current
into the base turns it on). **PNP** switches the positive side (current *out of*
the base turns it on).

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Type** | NPN or PNP. Determines which side of the load it can switch. |
| **Collector-emitter voltage (V<sub>CEO</sub>)** | The most it will block with the base open. |
| **Collector current (I<sub>C</sub>)** | The maximum continuous current. |
| **DC current gain (h<sub>FE</sub>)** | Collector current divided by base current. Varies enormously — see below. |
| **Saturation voltage (V<sub>CE(sat)</sub>)** | The drop when fully on. Multiply by current for heat. |
| **Transition frequency (f<sub>T</sub>)** | How fast it is. Matters for amplifiers and fast switching. |
| **Emitter-base voltage (V<sub>EBO</sub>)** | Reverse rating on the base-emitter junction — usually only about 5–6 V, and easy to exceed. |
| **Power dissipation (P<sub>d</sub>)** | The package limit. |

## What actually matters in practice

**Gain varies by three or four to one, and you must design for the minimum.** The
catalog's parts are often binned — `MMBT5551(RANGE:200-300)` states its h<sub>FE</sub>
bin in the part number. [1] To switch a load fully on, supply base current of at
least I<sub>C</sub> divided by the *minimum* gain, and then some: the usual
practice is to over-drive by a factor of five or ten so the transistor saturates
properly.

**Saturation voltage is the cost of using a BJT as a switch.** The catalog's parts
saturate around 200 mV. [1] A MOSFET like the AO3400A manages tens of milliohms —
at 500 mA, 25 mV against 200 mV. For small currents nobody cares; above a hundred
milliamps or so, a MOSFET is the better switch.

**The base needs a resistor.** The base-emitter junction is a diode. Connect it
directly to a logic pin and you draw whatever the pin can source until something
gives. Size the resistor for the base current you calculated.

**V<sub>EBO</sub> is around 6 V and it is easy to exceed.** Reverse-biasing the
base-emitter junction beyond that degrades gain permanently. In circuits where
the base can go negative relative to the emitter — some level shifters, some
driven-from-AC arrangements — add a clamp diode.

**f<sub>T</sub> tells you what it can amplify, not how fast it switches.** A
300 MHz f<sub>T</sub> part used as a saturated switch turns off slowly, because
charge stored in the base has to be removed. If you are switching fast, either do
not saturate it, or add a base pull-down.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| `type` / `Number` | `NPN` or `PNP`, and how many in the package. |
| `Collector - Emitter Voltage VCEO` | Blocking voltage. |
| `Current - Collector(Ic)` | Maximum continuous collector current. |
| `DC Current Gain` | h<sub>FE</sub>, often a bin value — check the part number for a range. |
| `Vce Saturation(VCE(sat))` | Drop when fully on. |
| `Transition frequency(fT)` | Gain-bandwidth product of the transistor. |
| `Emitter-Base Voltage(Vebo)` | Reverse rating on the base-emitter junction. |
| `Pd - Power Dissipation` | Package limit. |
| `Current - Collector Cutoff` | Leakage when off. |
| `Operating Temperature` | Usually `-55℃~+150℃`. |

## Watch out for

- **Design for minimum gain, and over-drive the base.**
- **Always fit a base resistor.**
- **Above ~100 mA a MOSFET is usually better** — lower drop, less drive current.
- **Watch V<sub>EBO</sub>** in circuits where the base may go negative.
- **Most parts here are house-brand** with LCSC-hosted datasheets that are not
  reachable to automated fetching. See `ISSUES.md`.

## Sources

1. JLCPCB / LCSC catalog records for the Bipolar (BJT) category, snapshot
   2026-07-24 (`raw-data/jlcpcb-basic-parts-2026-07-24.json` and
   `src/data/parts-index.json`). Type, voltage, current, gain, saturation and
   frequency figures are the attribute values recorded there.
