var e=`---
family: Tactile switches
part_count: 2
categories:
  - Tactile Switches
kind: electromechanical
catalog_snapshot: 2026-07-24
summary: The push button — a mechanical part on an electronic board, with mechanical specifications to match.
---

# Tactile switches

## What they are

A momentary push button: press it and a metal dome collapses to make contact,
release it and the dome springs back. The catalog holds two, from XKB Connection
and XUNPU, in 5.1 × 5.1 mm and 4 × 3 mm surface-mount bodies. [1]

They are the one part on most boards that a user physically touches, which makes
their mechanical specifications more important than their electrical ones. The
electrical rating is trivially adequate for a logic input; the operating force,
travel and lifetime are what determine whether the product feels right and keeps
working.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Operating force** | How hard you must press, in newtons. Sets the "feel". |
| **Switch height / travel** | How far the button moves. Together with force, this is the tactile response. |
| **Life** | Rated actuations, e.g. 100,000 cycles. |
| **Contact current / voltage rating** | The electrical limits — usually far more than a logic input needs. |
| **Actuator style and cap colour** | What the user sees and feels. |
| **Mounting type** | Surface-mount or through-hole, vertical or right-angle. |
| **Contact resistance** | How much resistance the closed switch adds. XKB specifies 100 mΩ maximum — negligible against a pull-up, but not against a low-value divider. [2] |
| **Operating temperature** | Narrower than most electronic parts — −30 °C to +85 °C for the XKB part, −30 °C to +80 °C for the XUNPU one. [1] |

## What actually matters in practice

**Contacts bounce, and you must handle it.** A mechanical switch does not make
one clean transition; it chatters for a few milliseconds. A microcontroller
polling fast enough will see several presses. Debouncing in software — ignore
further changes for 20–50 ms after an edge — is the usual answer, and it is
non-negotiable.

**Operating force is a product decision, not an electrical one.** 1.6 N is a
firm, positive click; lighter switches feel cheap, heavier ones feel stiff. If
the button is behind a panel or a membrane, the panel adds its own force and
travel, and the combination is what the user actually feels. Prototype it.

**Rated life assumes rated conditions.** 100,000 cycles sounds like a lot until
you count: a button pressed 20 times a day lasts about 14 years; one pressed
every few seconds in a menu system does not.

**The electrical rating is a maximum, not a recommendation.** 50 mA at 12 V is
plenty for a logic input with a pull-up, but switching an inductive load
directly through a tactile switch will arc across the contacts and destroy them
quickly. Switch the logic, let a transistor switch the load.

**Contact plating matters at low current, and neither of these is gold.** At
signal levels there is not enough energy to break through surface oxide, which is
why switches intended for logic-level use are often specified with gold or
gold-flashed contacts. Be careful reading the catalog here: the \`Actuator/Cap
Color: Gold\` attribute on the XKB part describes the *button*, not the contacts.
XKB's own drawing lists the contact as silver-plated stainless steel and the
terminals as silvered brass. [1] [2] In practice these switches work perfectly
well on a logic input with a pull-up — the specified contact resistance is
100 mΩ — but if you are switching a genuinely tiny signal, or the product will
live somewhere corrosive, that is a specification worth checking rather than
assuming.

**Travel is a quarter of a millimetre.** XKB specifies 0.25 mm of travel, with
the drawing showing 0.2 ±0.1 mm. That is the whole movement: what makes a
tactile switch feel positive is the snap of the dome collapsing, not the
distance. It also means a panel or overlay with any give of its own will
dominate the feel entirely. [2]

**Mechanical mounting carries the load.** A surface-mount tactile switch pressed
by a finger transmits that force into the solder joints. Parts with through-hole
retention posts, or a footprint with generous pads, survive much longer.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| \`Operating Force\` | e.g. \`1.6N\`. The "feel" number. |
| \`Switch Height\` | Body height; with travel, determines the click. |
| \`Life\` | Rated actuations, e.g. \`100,000 cycles\`. |
| \`Contact Current\` / \`Voltage Rating\` | Electrical maxima, e.g. \`50mA\` / \`12V\`. |
| \`Circuit\` | e.g. \`SPST\`. |
| \`Actuator Style\` / \`Actuator/Cap Color\` | What the user sees. **Cap colour, not contact plating** — see above. |
| \`Mounting Type\` | e.g. \`Surface Mount,Vertical\`. |
| \`Length\` / \`Width\` | Body size, e.g. \`5.1mm\` × \`5.1mm\`. |
| \`With Bracket\` / \`With Lamp\` | Mechanical retention and illumination options. |
| \`Operating Temperature\` | e.g. \`-30℃~+85℃\` — narrower than most parts here. |

## Watch out for

- **Debounce in software.** Always.
- **Prototype the feel** with the actual panel or cap, not the bare switch.
- **Count your expected actuations** against the rated life.
- **Do not switch loads directly** — switch logic, and let a transistor do the
  work.
- **Only two parts in this catalog**, so the choice of size and feel is limited.
- **\`Actuator/Cap Color: Gold\` is the button colour**, not a gold contact.

## Sources

1. JLCPCB / LCSC catalog records for the Tactile Switches category, snapshot
   2026-07-24 (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\` and
   \`src/data/parts-index.json\`). Force, height, life, current, voltage,
   mounting and temperature figures are the attribute values recorded there.
2. XKB Industrial Precision Co., Limited, drawing \`TS-1187A-X-X-X\`, revision A0,
   January 2020. Specification block (contact rating, contact resistance,
   insulation resistance, dielectric strength, travel, operating and storage
   temperature), the materials and finishing table (contact, terminal, cover and
   keystake plating), and the operating-force and height code tables. The
   document is a scanned drawing with no text layer; it was read as an image.
   Retrieved via the LCSC datasheet link for C318884.
   <https://www.lcsc.com/datasheet/lcsc_datasheet_2304140030_XKB-Connection-TS-1187A-B-A-B_C318884.pdf>
`;export{e as default};