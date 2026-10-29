# Luna digital and connected-part audit — 2026-10-29

## Scope

Audited the requested component-note areas: microcontrollers; memory and RTCs; interfaces and digital isolators; sensors; and connectors. This includes RP2040 C2040 and the ordinary Extended selections. Reviewed the repository guidance (`README.md`, `content/FORMAT.md`, `content/README.md`), component-note inventory for the requested kinds, curated pick descriptions/notes, their generated friendly descriptions, and the Our Picks page rendering.

Coverage is editorial and targeted. It is not a fresh datasheet-by-datasheet validation of every specification row. Current stock, tier and pricing are being refreshed from the 2026-10-29 catalog and are left for that reconciliation.

## Proposed findings

### LUNA-001 — MPU-6050 lifecycle evidence is outdated (P2)

`content/components/C24112.md` says a TDK lifecycle notice could not be retrieved and frames the discontinuance as unconfirmed; `src/data/other-components.json` already says TDK marks the MPU-6050 discontinued. TDK’s official product page now labels it discontinued and the official 2023 PCN gives a last-time-buy date of 2024-01-31 and last-time-ship date of 2024-12-31. Update the component note to cite the manufacturer evidence and frame this as a legacy compatibility/repair pick, not a new-design recommendation.

Evidence: [TDK product page](https://product.tdk.com/ja/search/sensor/mortion-inertial/imu/info?part_no=MPU-6050); [TDK/InvenSense PCN-000614](https://invensense.tdk.com/wp-content/uploads/2023/09/PCN-000614.pdf).

### LUNA-002 — ATmega328P new-design guidance is obscured (P2)

`content/components/C14877.md` and the curated note in `src/data/other-components.json` describe mixed distributor lifecycle signals, but Microchip AN2468 explicitly marks ATmega328P “Not Recommended for new designs.” Microchip’s ATmega328PB page says that related device is in production and recommended by Microchip. Update the note to lead with that manufacturer guidance; explain that a related variant still needs a compatibility check rather than implying a universal drop-in successor.

Evidence: [Microchip AN2468](https://www.microchip.com/en-us/application-notes/an2468); [Microchip ATmega328PB product page](https://www.microchip.com/en-us/product/atmega328pb).

## Files

The companion `luna-digital.json` has the machine-readable inventory, findings, URLs and evidence summaries.

## Deepened review

The 2026-10-29 raw snapshot contains 1,586 parts (351 Basic, 1,235 Preferred); the requested notes for qualifying parts continue to map to their C-number/package/tier records. The updated catalog attributes for the two FORESEE memory notes were checked: C719499 now lists 50 µA NAND standby and 120 µA controller standby, which agree with the values the note draws from the manufacturer datasheet; C5126825 lists 104 MHz, 10 µA standby, 350 µs page program and 2 ms block erase, which the note correctly identifies as catalog typical figures with ECC disabled and contrasts with the datasheet's longer ECC-enabled timings. Their `tasks/descriptions-mixed-components.json` descriptions remain appropriately broad (“8GB eMMC” and “512Mbit SPI NAND Flash”).

### LUNA-003 — RP2040 flash and clock claims need tighter qualification (P2)

The note’s “Nothing runs without it” external-flash bullet is too absolute: Raspberry Pi’s Boot ROM accepts a UF2 that it writes to flash **or RAM**, then reboots the device. RAM-loaded code can run without external flash, but is volatile. Also, the datasheet gives 133 MHz as the maximum system clock across process, voltage and temperature variations; 200 MHz is achievable with elevated core supply and VREG VSEL at 1.15 V, not the all-conditions clock limit. Revise the table to call 133 MHz the guaranteed maximum and 200 MHz an elevated-voltage overclock/achievable point; clarify external flash is needed for persistent program storage and normal cold boot of a stored application.

Evidence: [RP2040 datasheet](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf), sections 2.8.4 and 2.15.3; [Raspberry Pi RP2040 overview](https://www.raspberrypi.com/documentation/microcontrollers/microcontroller-chips.html).

### LUNA-004 — Consider STM8S003F3P6TR as a budget MCU pick (P3)

C52717 is an exact qualifying Preferred part (STM8S003F3P6TR, TSSOP-20) with an existing spec note. ST currently identifies the device as active and in volume production; its value-line spec has 8 KB flash, 1 KB RAM, 128 bytes of true EEPROM, 16 MHz and a 2.95–5.5 V supply. Consider it as a simple 8-bit choice, with clear caveats about the proprietary STM8 core/toolchain, small memory and supply floor.

Evidence: [ST product page](https://www.st.com/en/microcontrollers-microprocessors/stm8s003f3.html) and the checked C52717 record in `raw-data/jlcpcb-basic-parts-2026-10-29.json`.

For RTC/EEPROM candidates, DS1302Z+T&R (C8959) is a niche legacy module choice, with a non-I²C three-wire interface and 0–70 °C grade, so it is not a general Our Picks recommendation. C79988 (M24C64-RMN6TP) could fill the capacity gap between the current 2-Kbit and 256-Kbit EEPROM entries, but its note explains that 1-MHz timing and higher endurance depend on process letters the order code does not identify; any pick would need that caveat.

### LUNA-005 — Do not equate the CAN transceiver HBM rating with connector immunity (P2)

The SN65HVD230 note says its ±16 kV bus ESD rating is the reason it can run to a connector without additional protection. TI identifies this as a component-level Human Body Model (HBM) rating; its datasheet does not give a matching IEC 61000-4-2 connector-level rating. Reword this as a useful robustness feature and tell readers to select any external TVS/common-mode protection against the actual system immunity and surge requirements. HBM alone does not show that a board or product passes connector-discharge testing.

Evidence: [TI SN65HVD23x datasheet](https://www.ti.com/lit/ds/symlink/sn65hvd230.pdf), section 8.2; [TI SN65HVD230 product page](https://www.ti.com/product/SN65HVD230).

The raw-snapshot identity check covered all 36 component notes in the requested kinds. All 30 qualifying entries matched manufacturer part, category, package and tier. The six notes for ordinary Extended parts (C168688, C2040, C2765186, C32843, C529330, C84681) are absent from the qualifying snapshot as expected. This checks catalog identity and selection tier, not every electrical table value.

### LUNA-006 — Consider the M24C64 as the middle-capacity EEPROM pick (P3)

C79988 (M24C64-RMN6TP) is a qualifying Preferred 64-Kbit (8-KiB) I²C EEPROM in SOIC-8, with an existing note. The current EEPROM recommendations jump from 2 Kbit to 256 Kbit, so consider adding it as the intermediate-capacity option. Keep the note’s process-letter caveat prominent: the cited 1-MHz timing and higher endurance are not guaranteed for an order code that does not identify the process. Refresh catalog pricing and stock before adding.

Evidence: [ST M24C64 datasheet](https://www.st.com/resource/en/datasheet/m24c64-r.pdf) and the checked C79988 entry in the 2026-10-29 raw snapshot.
