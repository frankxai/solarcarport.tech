#!/usr/bin/env python3
"""
Solar Carport Sizing & BOM Engine
Authored by RIAL Energy Engineering / SolarForge Digital
Precision calculation of structural aluminum profiles, glass modules, bifacial yield, and ERP bill of materials.
"""

import argparse
import json
import sys

def calculate_carport(spots: int = 2, surface: str = 'concrete', wallbox: str = 'none', battery_kwh: float = 0.0, post_height: float = 2.8):
    # Constants
    MODULE_WATTS = 475  # 475 Wp TOPCon Bifacial
    MODULE_LENGTH = 1.762
    MODULE_WIDTH = 1.134
    MODULE_WEIGHT = 24.0  # kg
    
    # Sizing by spots
    if spots == 1:
        modules_count = 8
        kwp = 3.8
        posts_count = 4
        rafters_count = 2
        purlins_count = 3
        carport_width = 3.2
        carport_length = 5.6
        base_sku = "SCP-ALU-SGL-01"
        base_price = 3200.0
    elif spots == 2:
        modules_count = 16
        kwp = 7.6
        posts_count = 4
        rafters_count = 2
        purlins_count = 5
        carport_width = 6.0
        carport_length = 5.6
        base_sku = "SCP-ALU-DBL-01"
        base_price = 4900.0
    else:  # Commercial N spots
        pairs = (spots + 1) // 2
        modules_count = pairs * 16
        kwp = modules_count * 0.475
        posts_count = pairs * 2 + 2
        rafters_count = pairs * 2
        purlins_count = pairs * 5
        carport_width = pairs * 5.8
        carport_length = 5.6
        base_sku = f"SCP-ALU-COM-{spots:02d}"
        base_price = spots * 2300.0

    # Albedo reflectivity
    albedo_table = {
        'asphalt': 0.12,
        'grass': 0.20,
        'concrete': 0.35,
        'white_gravel': 0.55,
        'snow': 0.80
    }
    albedo = albedo_table.get(surface.lower(), 0.30)
    bifacial_gain = 0.80 * albedo * 0.70  # BFA * albedo * ViewFactor
    
    base_specific_yield = 980.0  # kWh / kWp in Central Europe
    total_specific_yield = base_specific_yield * (1.0 + bifacial_gain)
    annual_kwh = kwp * total_specific_yield

    # Pricing & BOM
    module_unit_price = 145.0  # EUR (475W Glass-Glass)
    inverter_price = 1600.0 if kwp <= 5.0 else (2168.0 if kwp <= 12.0 else 3400.0)
    
    wallbox_price = 0.0
    if wallbox == 'standard':
        wallbox_price = 890.0
    elif wallbox == 'v2x':
        wallbox_price = 1490.0

    battery_price = battery_kwh * 380.0  # EUR per kWh for HV LFP
    
    modules_total_price = modules_count * module_unit_price
    subtotal = base_price + modules_total_price + inverter_price + wallbox_price + battery_price
    
    # Financial savings (assuming 0.38 EUR/kWh grid, 75% self-consumption)
    annual_savings = (annual_kwh * 0.75 * 0.38) + (annual_kwh * 0.25 * 0.08)
    payback_years = subtotal / annual_savings if annual_savings > 0 else 0

    bom = [
        {"sku": base_sku, "description": f"RIAL Modular Aluminum Carport Structure ({spots} Spots)", "qty": 1, "unit": "kit"},
        {"sku": "PRF-ALU-POST-2800", "description": "Extruded Aluminum Heavy Support Post 2.8m", "qty": posts_count, "unit": "pcs"},
        {"sku": "RAL-PUR-60", "description": "Heavy Purlin Rail with Internal Drainage Gutter", "qty": purlins_count, "unit": "pcs"},
        {"sku": "MOD-BF-GG-475", "description": "475W Bifacial N-Type TOPCon Glass-Glass PV Module", "qty": modules_count, "unit": "pcs"},
        {"sku": "CLP-BLK-30", "description": "Black Anodized 30mm Module Clamp Set", "qty": modules_count * 4, "unit": "pcs"},
        {"sku": "INV-HYB-10K" if kwp > 5.0 else "INV-HYB-05K", "description": "3-Phase Hybrid Solar Inverter", "qty": 1, "unit": "pcs"}
    ]
    
    if wallbox != 'none':
        bom.append({"sku": "EV-WB-V2X-22" if wallbox == 'v2x' else "EV-WB-STD-11", "description": f"EV Smart Wallbox ({wallbox.upper()})", "qty": 1, "unit": "pcs"})
        
    if battery_kwh > 0:
        bom.append({"sku": f"BAT-LFP-{int(battery_kwh)}K", "description": f"{int(battery_kwh)} kWh LFP High-Voltage Battery Storage", "qty": 1, "unit": "pcs"})

    result = {
        "summary": {
            "spots": spots,
            "surface": surface,
            "kwp": round(kwp, 2),
            "modules_count": modules_count,
            "bifacial_gain_pct": round(bifacial_gain * 100, 1),
            "annual_kwh_yield": round(annual_kwh, 0),
            "estimated_annual_savings_eur": round(annual_savings, 2),
            "payback_years": round(payback_years, 1),
            "total_price_eur": round(subtotal, 2)
        },
        "bom": bom
    }
    return result

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Solar Carport Sizing & BOM Calculator")
    parser.add_argument("--spots", type=int, default=2, help="Number of parking spots (1-50)")
    parser.add_argument("--surface", type=str, default="concrete", help="Ground surface (asphalt, grass, concrete, white_gravel)")
    parser.add_argument("--wallbox", type=str, default="v2x", choices=["none", "standard", "v2x"], help="EV Wallbox option")
    parser.add_argument("--battery", type=float, default=15.0, help="Battery storage capacity in kWh")
    
    args = parser.parse_args()
    res = calculate_carport(args.spots, args.surface, args.wallbox, args.battery)
    print(json.dumps(res, indent=2))
