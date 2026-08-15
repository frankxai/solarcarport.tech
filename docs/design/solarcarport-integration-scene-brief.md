# SolarCarport.tech integration scene brief

## Outcome contract

- **Audience:** German homeowners, property owners, commercial site operators, and fleet decision-makers exploring a solar carport or PV canopy.
- **Surface:** Mobile-first public landing page and four-step project pre-check.
- **Business goal:** Turn qualified interest into a personally reviewed RIAL Energy project request without pretending that an automated calculator can approve structure, price, yield, tax treatment, availability, or permitting.
- **First read:** “Aus Parkfläche wird Energiefläche.” followed by one clear action: “Standort prüfen.”
- **Evidence:** Real installation media harvested from the existing SolarCarport.tech property, a visible planning process, explicit assumptions, and a human-review handoff.
- **Acceptance gate:** Production build, keyboard and modal checks, 375/768/1440 visual QA, reduced-motion check, anti-slop scan, evidence manifest score of at least 26/30, and a verified Vercel preview.

## Creative thesis

SolarCarport.tech should feel like an architectural planning desk at golden hour: calm, precise, material, and grounded in real built work. Amber light is the single signal color. Deep blue-black and graphite carry the engineering character. The page earns trust through restraint and visible limits, not superlatives.

## Page roles

1. **Hook:** State the transformation and the human-reviewed next step.
2. **Route:** Let private and commercial visitors self-select immediately.
3. **Proof:** Show real installed structures before rendered system directions.
4. **Explain:** Clarify the three planning questions that materially affect feasibility.
5. **Convert:** Collect the minimum project context once, preserve it across steps, and prepare a transparent email handoff.
6. **Close:** Identify RIAL Energy, the location, legal routes, and the non-binding nature of all indications.

## First-viewport scene

- Real installation image with a controlled left-to-right readability veil.
- RIAL Energy attribution and Seesen location remain visible but subordinate.
- One primary CTA, one secondary route.
- Three trust statements describe process only: site-specific pre-check, documented assumptions, personal response.
- No certification, yield, stock, price, tax, or savings promise appears without verified source evidence.

## Project journey

1. Visitor selects private or commercial intent.
2. System direction is preselected and the pre-check receives focus.
3. Visitor enters project postcode once.
4. Visitor chooses structural direction, timing, and optional energy scope.
5. Result shows a clearly labelled planning range with its assumptions.
6. The request modal is prefilled with postcode and timing; the visitor adds contact details.
7. No data is sent automatically. The visitor reviews and explicitly opens their own email client.

## Visual system

- **Typography:** Manrope for display and body; IBM Plex Mono for evidence labels and technical metadata.
- **Color:** Deep blue-black, graphite, warm off-white, amber signal, and restrained sky-blue information states.
- **Spacing:** 8 px rhythm, 44 px minimum targets, intentionally quiet first viewport.
- **Material:** Solid readable surfaces; glass only for navigation and small evidence overlays.
- **Asset tier:** Tier A real installations for hero and proof; existing rendered directions remain labelled “Visualisierung” and never act as project evidence.
- **Motion:** CSS-only state feedback and subtle image scale on hover. No scroll choreography. Reduced-motion removes smooth scrolling and transitions.

## Accessibility and interaction

- Logical landmarks and headings.
- Visible focus states and 44 px targets.
- Tabs support arrow-key navigation and expose panel relationships.
- Modal traps focus, closes on Escape, restores focus, and locks background scroll.
- Form errors are explicit, associated with fields, and do not rely on color alone.
- Horizontal overflow is limited to intentional tab rails.

## Cut list

- Unsupported certifications, guaranteed yield, live stock, tax eligibility, or ROI claims.
- Duplicate postcode and timing entry.
- Generic icon-card filler and nested cards.
- Decorative motion, fake dashboards, and ERP/AI theatre.
- A render presented as a completed customer installation.

## Verification scenes

- 375 × 812: hero, private/commercial routing, pre-check step one, request modal.
- 768 × 1024: hero and proof transition, tab keyboard state, result summary.
- 1440 × 1000: first viewport composition, real-project proof rail, full conversion path.
- Reduced motion: no smooth-scroll dependency or delayed content.
