#!/usr/bin/env python3
"""
Preeminent Solar Proposal & Engineering Memo Generator
Authored by RIAL Energy / SolarForge Digital
"""

import argparse
import sys

def generate_proposal(customer: str, city: str, spots: int, kwp: float, annual_savings: float):
    memo = f"""
# Ingenieurtechnisches Beratungsmemo & Wirtschaftlichkeits-Dossier
**Projekt:** Solar-Carport Überdachung ({spots} Stellplätze)
**Kunde:** {customer} | **Standort:** {city}
**Erstellt von:** RIAL Energy Engineering / solarcarport.tech

---

## Sehr geehrte(r) {customer},

vielen Dank für Ihr Vertrauen. Als deutsches Ingenieurunternehmen für modulare Solar-Tragwerke verstehen wir, dass ein Solar-Carport keine reine Anschaffung, sondern eine dauerhafte, renditestarke Energie-Infrastruktur für Ihr Zuhause darstellt.

### 1. Standort- & Energie-Potenzial
* **Systemgröße:** {kwp:.1f} kWp (Bifaziale N-Type Glas-Glas-Technologie)
* **Berechneter Jahresertrag:** ca. {int(kwp * 1150):,} kWh / Jahr (inkl. +18% Albedo-Bodengewinn)
* **Kalkulierte jährliche Stromkosten-Ersparnis:** ca. {annual_savings:,.2f} € / Jahr

### 2. Statische Sicherheit & Deutsches Tragwerk
* **Schneelast-Sicherheit:** Geprüft bis zu 2,50 kN/m² (DIN EN 1991-1-3)
* **Material:** Stranggepresstes, korrosionsfreies Konstruktions-Aluminium (6063-T6)
* **Dichtigkeit:** Patentierte RIAL EPDM-Sicherheitsentwässerung

### 3. Gesetzliche & Steuerliche Vorteile
* **0% Mehrwertsteuer:** Gemäß §12 Abs. 3 UStG fällt keine Umsatzsteuer auf die Gesamtanlage an.
* **§14a EnWG Ersparnis:** Reduzierte Netzentgelte durch steuerbare Wallbox / Speicher (bis zu 180 €/Jahr Bonus).

Gerne begleiten wir Sie unverbindlich bei der Vorab-Prüfung und den Bauantragsunterlagen.
"""
    return memo

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Solar Proposal Memo Generator")
    parser.add_argument("--customer", type=str, default="Familie Schmidt", help="Customer name")
    parser.add_argument("--city", type=str, default="Hannover", help="Customer city")
    parser.add_argument("--spots", type=int, default=2, help="Number of spots")
    parser.add_argument("--kwp", type=float, default=7.6, help="Total kWp")
    parser.add_argument("--savings", type=float, default=2716.0, help="Annual savings EUR")
    
    args = parser.parse_args()
    print(generate_proposal(args.customer, args.city, args.spots, args.kwp, args.savings))
