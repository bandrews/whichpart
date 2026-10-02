# October 2, 2026 catalog review

Source: `raw-data/jlcpcb-basic-parts-2026-10-02.json`, collected from the public
JLCPCB Basic/Preferred endpoint with complete pagination and tier validation.

- 1,586 parts: 351 Basic and 1,235 Preferred Extended; no additions, removals,
  tier, package, category, manufacturer, or manufacturer-part-number changes.
- 1,574 stock counts and 1,582 price records changed. The three largest price
  increases and decreases were fetched again and matched the snapshot:
  C11616, C57112, C25125, C25765, C25102, and C25822. These are distributor
  quotes, not promises of price or availability at checkout.
- 434 parts have changed source descriptions/attributes (including formatting
  and added fields); 143 have changes to existing named attribute values.
  The catalog change manifest now preserves these differences for review.
- Corrected the diode transform: mentions of ESD protection in an IC's prose
  do not make it a diode. Regression cases: C7950, C7955, C12084, C18229.
- Removed obsolete “2ch” labels from 40 TVS entries where current description
  and Number of Channels both indicate one channel. These parts remain in
  the catalog with their unchanged voltage, power, package, and identity.
- Updated C27147's friendly current label to 500 mA, matching both current
  JLCPCB description and Current Rating.
- C2500 has conflicting current ratings within JLCPCB: Current - Rectified
  is now 125 mA, while free-text description still says 215 mA. Removed the
  disputed current from its friendly label rather than endorsing either.
  Check the manufacturer datasheet and operating conditions before selection.

Corrected two source-schema explanations in the MOSFET and LED family notes:
Vgs coverage is partial rather than universally absent, and LED Test Current
is a characterization condition rather than the continuous-current limit.
The new evidence is explicitly dated October 2; historical note baselines and
manufacturer-backed limits are preserved.

Qualifying curated picks retain their current identities, tiers, and packages.
The catalog reference date advances to this snapshot. Existing curated-review
and manufacturer-note dates remain unchanged: this refresh is not a claim
that every datasheet was newly reviewed. Manufacturer-backed notes must not
be silently rewritten to match distributor metadata.

## Remaining upstream metadata conflicts

Preserved the raw source exactly. The following changed attributes disagree
with JLCPCB's still-old free-text description; those disputed values are not
endorsed by friendly labels or local notes. Manufacturer ratings, waveforms,
and test conditions need checking before using these figures in a design:

- C15879: leakage 5 µA versus 70 nA
- C2990493: pulse power 200 W versus 1 kW at 8/20 µs; breakdown 33.3 V versus
  36.8 V (waveform or minimum/typical conventions may explain the difference)
- C3019524: breakdown 36.7 V versus 40.6 V
- C5125145: breakdown 7.22 V versus 7.98 V
- C7420339: Ciss 60 pF versus 17.5 pF; Crss 15 pF versus 6.5 pF
- C7420369: leakage 200 µA at 40 V versus 50 µA at 40 V
- C7502707: forward voltage 450 mV at 500 mA versus 385 mV at 500 mA
- C7502715: surge current 10 A versus 30 A
- C18199179, C41411774, C41411775, C41411778: surge current 100 A versus 120 A
- C2500: rectified current 125 mA versus 215 mA, as described above

C7502694's old 600 A surge-current typo is now consistently 600 mA in both
upstream fields. None of these changes requires changing a curated pick's
stated function, headline specification, package, or recommendation.
