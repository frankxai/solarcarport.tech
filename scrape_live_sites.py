import urllib.request
import re
import json

sites = [
    "https://www.solarcarport.tech/",
    "https://pvlager.com/",
    "https://rialenergy.de/"
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

all_images = set()

for site in sites:
    try:
        req = urllib.request.Request(site, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            # Extract src attributes
            srcs = re.findall(r'src=["\']([^"\']+)["\']', html)
            imgs = re.findall(r'https?://[^\s"\'<>]+\.(?:png|jpg|jpeg|webp|gif|svg)', html)
            for s in srcs + imgs:
                if any(ext in s.lower() for ext in ['.png', '.jpg', '.jpeg', '.webp', '.svg']) and not s.startswith('data:'):
                    if s.startswith('//'):
                        s = 'https:' + s
                    elif s.startswith('/'):
                        s = site.rstrip('/') + s
                    all_images.add(s)
    except Exception as e:
        print(f"Error scraping {site}: {e}")

print(f"FOUND {len(all_images)} TOTAL MEDIA ASSETS:")
for img in sorted(list(all_images)):
    print(img)
