var e=`---
part: C24112
mpn: MPU-6050
manufacturer: TDK InvenSense
category: Accelerometers
kind: sensor
package: QFN-24-EP(4x4)
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: MPU-6000 and MPU-6050 Product Specification
  publisher: InvenSense Inc. (now TDK InvenSense)
  document: PS-MPU-6000A-00
  revised: 2013-08-19
  url: https://www.cdiweb.com/datasheets/invensense/MPU-6050_DataSheet_V3%204.pdf
summary: The six-axis motion sensor behind a decade of hobby projects — with an exposed pad the datasheet tells you not to solder.
---

# MPU-6050

## What it is

A six-axis inertial measurement unit: a three-axis gyroscope and a three-axis
accelerometer on one die, reporting over I²C. The accelerometer measures which
way is down and how hard the device is being shaken; the gyroscope measures how
fast it is rotating. Together they tell you a device's orientation and motion. [1]

The MPU-6050 is the sensor in the GY-521 module that appears in almost every
quadcopter, self-balancing robot and gesture project of the last decade. That
ubiquity — and the enormous body of code written for it — is the main reason to
choose it now. It also carries InvenSense's Digital Motion Processor, an on-chip
engine that does the sensor-fusion arithmetic so your microcontroller does not
have to. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Measurand and ranges | Gyroscope ±250, ±500, ±1000 or ±2000 °/s; accelerometer ±2, ±4, ±8 or ±16 g. Both selected in software [1] | Pick the narrowest range that covers your motion. ±2 g suits orientation sensing, ±16 g suits impact detection; a wider range than you need simply throws away resolution. |
| Interface | I²C, up to 400 kHz in Fast mode (100 kHz Standard mode). Address 1101000, or 1101001 when the AD0 pin is high [1] | Two wires, and the AD0 pin lets you put two of them on one bus. |
| Resolution | 16-bit ADC on every axis. At ±2 g that is 16,384 counts per g; at ±250 °/s, 131 counts per °/s [1] | Roughly 0.06 mg per count at the most sensitive setting — finer than the sensor's own noise floor, so resolution is never your limit. |
| Supply voltage | VDD 2.375 V to 3.46 V. Separate VLOGIC pin for the I²C side: 1.8 V ±5 % or tied to VDD [1] | A 3.3 V part with no 5 V tolerance. The separate VLOGIC pin lets you talk to a 1.8 V processor without level shifters — a genuinely useful feature that the catalog listing does not mention. |
| Supply current | 3.9 mA typical with gyroscope, accelerometer and DMP all running; 500 µA accelerometer only; 10 µA in accelerometer low-power mode at 1.25 Hz; 5 µA full-chip idle [1] | The catalog lists only the 5 µA idle figure. Budget for 3.9 mA when the part is actually doing its job — nearly 800 times more. |
| Operating temperature | −40 °C to +105 °C in the absolute maximum ratings; temperature-dependent behaviour is characterised only over −40 °C to +85 °C, and all electrical specifications are quoted at 25 °C [1] | The catalog's −40 °C to +85 °C is the range over which the part's drift is actually characterised, which is the more useful number. [2] |

## What the datasheet actually says

**The exposed pad must not be soldered.** This is the single most surprising
instruction in the document, and it is the opposite of normal QFN practice.
Section 11.4.2 states that the exposed die pad "is not required for heat sinking,
and should not be soldered to the PCB", because doing so induces
thermo-mechanical stress that changes the sensor's readings. There is no
electrical connection between the pad and the silicon. [1]

**Do not route anything under the package.** Section 11.4.3 prohibits traces and
vias beneath the exposed die pad: active signals can couple harmonically into the
gyroscope's mechanical resonators, which run at 33 ±3 kHz (X), 30 ±3 kHz (Y) and
27 ±3 kHz (Z). A plain ground plane under the part is what the datasheet asks
for instead. [1]

**The 1024-byte FIFO is there to save power, not just time.** The datasheet's own
framing is that buffering lets the host processor sleep between burst reads
rather than waking for every sample. [1]

**Zero-offset error is larger than you might assume.** Out of the box the
gyroscope's zero-rate output can sit up to ±20 °/s away from zero, and the
accelerometer up to ±50 mg on X and Y, ±80 mg on Z. Every practical design
calibrates these out at startup. [1]

## Watch out for

- **Do not solder the exposed pad, and do not route under it.** Both are stated
  requirements, not suggestions. [1]
- **A gyroscope drifts and an accelerometer is noisy.** Neither alone gives a
  stable orientation; combining them — a complementary filter, a Kalman filter,
  or the chip's own Digital Motion Processor — is the whole art of using this part.
- **No magnetometer.** Six axes, not nine. Without a compass there is no absolute
  heading reference, so yaw drifts indefinitely however good your filter is.
- **3.3 V only.** Absolute maximum VDD is 6 V, but the specified operating range
  stops at 3.46 V. The popular breakout boards accept 5 V because they carry
  their own regulator; a bare chip does not. [1]
- **Availability is tightening.** Distributor listings reviewed on 2026-08-19
  flag the part as not recommended for new designs, with constrained stock and
  long lead times; at least one major distributor has stopped stocking it. No
  TDK InvenSense lifecycle notice could be retrieved to confirm a formal
  end-of-life declaration, so treat this as a supply-chain caution rather than a
  manufacturer position. [3]
- **It is expensive here** — $14.48 in ones, the highest unit price of any part
  in this catalog. Newer six-axis sensors cost a fraction of that. [2]

## In this catalog

Preferred Extended part in QFN-24 with exposed pad (4×4 mm). At the 2026-07-24
snapshot: 19,219 in stock, $14.48 at quantity 1, falling to $13.10 at 10,000,
$12.60 at 30,000 and $11.60 at 100,000 and above. The catalog attributes record
±16 g and ±2,000 dps maximum ranges, 16-bit output, I²C, 2.375 V–3.46 V supply,
5 µA standby current, a 1 kB buffer, motion event detection and −40 °C to
+85 °C — all of which the datasheet confirms, though it lists only the maxima of
the selectable ranges and only the idle figure for current. [2]

## Sources

1. InvenSense Inc., *MPU-6000 and MPU-6050 Product Specification*, document
   PS-MPU-6000A-00, revision 3.4, released 2013-08-19. Sections 6.1 (Gyroscope
   Specifications), 6.2 (Accelerometer Specifications), 6.3 (Electrical and
   Other Common Specifications), 6.4 (Serial Interface), 6.5 (Idle current),
   7.17 (FIFO), 10 (Absolute Maximum Ratings), 11.4.2 (Exposed Die Pad
   Precautions), 11.4.3 (Trace Routing).
   <https://www.cdiweb.com/datasheets/invensense/MPU-6050_DataSheet_V3%204.pdf>
2. JLCPCB / LCSC catalog record for C24112, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). Source for package, tier,
   price, stock and the catalog attribute strings.
   <https://www.lcsc.com/product-detail/accelerometers_tdk-invensense-mpu-6050_C24112.html>
3. Distributor lifecycle listings reviewed 2026-08-19 (Mouser lists the part
   NRND; RS Online no longer stocks it). No manufacturer end-of-life notice was
   retrievable — TDK's own product pages returned HTTP 403 or a not-found shell.
   See \`ISSUES.md\`.
`;export{e as default};