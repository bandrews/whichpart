var e=`---
part: C32843
mpn: W5500
manufacturer: WIZnet
category: Interfaces & Isolation
kind: interface
package: LQFP-48(7x7)
tier: extended
catalog_snapshot: 2026-07-24
datasheet:
  title: W5500 Datasheet
  publisher: WIZnet Co., Ltd.
  document: Version 1.1.0
  revised: 2013
  url: https://docs.wiznet.io/img/products/w5500/W5500_ds_v110e.pdf
summary: Ethernet on an SPI bus — TCP/IP runs inside the chip, so your microcontroller does not need a network stack.
---

# W5500

## What it is

The W5500 puts an entire wired Ethernet connection behind an SPI bus. It contains
the Ethernet PHY, the MAC, and — the unusual part — a hardwired TCP/IP stack. Your
microcontroller does not run lwIP or any other network stack; it writes bytes to
a socket register and the chip does the protocol work. [1]

That is what makes it attractive for small microcontrollers. An 8-bit AVR or a
modest STM32 can serve web pages over Ethernet with the W5500, because the
protocol handling and the 32 kB of packet buffering both live in the chip rather
than in the host's RAM. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | 10/100 Ethernet controller with integrated PHY, MAC, and hardwired TCP/IP; eight independent sockets simultaneously [1] | Eight sockets means eight concurrent connections without any host-side multiplexing. |
| Signalling standard | 10BaseT / 100BaseTX with auto-negotiation for speed and duplex; supports TCP, UDP, ICMP, IPv4, ARP, IGMP and PPPoE [1] | A standard Ethernet port. PPPoE support is unusual and useful for direct DSL connections. |
| Maximum data rate | SPI clock up to 80 MHz by design; WIZnet notes that the speed tested and measured with a stable waveform is 33.3 MHz [1] | Design to 33 MHz, not 80. WIZnet says so in the datasheet itself. |
| Supply voltage | 3.3 V operation with 5 V-tolerant I/O; absolute maximum 4.6 V on the supply [1] | 5 V tolerance means you can drive it from a 5 V Arduino without level shifting. |
| Isolation or protection | None on-chip — an Ethernet magnetics transformer is required externally, and the datasheet specifies its characteristics [1] | The magnetics provide the galvanic isolation Ethernet requires. This is not optional. |
| Operating temperature | −40 °C to +85 °C; maximum junction temperature 125 °C [1] | Industrial range. |

## What the datasheet actually says

**32 kB of internal memory is split between transmit and receive buffers**, and
you allocate it across the eight sockets. On a microcontroller with 8 kB of RAM,
having the packet buffers inside the Ethernet chip is what makes the whole thing
feasible. [1]

**It does not support IP fragmentation.** WIZnet lists this as an explicit
non-feature. If a packet arrives fragmented, the W5500 cannot reassemble it —
which in practice means keeping your MTU sane and avoiding protocols that rely on
fragmentation. [1]

**80 MHz is theoretical.** The datasheet says plainly that "even though
theoretical design speed is 80 MHz, the signal in the high speed may be
distorted", and gives 33.3 MHz as the tested figure. Treat 33 MHz as the real
ceiling. [1]

**Power-down mode and Wake-on-LAN over UDP** are both supported, so a
battery-backed device can sleep and be woken by a network packet. [1]

**LED outputs are provided** for full/half duplex, link, speed and activity —
drive the RJ45 jack's indicator LEDs directly. [1]

## Watch out for

- **This is an ordinary Extended part at JLCPCB.** Check the assembly surcharge
  and feeder availability.
- **You need Ethernet magnetics and an RJ45 jack.** Often combined in a
  "MagJack", but they are a real cost and a real layout constraint.
- **Design the SPI bus for 33 MHz**, not 80.
- **The datasheet is from 2013.** The part remains widely used and available, but
  it is a mature design.
- **No IP fragmentation support** — check that your application does not need it.

## In this catalog

Listed as an ordinary Extended part in the curated recommendations, in LQFP-48
(7×7 mm, 0.5 mm pitch). Because it is Extended rather than Basic or Preferred, it
does not appear in the qualifying catalog snapshot, so no price or stock figures
are recorded here. [2]

## Sources

1. WIZnet Co., Ltd., *W5500 Datasheet*, Version 1.1.0. Features and Target
   Applications (pages 2–3), Section 5.1 (Absolute Maximum Ratings), Section 5.5
   (AC Characteristics), Section 5.5.4 (SPI Timing), Section 5.5.5 (Transformer
   Characteristics). <https://docs.wiznet.io/img/products/w5500/W5500_ds_v110e.pdf>
2. basicp.art curated recommendations, \`src/data/other-components.json\`,
   catalog snapshot 2026-07-24.
`;export{e as default};