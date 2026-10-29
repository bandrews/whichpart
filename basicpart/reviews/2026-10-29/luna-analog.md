# Luna analog and logic audit — 2026-10-29

## Scope and coverage

Reviewed the 49 component notes whose kinds cover linear and switching power, battery management, analog, logic, and isolation. Also reviewed corresponding Our Picks entries, friendly descriptions and description source files, plus `README.md`, `content/README.md`, and `content/FORMAT.md`. Prior work recorded in `content/ISSUES.md` was used as context and checked against the current notes; prior issue entries that the current notes already explain were not copied as fresh problems.

The notes consistently carry manufacturer sources and useful caveats for the high-risk gotchas found in the repository's issue log: the LM324 offset grade, LM393 bias-current guarantee, TP4056 current-pin versus supply-current distinction, MCP6002 temperature suffix, 74HC temperature grades, and the ULN2003A ambient limit. The description-source text generally stays at functional/category level and does not repeat disputed numeric claims.

The component notes retain their `2026-07-24` catalog snapshot dates. For this follow-up, I separately checked the `2026-10-29` snapshot and fetched exact JLCPCB API records for tier and stock; the exact MPN/package/tier matches confirmed the catalog identities.

## Proposed changes

### LA-001 — LM2596 summary overstates compatibility (P2; confirmed wording error)

`C10002.md` calls the LM2596 a “drop-in replacement for a 7805.” The body correctly explains it is a switching regulator, but “drop-in” suggests board and pin compatibility. TI specifies a five-pin TO-263 LM2596 and a switching application requiring external magnetics and a catch diode; its LM7805 family uses a three-pin TO-263 with different pin functions. Replace that phrase with “switching alternative” and make the redesign requirement explicit.

Sources: [TI LM2596 datasheet](https://www.ti.com/lit/ds/symlink/lm2596.pdf), [TI LM7805 family datasheet](https://www.ti.com/lit/ds/symlink/lm7800.pdf).

### LA-002 — optocoupler notes overstate the selected digital isolator's rate (P2; confirmed internal contradiction)

`C109227.md` compares its slow phototransistor output with “the ADuM1201 (C9669) at 25 Mbps.” C9669 is `ADUM1201ARZ-RL7`; Analog Devices specifies its AR grade at 1 Mbps. The 25 Mbps figure belongs to the CR grade. Correct the C109227 comparison to 1 Mbps and optionally explain the grade distinction. `C115450.md` only says to compare with C9669; it contains no rate claim and needs no change.

Source: [Analog Devices ADuM1200/ADuM1201 datasheet](https://www.analog.com/media/en/technical-documentation/data-sheets/ADuM1200_1201.pdf).

## Detailed machine-readable findings

See `luna-analog.json` for the structured version, including reviewed files and part IDs.

## October 29 snapshot cross-check and curation shortlist

I matched all 48 in-snapshot reviewed notes against `raw-data/jlcpcb-basic-parts-2026-10-29.json` for manufacturer part number, package, and tier; they match. C7484 is an Extended part intentionally outside the qualifying snapshot. I compared the electrical attribute strings with the notes. Existing caveats already catch the known problems surfaced in `content/ISSUES.md`, including the CJ431 grade, AMS1117 limits, MCP6002 suffix, LM324 offset, LM393 bias current, and TP4056 supply current. I found no additional electrical mismatch to add after that comparison.

The new snapshot does change the availability context: C9683 has two units listed, down from 2,405 in the July note. Its identity, package, and Preferred tier match, but the two-unit stock makes it a poor basis for a recommendation. It is not currently an Our Picks entry. The other reviewed identities and tiers match the new snapshot.

A small set of absent parts would add distinct beginner-use cases:

- **C12044, TP4057-42-SOT26-R (Preferred in the Oct. 29 snapshot):** 500 mA programmable, single-cell 4.2 V charger with reverse-battery protection. It offers a lower-current option than the picked 1 A TP4056. It has no battery-temperature detection, no 0 V battery charging, and no power-path management.
- **C14289, HT7533-1 (Basic):** 3.3 V LDO drawing 2.5 µA with input up to 30 V. This fills the high-input, low-quiescent-current case beyond the picked XC6206's 6 V input ceiling. It is a 100 mA family and the manufacturer guarantees at least 70 mA at 3.3 V; it is not a high-current rail.
- **C6521, CD4052BM96:** dual 4:1 analog multiplexer, useful where two coordinated channels are better than the picked single 8:1 CD4051. It supports 3–20 V single supply or dual rails, but its 125 Ω on-resistance is specified at 15 V and analog signals must stay within the supply rails.
- **C5625, 74HC245D,653:** octal bidirectional tri-state bus transceiver. It is a practical parallel-bus buffer with direction and output-enable control, but standard HC input thresholds do not guarantee mixed 3.3 V/5 V translation and the listed output drive is modest.

I evaluated **C32574 TP4054** but would not shortlist it: its note shows 400 mA typical at the worked setting, 250–450 mA over temperature, with thermal backoff; it overlaps C12044 while the manufacturer product page says 400 mA and JLC lists 450 mA maximum. I would keep **C71035 LM324DT** as a conditional option for “four op-amps in one package” rather than adding it as a general default: its 0–70 °C commercial range and 7 mV maximum offset are already made clear in its note, and it overlaps the picked LM358 in use cases.

**JLCPCB’s public part-detail heading needs careful interpretation.** It labels these entries “Extended” generically; the exact-part API’s preferredComponentFlag resolves the tier. I checked C12044, C5625, C6521 and C9683: all return `expand` and `preferredComponentFlag=true`, so all are Preferred. C14289 is Basic. Structured evidence and links are in `luna-analog.json` (LA-003, LA-004).
