var e=`---
part: C24112
mpn: MPU-6050
manufacturer: TDK InvenSense
category: Accelerometers
kind: sensor
package: QFN-24-EP(4x4)
tier: preferred
catalog_snapshot: 2026-07-24
summary: The six-axis motion sensor behind a decade of hobby projects — and one TDK has discontinued.
---

# MPU-6050

> **Note on sources.** TDK InvenSense's MPU-6050 product page and datasheet could
> not be retrieved automatically; the URLs tried returned an HTML shell rather
> than the PDF. Every figure below comes from the JLCPCB/LCSC catalog record and
> is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

A six-axis inertial measurement unit: a three-axis accelerometer and a three-axis
gyroscope on one die, reporting over I²C. The accelerometer measures which way is
down and how hard the device is being shaken; the gyroscope measures how fast it
is rotating. Combined, they tell you a device's orientation and motion. [1]

The MPU-6050 is the sensor in the GY-521 module that appears in almost every
quadcopter, self-balancing robot and gesture project of the last decade. That
ubiquity — and the enormous body of code written for it — is the main reason to
choose it now. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Measurand and ranges | Three-axis accelerometer up to ±16 g and three-axis gyroscope up to ±2,000 degrees per second, both software-selectable [1] | ±2 g is right for orientation sensing; ±16 g for impact detection. Choosing a wider range than you need throws away resolution. |
| Interface | I²C [1] | Two wires, and the address is selectable by a pin so you can have two on a bus. |
| Resolution | 16-bit output on every axis [1] | At ±2 g, 16 bits is roughly 0.06 mg per count — far finer than the sensor's actual noise floor. |
| Supply voltage | 2.375 V to 3.46 V [1] | A 3.3 V part with no 5 V tolerance. The popular breakout modules add their own regulator, which is why they accept 5 V; a bare chip does not. |
| Supply current | 5 µA standby [1] | Low standby, but the running current with both sensors active is much higher and is not recorded in the catalog. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the specification implies

**There is a 1 kB FIFO buffer.** The catalog records it as "Cache Size: 1KB", and
it is what lets a slow microcontroller keep up: the sensor accumulates samples at
its own rate and the host reads them in bursts, instead of having to service
every sample.

**Motion event detection and timestamping** are listed as features. The MPU-6050
can interrupt the host when motion exceeds a threshold, which lets a
battery-powered device sleep until something happens.

**A gyroscope drifts; an accelerometer is noisy.** Neither on its own gives a
stable orientation. Combining them — a complementary filter, or a Kalman filter,
or the chip's own Digital Motion Processor — is the whole art of using this part,
and it is where all the example code goes.

**No magnetometer.** Six axes, not nine. Without a compass there is no absolute
heading reference, so yaw will drift indefinitely no matter how good your filter
is.

## Watch out for

- **TDK has discontinued it.** The repository's own curated note says so, and
  that is the most important fact about designing it in today. It remains
  available and well supported, but it is not a part to start a long-lived
  product around. [2]
- **It is expensive here** — $14.48 in ones, the highest unit price of any part
  in this catalog, falling only to $11.60 at 100,000. Newer six-axis sensors cost
  a fraction of that.
- **3.3 V only.** No 5 V tolerance on the bare chip.
- **The QFN-24 has an exposed pad** that must be soldered, and the package is
  sensitive to board stress — mechanical strain on the PCB shows up as sensor
  offset.
- **Yaw will drift.** Add a magnetometer if you need absolute heading.

## In this catalog

Preferred Extended part in QFN-24 with exposed pad (4×4 mm). At the 2026-07-24
snapshot: 19,219 in stock, $14.48 at quantity 1, falling to $11.60 at 100,000.
The catalog attributes record ±16 g and ±2,000 dps ranges, 16-bit output, I²C,
2.375 V–3.46 V supply, 5 µA standby current, a 1 kB buffer, motion event
detection and −40 °C to +85 °C. [1]

## Sources

1. JLCPCB / LCSC catalog record for C24112, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/accelerometers_tdk-invensense-mpu-6050_C24112.html>
2. basicp.art curated recommendations, \`src/data/other-components.json\`, which
   already carries the note that TDK marks the MPU-6050 discontinued.
`;export{e as default};