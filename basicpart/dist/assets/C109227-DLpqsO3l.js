var e=`---
part: C109227
mpn: LTV-817S-TA1-C
manufacturer: Lite-On
category: Transistor, Photovoltaic Output Optoisolators
kind: isolation
package: SMD-4P
tier: basic
catalog_snapshot: 2026-07-24
summary: The most common optocoupler there is, in a surface-mount four-pin package — 5 kV of isolation.
---

# LTV-817S-TA1-C

> **Note on sources.** Lite-On's datasheet for this part is served through LCSC, which blocks automated
> retrieval. Every figure below comes from the JLCPCB/LCSC catalog record and is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

An optocoupler is an LED and a phototransistor sealed facing each other inside
one package, with no electrical connection between them. Light crosses the gap;
current does not. That gives you a signal path across an isolation barrier, which
is what you need when two parts of a system have different grounds, or when one
side is at mains potential. [1]

The 817 is the archetypal optocoupler and this is Lite-On's surface-mount
version of it. It turns up in switching power supplies (carrying the output
voltage feedback back across the isolation barrier), in industrial inputs, and
anywhere a microcontroller must sense or control something at a different ground
potential. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Single-channel optocoupler, LED input, phototransistor output [1] | One signal per package, one direction only. |
| Isolation rating | 5 kV RMS [1] | The voltage the barrier withstands for the specified test duration. |
| Channel count and direction | 1 channel, input to output only [1] | For bidirectional signalling you need two devices. |
| Maximum data rate | Not specified as a data rate; rise time 4 µs at 2 mA into 100 Ω and fall time 3 µs [1] | Microsecond switching means tens of kilobits per second at best. This is not a fast isolator — compare the ADuM1201 (C9669) at 25 Mbps. |
| Supply voltage | Input LED forward voltage 1.2 V, forward current up to 50 mA; output load voltage up to 35 V, output current up to 50 mA [1] | The input is a diode, so it needs a series resistor. The output is an open-collector transistor and needs a pull-up. |
| Operating temperature | −30 °C to +110 °C [1] | — |

## What the specification implies

**Current transfer ratio is the number that governs your design.** CTR is the
output current divided by the input current, and for this part it ranges from
50 % to 600 %. That spread means you must design for the *minimum*: pick
an LED current such that even at the lowest CTR the output transistor saturates.

**A 12:1 CTR spread is enormous.** At 50 % CTR, 10 mA into the LED gives 5 mA of
collector current; at 600 % the same input gives 60 mA. Any circuit that assumes
a particular gain — a linear feedback loop, for instance — must be designed
around that, which is why isolated supplies use a TL431-style reference (the
CJ431, C3113, in this catalog) to set the operating point rather than relying on
the optocoupler's gain.

**CTR degrades over time.** The LED dims as it ages, so a design that only just
works when new will fail later. The usual rule of thumb is to allow substantial
margin — design for perhaps half the minimum CTR — in anything expected to last
years.

**The output is a transistor, not a logic gate.** It saturates at
100 mV at 1 mA output and 20 mA input, so the "low" level is not quite ground, and it needs a pull-up
resistor to define the "high".

## Watch out for

- **Design for minimum CTR, then add margin for ageing.**
- **Microsecond switching.** Fine for a control signal or a feedback loop; too
  slow for a serial data link above a few tens of kilobits.
- **The isolation rating is for the barrier only.** Your PCB must maintain the
  same creepage and clearance underneath the package, or the board defeats it.
- **The LED needs a series resistor**, sized for your input voltage.

## In this catalog

Basic part in SMD-4P, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 409,005 in stock, $0.075 at quantity 1, falling to $0.039 at 10,000. [1]

## Sources

1. JLCPCB / LCSC catalog record for C109227, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/transistor-photovoltaic-output-optoisolators_C109227.html>
`;export{e as default};