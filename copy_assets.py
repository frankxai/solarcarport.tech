import os
import shutil

target_dir = r"C:\Users\frank\starlight\repos\RIAL Energy\public\images"
os.makedirs(target_dir, exist_ok=True)

brain_dir = r"C:\Users\frank\.gemini\antigravity\brain\917a0227-efd9-444e-a00e-4228acdf8b84"

files = [f for f in os.listdir(brain_dir) if f.endswith('.jpg') or f.endswith('.png')]

for f in files:
    src = os.path.join(brain_dir, f)
    if 'hero_solar_carport' in f:
        shutil.copy(src, os.path.join(target_dir, 'hero_solar_carport.jpg'))
        print("Copied hero_solar_carport.jpg")
    elif 'patio_solar_canopy' in f:
        shutil.copy(src, os.path.join(target_dir, 'patio_solar_canopy.jpg'))
        print("Copied patio_solar_canopy.jpg")
    elif 'commercial_fleet_solar' in f:
        shutil.copy(src, os.path.join(target_dir, 'commercial_fleet_solar.jpg'))
        print("Copied commercial_fleet_solar.jpg")
    elif 'bifacial_solar_fence' in f:
        shutil.copy(src, os.path.join(target_dir, 'bifacial_solar_fence.jpg'))
        print("Copied bifacial_solar_fence.jpg")

print("Asset copying finished!")
