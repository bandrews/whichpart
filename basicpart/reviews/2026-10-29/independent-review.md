# Independent review and implemented corrections

All 16 Luna finding records and all 22 consolidated records were assessed by the primary agent. Nineteen records are resolved; three proposed Our Picks additions are excluded by the user’s human-selection rule. All 58 selected C-numbers are preserved.

The earlier agent reports remain as historical review evidence. Their PDF-access limitations and open proposals are superseded by this follow-up. This is a review of the identified findings, not certification of every other numeric claim on the site.

## Finding-by-finding decisions

### LUNA-001 — resolved

Applied manufacturer lifecycle guidance. Independently read TDK’s product status and the complete manufacturer-issued PCN-000614 PDF; its LTB/LTS dates are 2024-01-31 / 2024-12-31.

Targets: `content/components/C24112.md`, `src/data/other-components.json`.

Evidence: [TDK product page lists MPU-6050 product status as discontinued and rec](https://product.tdk.com/ja/search/sensor/mortion-inertial/imu/info?part_no=MPU-6050), [TDK/InvenSense PCN-000614 dated 2023-07-23 lists MPU-6050 among produc](https://invensense.tdk.com/wp-content/uploads/2023/09/PCN-000614.pdf).

### LUNA-002 — resolved

Independently checked the current Silicon Products table on the AN2468 web page, not the 2019 application-note PDF. It explicitly marks ATmega328P NRND. ATmega328PB page says In Production. Corrected note and existing pick.

Targets: `content/components/C14877.md`, `src/data/other-components.json`.

Evidence: [Microchip’s AN2468 marks ATmega328P “Not Recommended for new designs” ](https://www.microchip.com/en-us/application-notes/an2468), [Microchip’s current ATmega328PB product page states Status: In Product](https://www.microchip.com/en-us/product/atmega328pb).

### LUNA-003 — resolved

Read RP2040 sections 2.8.4 and 2.15.3: UF2 can load RAM; 133 MHz covers all PVT, 200 MHz requires elevated DVDD. Corrected absolute flash claim and clock row. Wording concerns power loss, not an unsupported claim that every reset destroys SRAM.

Targets: `content/components/C2040.md`.

Evidence: [Section 2.8.4 says a UF2 file is downloaded and written to Flash or RA](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf), [Raspberry Pi describes no built-in flash and states code can run from ](https://www.raspberrypi.com/documentation/microcontrollers/microcontroller-chips.html).

### LUNA-004 — excluded-human-selection

An optional curation suggestion, not an error. Its small-MCU rationale does not authorize selection. Excluded under the human-only Our Picks rule.

Targets: `src/data/other-components.json`, `content/components/C52717.md`.

Evidence: [ST labels STM8S003F3 Active/in volume production and documents 8 KB fl](https://www.st.com/en/microcontrollers-microprocessors/stm8s003f3.html).

### LUNA-005 — resolved

Read TI’s ESD table: CANH/CANL/GND ±16 kV is HBM. It does not certify an assembled connector to IEC 61000-4-2. Replaced the unsupported omit-protection advice.

Targets: `content/components/C12084.md`.

Evidence: [TI Rev. O datasheet section 8.2 specifies ±16,000 V HBM for CANH, CANL](https://www.ti.com/lit/ds/symlink/sn65hvd230.pdf), [TI product page likewise names the protection rating as ±16 kV HBM.](https://www.ti.com/product/SN65HVD230).

### LUNA-006 — excluded-human-selection

64 Kbit equals 8 KiB and lies between the existing capacities, but usefulness is a selection judgment. No addition or substitution is authorized; excluded.

Targets: `src/data/other-components.json`, `content/components/C79988.md`.

Evidence: [ST’s M24C64 datasheet identifies a 64-Kbit serial I²C EEPROM and marks](https://www.st.com/resource/en/datasheet/m24c64-r.pdf).

### LA-001 — resolved

Read TI LM2596 pinout and typical application: five-pin buck regulator with inductor/diode/capacitors. Replaced the mechanically/electrically misleading drop-in 7805 claim.

Targets: `content/components/C10002.md`.

Evidence: [TI's LM2596 datasheet gives a 5-pin TO-263 package and a fixed-output ](https://www.ti.com/lit/ds/symlink/lm2596.pdf), [TI's LM7805 datasheet gives a 3-pin TO-263 package and distinct input,](https://www.ti.com/lit/ds/symlink/lm7800.pdf).

### LA-002 — resolved

Read ADI Rev. L switching tables: AR is 1 Mbps, CR is 25 Mbps. C109227 contains the false 25 Mbps comparison and is fixed. Independently checked C115450: it contains no rate claim and needed no speed correction.

Targets: `content/components/C109227.md`, `content/components/C115450.md`.

Evidence: [Analog Devices' switching-specification table assigns 1 Mbps to ADuM12](https://www.analog.com/media/en/technical-documentation/data-sheets/ADuM1200_1201.pdf), [ADI's product page lists ADUM1201ARZ-RL7 among orderable ADuM1201 vari](https://www.analog.com/en/products/adum1201.html).

### LA-003 — excluded-human-selection

The catalog supports the candidates’ identities/tiers, but selecting distinct use cases is editorial judgment. Three Preferred candidates and Basic HT7533 were suggestions, not defects. All additions excluded under the human-selection rule.

Targets: `src/data/other-components.json`, `content/components/C12044.md`, `content/components/C14289.md`, `content/components/C5625.md`, `content/components/C6521.md`, `content/components/C71035.md`.

Evidence: [Manufacturer TP4057 document describes single-cell linear CC/CV chargi](https://www.toppwr.com/uploadfile/file/20240913/66e3cef054ad8.pdf), [JLCPCB lists C12044 as TP4057-42-SOT26-R, SOT-23-6, 500 mA maximum, no](https://jlcpcb.com/partdetail/12599-TP4057_42_SOT26R/C12044), [Holtek Rev. 2.81 identifies HT7533-1 and supports its 3.3 V, low-power](https://www.holtek.com/webapi/116711/HT75xx-1v281.pdf), [JLCPCB lists C14289 as Holtek HT7533-1, Basic, SOT-89-3, 3.3 V, 100 mA](https://jlcpcb.com/partdetail/C14289), [Nexperia describes 74HC245 as an 8-bit transceiver with 3-state output](https://www.nexperia.com/product/74HC245BZ), [JLCPCB identifies C5625 as Nexperia 74HC245D,653 in SOIC-20-300mil wit](https://jlcpcb.com/partdetail/Nexperia-74HC245D653/C5625), [TI specifies CD4052B as two 4:1 channels, 3–20 V single supply or ±3–±](https://www.ti.com/lit/ds/symlink/cd4052b.pdf), [JLCPCB identifies C6521 as TI CD4052BM96, SOIC-16, with 2 channels, 4:](https://jlcpcb.com/partdetail/C6521), [ST order table lists LM324DT as a 0–70 °C SO-14 order code; the note c](https://www.st.com/resource/en/datasheet/lm124.pdf), [Top Power manufacturer product page describes TP4054 as a 400 mA linea](https://www.toppwr.com/product/?sortid=293), [Exact-part API check via project helper: C12044, C5625 and C6521 each ](https://jlcpcb.com/parts/basic_parts).

### LA-004 — resolved

Verified the October 29 snapshot stock is two and the July count was explicitly historical. Kept that historical statement and added a dated current availability note. No false tier-conflict claim or new pick.

Targets: `raw-data/jlcpcb-basic-parts-2026-10-29.json`, `content/components/C9683.md`.

Evidence: [TI identifies ULN2803A as an 8-channel, 50 V Darlington array.](https://www.ti.com/product/ULN2803A), [TI identifies ULN2003A as a 7-channel counterpart rated 500 mA per cha](https://www.ti.com/product/ULN2003A), [Exact-part API check via project helper: C9683 returns componentLibrar](https://jlcpcb.com/parts/basic_parts).

### LUNA-PASS-001 — resolved

Compared Nexperia package drawings: SOD123FL and SOD123 have distinct outline and land-pattern dimensions. Removed blanket interchangeability claims; SOT-23-6L requires its own drawing rather than an inferred verdict.

Targets: `DATA-CHANGES-MANIFEST.md`, `README.md`.

Evidence: [Nexperia lists SOD123FL as a separate package type and links a dedicat](https://www.nexperia.com/packages/SOD123FL.html), [The package information gives SOD123FL-specific package and footprint ](https://assets.nexperia.com/documents/package-information/SOD123FL.pdf).

### LUNA-PASS-002 — resolved

Read JLCPCB’s fee page and FAQ: Standard PCBA charges feeder loading for both Basic and Extended, while the stated exemption concerns Economic PCBA. Located/corrected all 27 broad phrases, including a wrapped line; two already-correct notes were excluded.

Targets: `content/components/C115450.md`, `content/components/C13482.md`, `content/components/C13738.md`, `content/components/C14289.md`, `content/components/C15127.md`, `content/components/C20917.md`, `content/components/C2286.md`, `content/components/C2290.md`, `content/components/C2488.md`, `content/components/C3113.md`, `content/components/C5605.md`, `content/components/C58069.md`, `content/components/C5947.md`, `content/components/C6186.md`, `content/components/C6187.md`, `content/components/C6855.md`, `content/components/C6961.md`, `content/components/C71035.md`, `content/components/C7426.md`, `content/components/C7512.md`, `content/components/C7950.md`, `content/components/C7955.md`, `content/components/C8963.md`, `content/components/C9002.md`, `content/components/C9006.md`, `content/components/C97521.md`, `content/components/C9864.md`.

Evidence: [JLCPCB describes a distinct Extended Components Fee for Economic PCBA ](https://jlcpcb.com/help/article/pcb-assembly-price), [JLCPCB says Preferred Extended parts are exempt from the Feeders Loadi](https://jlcpcb.com/help/article/pcb-assembly-faqs).

### LUNA-PASS-003 — resolved

Read the ProTek sheet: 3.5 pF typical / 5 pF max and intended USB/Ethernet applications are supported. Blanket no-distortion or universal product-compliance claims are not; qualified the summary/body and system-test guidance. Also corrected the family guide’s unsupported claim that a 12 V clamp necessarily protects a 3.3 V input.

Targets: `content/components/C85364.md`, `content/families/tvs-esd-protection.md`.

Evidence: [ProTek specifies I/O-to-ground capacitance as 3.5 pF typical and 5 pF ](https://protekdevices.com/wp-content/uploads/datasheets/srv05_4.pdf).

### LUNA-RATING-001 — resolved

Retrieved the exact C25190-linked UNI-ROYAL sheet. Section 11 gives ±100 ppm/°C for 0603 >10 Ω; this part is 27 Ω. Corrected the 200 ppm description through a guarded display review and retained the original supplier data.

Targets: `raw-data/jlcpcb-basic-parts-2026-10-29.json`, `reviews/2026-10-29/changed-ratings.json`, `content/families/chip-resistors.md`, `tasks/descriptions-resistors.json`.

Evidence: [JLCPCB's indexed product page currently reports ±200 ppm/°C in both de](https://jlcpcb.com/partdetail/25933-0603WAF270JT5E/C25190), [UNI-ROYAL's thick-film resistor series table states ±100 ppm/°C for 06](https://www.uni-royal.cn/images/userfile/file/1590821906c56505e6d9ab55c7.pdf), [The supplied exact-part datasheet link; it could not be retrieved thro](https://www.lcsc.com/datasheet/lcsc_datasheet_2205311845_UNI-ROYAL-Uniroyal-Elec-0603WAF270JT5E_C25190.pdf).

### LUNA-RATING-002 — resolved

Retrieved the exact Brightking C78395 PDF. The row gives 1000 µA, but the footnote doubles IR for bidirectional VRWM ≤10 V. Applied 2 mA max at 5.8 V/25 °C, rejecting both the old 1 µA prose and unqualified 1 mA attribute as final design limits.

Targets: `raw-data/jlcpcb-basic-parts-2026-10-29.json`, `reviews/2026-10-29/changed-ratings.json`, `tasks/descriptions-tvs-esd.json`.

Evidence: [The current LCSC page search result reports 1 µA reverse leakage for C](https://lcsc.com/product-detail/C78395.html), [Brightking's P6SMB family sheet says reverse leakage for bidirectional](https://www.mouser.com/datasheet/2/447/P6SMB_0-1604913.pdf), [The supplied exact-part datasheet link; this review could not retrieve](https://www.lcsc.com/datasheet/lcsc_datasheet_1810181007_Brightking-P6SMB6-8CA-TR13_C78395.pdf).

### LUNA-RATING-003 — resolved

Retrieved and rendered the exact SM08 sheet. The diagram shows protected pins 1/2 and common anode pin 3; added the two-channel description. Table also resolves 13.4 V@1 A vs 24 V@15 A (8/20 µs), not conflicting clamp values.

Targets: `tasks/descriptions-tvs-esd.json`, `raw-data/jlcpcb-basic-parts-2026-10-29.json`, `reviews/2026-10-29/changed-ratings.json`.

Evidence: [The catalog page URL for the part; the supplied fresh snapshot reports](https://www.lcsc.com/product-detail/esd-and-surge-protection-tvs-esd_hongjiacheng-sm08_C42413902.html), [The supplied exact-part datasheet link; it could not be retrieved as a](https://www.lcsc.com/datasheet/lcsc_datasheet_2501211440_hongjiacheng-SM08_C42413902.pdf).

### REFRESH-001 — resolved

Current exact API lookup agrees with W5500 identity/tier and the LQFP-48_7x7 package spelling. Updated existing metadata and rebuilt note index; no physical substitution.

Targets: `src/data/other-components.json`, `content/components/C32843.md`, `content/index.json`.

### REFRESH-002 — resolved

Read the live C114586 page and its exact linked eight-page Worldsemi V5 PDF. Corrected identity, package, Standard Only restriction, >280 µs reset, 2.7 V VIH test condition, optical figures, and unsupported older-revision claims. Added a strict Standard-only page fallback rather than treating search absence as a tier change.

Targets: `src/data/other-components.json`, `content/components/C114586.md`, `content/index.json`.

Evidence: [Browser inspection on 2026-10-29: WS2812B-B/W, SMD5050-4P, Extended, S](https://jlcpcb.com/partdetail/C114586), [Exact-part datasheet link observed on the product page; full electrica](https://jlc-prod-smt.oss-eu-central-1.aliyuncs.com/smtDataManualFile/8791060521166077952-C114586.pdf).

### REFRESH-003 — resolved

Code and browser behavior show curated Extended notes have local detail pages. Corrected README.

Targets: `README.md`.

### REFRESH-004 — resolved

Updated Vite to the compatible 8.3.5 release and source-map-js to 1.2.2 through the lockfile. npm audit now reports zero vulnerabilities; build and regression checks pass.

Targets: `package.json`, `package-lock.json`.

Evidence: [source-map-js indexed-section offset denial of service advisory.](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).

### REFRESH-005 — resolved

Package mismatches now count as strict-audit errors. Added regression coverage and a human-selection membership guard for Our Picks.

Targets: `scripts/audit-curated-picks.js`, `README.md`.

### REFRESH-006 — resolved

Independently recalculated 100 ppm/°C × 50 °C = 0.5%, which is half of 1%, and checked category counts (293 resistors vs 324 TVS). Fixed the arithmetic/ranking and qualified tracking assumptions.

Targets: `content/families/chip-resistors.md`.

## Source checks for all 14 changed-rating records

The exact-part-linked manufacturer PDFs were retrieved and their changed fields checked, including the low-voltage bidirectional leakage footnotes. The guarded display reviews preserve source records and expose the applicable conditions:

- **C25190 — 0603WAF270JT5E:** UNI-ROYAL's exact-part-linked thick-film datasheet (V.3, 2019-02-12, section 11) specifies ±100 ppm/°C for 0603 resistors above 10 Ω. This 27 Ω part is in that range. The catalog attribute is correct; the description's ±200 ppm/°C has been corrected here. The raw supplier record is preserved.
- **C78395 — P6SMB6.8CA/TR13:** Brightking's exact-part-linked P6SMB table gives 1,000 µA at 5.8 V and 25 °C, then requires doubling IR for bidirectional types with VRWM ≤10 V. The applicable limit is therefore 2,000 µA (2 mA), not the old 1 µA description or the newer 1 mA attribute without its footnote. The original supplier values are retained in the source snapshot.
- **C42413902 — SM08:** Hongjiacheng SM Series Rev. 2.1 shows two unidirectional protection lines at pins 1 and 2 with their common anode at pin 3. The SM08 row specifies 8.5 V minimum breakdown at 1 mA, 13.4 V maximum clamping at 1 A, and 24 V maximum at 15 A (8/20 µs). The two clamp figures are different test currents, not conflicting limits. The two-channel label is manufacturer-confirmed.
- **C7420375 — SM712:** The exact SM712 sheet confirms 300 W and 12 A for an 8/20 µs waveform. It protects two asymmetric −7 V/+12 V lines; the two standoff values refer to opposite directions, not a symmetric 7 V clamp.
- **C19077496 — SMF3.3CA:** The exact-part-linked SMF table gives SMF3.3CA breakdown 5.2–6.5 V at 10 mA and 8.8 V maximum clamping at 22.7 A, 10/1000 µs. Its 500 µA table leakage limit is doubled by note 3 for bidirectional parts at ≤10 V standoff: use 1 mA maximum at 3.3 V and 25 °C. The older description has been corrected; original values are retained.
- **C19077522 — SMAJ3.3CA:** The exact-part-linked SMAJ table gives SMAJ3.3CA breakdown 5.2–6 V at 10 mA. Its 800 µA table leakage limit is doubled by note 3 for bidirectional parts at ≤10 V standoff: use 1.6 mA maximum at 3.3 V and 25 °C. The catalog’s 6 V is the breakdown maximum, and its 800 µA scalar omits the footnote; the older 9 V/600 µA description is corrected too.
- **C20615779 — H5VN06B:** The exact H5VN06B table specifies 15 pF typical and 22 pF maximum at 0 V and 1 MHz. The catalog change from 15 to 22 pF changed the reported statistic, not the device.
- **C20615780 — H5VU06B:** The exact H5VU06B table gives 0.3 pF typical and 0.5 pF maximum at 0 V and 1 MHz. The newer 0.3 pF catalog scalar must not be treated as a maximum.
- **C20615782 — H3V3U10B:** The exact H3V3U10B table gives 0.25 pF typical and 0.3 pF maximum at 0 V and 1 MHz. Preserve both conditions rather than interpreting the catalog change as a lower guaranteed maximum.
- **C20615800 — H5VU25UC:** The exact H5VU25UC table distinguishes I/O-to-ground capacitance (0.8 pF maximum) from I/O-to-I/O capacitance (0.3 pF typical, 0.4 pF maximum), all at 0 V and 1 MHz. The old pair represented different pin pairs.
- **C20615809 — H8VSD3B:** The exact H8VSD3B table specifies 13 V maximum clamping at 1 A and 25 V maximum at 20 A, both with an 8/20 µs pulse. These are different test-current limits.
- **C20615824 — H5VUT2U:** The exact H5VUT2U table gives I/O-to-ground capacitance of 0.6 pF typical/0.8 pF maximum and I/O-to-I/O capacitance of 0.3 pF typical/0.4 pF maximum. The catalog 0.6 pF is a typical value.
- **C20617909 — H3V3N10B:** The exact H3V3N10B table specifies 5 nA typical and 50 nA maximum leakage at VRWM = 3.3 V and 25 °C. The catalog change switched from maximum to typical; it did not establish a new 5 nA limit.
- **C20617916 — H4V5HD3U:** The exact H4V5HD3U table specifies 7 V maximum clamping at 20 A and 15 V maximum at 185 A with an 8/20 µs pulse. The old pair described two current conditions, not forward/reverse operation.

Document hashes and machine-readable decisions are in [independent-review.json](independent-review.json). The original catalog remains in the raw snapshot; reviewed values are applied during index generation and retain `catalogOriginal` evidence. A later source change fails the generation guard and requires a new review.

## Validation

The live exact-part checker passes all 15 checks. C114586 uses exact product-page identity plus an explicit Standard Only/Extended combination, with no invented API flag or price. The main refresh pipeline and 19 regression tests pass. Both note snapshot dates are preserved; changing one document no longer forces false dates on older notes. The npm audit after the lockfile update has zero vulnerabilities.
