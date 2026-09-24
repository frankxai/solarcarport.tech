# Solar project studio — product blueprint

Status: local, no-index prototype on `codex/solar-project-studio-20260924`. Not deployed, no checkout, no CAD or engineering approval.

## Buyer and reference bar

Primary buyer: a German homeowner planning a two-car solar carport, PV terrace, or both, who needs to brief a builder without losing the relationship between the site, visual idea, documents, quote, installed system and eventual performance. Secondary user: the builder and licensed specialists receiving that brief.

The studio should combine three currently separate strengths: [IKEA Kreativ](https://www.ikea.com/de/de/customer-service/knowledge/articles/f213832a-a1c1-4d8d-a423-88dc5a41c42c.html) starts from the buyer's own room photo or dimensions; [OpenSolar](https://www.opensolar.com/proposals/) connects design to interactive proposals; [Buildertrend](https://buildertrend.com/wp-content/uploads/2025/04/AQ5176-Buildertrend-Brochure.pdf) tracks client-facing schedules, files and photos. The differentiator is a homeowner-owned, provenance-linked record for the **entire outdoor build**, not a sales visualization alone. This is a product hypothesis, not a measured buyer preference.

## What this first slice actually does

- Captures a Seesen example project for a two-car carport, terrace or combined build, with editable dimensions and site constraints.
- Keeps text/status locally in browser storage and site/result photos in IndexedDB when available. Exports project JSON and lets the user save each photo separately. No account or server upload.
- Shows a provenance-recorded AI example image **separate** from the user's own site photo. Generates an image-edit brief for use in this chat or a chosen image tool; does not call an image API from the website.
- Exports a non-scaled SVG relationship sketch. It is neither CAD nor a permit/installation drawing.
- Tracks nine document categories, five procurement groups, seven build milestones with notes, and the handover/result photo and measured values.
- Gives an RFQ brief, not an unverified price, stock claim, shopping cart or checkout.

## Invention layer: one decision thread

Every later artifact should attach to a project version and a source, then retain a trace through approval, purchase, installation and operation:

`site evidence → measured geometry → visual option → reviewed design → signed technical documents → approved BOM → supplier quote → delivered serials → build evidence → commissioning → actual production`

Each node needs `projectId`, version, author/source, timestamp, status (`concept`, `submitted`, `approved`, `superseded`), evidence link and the professional who may approve it. An image can support a choice but must never silently promote itself to structural geometry. A quote can populate an approved BOM but must never rewrite dimensions or engineering assumptions. This typed decision thread is the product's central new capability.

## The actual-site image workflow

1. Homeowner uploads wide site photos from the driveway and terrace, plus dimensions, boundary conditions, house connection and orientation. Strip EXIF/location metadata before any external transfer.
2. Create a constraint sheet from measured or explicitly unknown inputs. Preserve the real house, camera, driveway and boundaries in image edits. Generate whole-project, driveway and terrace views, not isolated beauty crops.
3. Label every frame `AI concept`, store exact prompt, source photo hash, provider/model, output hash, project version and review status. Compare generated post positions, roof edges, drainage and access with the measured constraint sheet. Reject inconsistent views.
4. Let a person choose a concept. Only a qualified designer/engineer turns approved geometry into CAD/BIM, structural and electrical documents. The render never becomes the construction source of truth.

The current website deliberately stops at the brief. A live image-generation endpoint needs authentication, explicit photo-transfer consent, request size limits, cost/rate limits, private storage/retention policy, provenance sidecars and a visual QA gate. Never put a provider key into browser code or imply that a generic render is a verified photo edit.

## Builder documentation pack

The eventual pack should distinguish owner-provided, machine-derived and professionally signed files:

| Artifact                                         | Source of truth                                    | Release gate                      |
| ------------------------------------------------ | -------------------------------------------------- | --------------------------------- |
| Site survey and boundaries                       | measured field survey + property records           | owner/builder verifies            |
| Permit determination                             | Landkreis Goslar / applicable NBauO and local plan | authority/professional confirms   |
| Dimensioned site and roof plan, CAD/DXF/IFC      | design professional                                | revision-controlled approval      |
| Foundations, snow/wind loads, structure          | structural engineer                                | signed site-specific calculation  |
| Module layout and mounting/overhead suitability  | manufacturer documents + designer                  | exact product compatibility       |
| Electrical single-line, protection, grid request | registered electrician + network operator          | electrical approval               |
| BOM and installation guide                       | approved design + supplier SKU                     | quote and delivery reconciliation |
| Commissioning, MaStR, warranty and O&M           | electrician, operator, manufacturer                | handover receipt                  |

The current SVG is only a discussion sketch. Do not label it CAD or issue it as a permit drawing.

## Buy, build and result

Procurement should use an approved BOM with real supplier SKUs, dated prices, VAT treatment verified for the specific case, quote comparison, substitution approval, delivery status and serial-number capture. A checkout is out of scope until the estate product release gate has a fresh PASS and the local engineering/permit gates are respected.

Build tracking should store dated photo evidence per milestone, signed inspections, deviations and a punch list. The finished record should compare installed components and measured performance with the design baseline. [PVGIS](https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis/general-information_en) is a suitable reference for a transparent modeled yield **after** orientation, tilt, losses and equipment are known; it is not a substitute for metered production.

## Distribution surfaces

- **Website:** durable project record, visual review, documents, quote states, construction and result. This is the main builder/customer workspace.
- **Local `solar-carport-planner` skill:** expert planning rules and source-backed safety gates in Codex and the ChatGPT desktop app. Its user-scope path is `C:/Users/frank/.agents/skills/solar-carport-planner`; `agents/openai.yaml` provides desktop UI metadata. Maintain it as the planning source of truth and reuse its output schema.
- **ChatGPT cloud distribution:** publish an approved workspace skill or package a plugin when broad Chat/Work/web/mobile access is needed. Local filesystem installation, workspace skill installation and plugin installation are distinct. A separate custom GPT is optional only if a standalone conversational identity is needed; it is not the primary product or a substitute for the website/project record.

## Next gates

1. Test with one actual Seesen site photo, measured dimensions, and builder feedback. Capture a three-view concept and reject geometry drift.
2. Add import of project JSON, photo bundling and version history so local data can move devices safely. The current JSON export excludes photos.
3. Introduce professional approval roles and revision-controlled CAD/BOM documents before any transactional flow.
4. Integrate a consented image backend and later supplier/ERP/monitoring connectors; each requires its own privacy, security, cost and source-of-truth review.
5. Run full responsive/accessibility QA, build, independent skeptical-buyer and engineering review, plus product release gate before public launch or checkout.

## Official German source anchors checked 2026-09-24

- [Landkreis Goslar, Fachdienst Bauen](https://www.landkreis-goslar.de/Wir-f%C3%BCr-Sie/Verwaltung/Interaktive-Verwaltung/Bauen-und-Umwelt/Bauen/)
- [Niedersachsen Bauordnungsrecht FAQ](https://www.mw.niedersachsen.de/startseite/bauen_wohnen/bauordnungsrecht_bautechnik_und_gebaudeenergierecht/haufig_gestellte_fragen/haufig-gestellte-fragen-217309.html)
- [VDE FNN, VDE-AR-N 4105:2026-03](https://www.vde.com/de/fnn/themen/tar/tar-niederspannung/erzeugungsanlagen-am-niederspannungsnetz-vde-ar-n-4105)
- [DIBt, Überkopfverglasungen einschließlich PV](https://www.dibt.de/de/bauprodukte/informationsportal-bauprodukte-und-bauarten/produktgruppen/bauprodukte-detail/bauprodukt/ueberkopfverglasungen)
- [Bundesnetzagentur, Solaranlagen/MaStR](https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/Solaranlagen/start.html)
- [European Commission JRC, PVGIS](https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis/general-information_en)
