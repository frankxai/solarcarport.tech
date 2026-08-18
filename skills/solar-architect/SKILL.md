---
name: solar-architect
description: Master German solar carport engineering, structural sizing, bifacial albedo calculation, and universal permit planning agent. Use when designing solar carports, calculating bill of materials (BOM), verifying snow/wind loads, or drafting permit packages.
---

# Solar Architect Skill (German Engineering Edition)

The **Solar Architect** skill equips agents with the authoritative physics, structural formulas, bill of materials calculation rules, and regulatory planning logic developed by **RIAL Energy GmbH (Seesen)** and **SolarCarport.tech**.

---

## When to Activate
Activate this skill whenever a user or workflow requests:
1. **Dimensioning & BOM Generation:** Sizing solar carports (1 to 100+ spots), patio canopies, or solar fencing.
2. **Structural Load Analysis:** Checking snow loads (up to 2.5 kN/m² DIN EN 1991) and wind zones.
3. **Bifacial Yield Physics:** Calculating rear-side ground albedo gains (+15% to +25%) and clearance optimizations.
4. **Permitting & Legal Pre-Checks:** Verifying Landesbauordnung (LBO) verfahrensfreie limits, boundary setback rules (Grenzbebauung), and §14a EnWG dynamic grid integration.
5. **Microgrid Autarky Modeling:** Sizing hybrid inverters, LFP battery storage, and V2X bidirectional wallboxes.

---

## Core Engineering Constants & Formulas

```
+---------------------------------------------------------------------------------------------------+
| COMPONENT                         | VALUE / SPECIFICATION                                         |
+-----------------------------------+---------------------------------------------------------------+
| Standard Glass-Glass PV Module    | 475 Wp N-Type TOPCon (1,762 mm × 1,134 mm × 30 mm)            |
| Module Weight                     | 24.0 kg (Dual-tempered 2.0 mm + 2.0 mm glass)                 |
| Post Profile (Single/Double)      | RAL-ALU-POST-2800 (150 mm × 150 mm × 4.5 mm Aluminum 6063-T6) |
| Post Weight                       | 22.0 kg per 2.8 m post                                        |
| Purlin / Rafter Profile           | RAL-PUR-60 Heavy Purlin Rail with integrated drainage channel |
| Purlin Weight                     | 13.9 kg per 5.6 m section                                     |
| Snow Load Limit                   | Up to 2.50 kN/m² (~250 kg/m²)                                 |
| Bifaciality Factor (BFA)          | 0.80 (TOPCon) / 0.90 (HJT)                                    |
+---------------------------------------------------------------------------------------------------+
```

### Yield Sizing Formula:
$$\text{Annual kWh} = \text{kWp} \times \text{Specific Yield} \times \left(1 + \text{Albedo Gain}\right)$$
* *Example (Double Carport 7.6 kWp on light concrete in Central Germany):*
  $$7.60\text{ kWp} \times 980\text{ kWh/kWp} \times 1.18 = \mathbf{8,788\text{ kWh/year}}$$

---

## Available Execution Scripts

Run the internal sizing engine directly:
```bash
python scripts/carport_sizing_engine.py --spots 2 --surface concrete --wallbox v2x --battery 15
```

---

## Output Quality Gate & Safety Policy
* Always output structured, exact SKU bill of materials.
* Never omit the educational disclaimer: *"Planungshilfe. Die statische und elektrische Endabnahme erfolgt bauseits durch zertifizierte Fachbetriebe."*
