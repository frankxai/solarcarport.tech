import re
import urllib.request

content_file = r"C:\Users\frank\.gemini\antigravity\brain\917a0227-efd9-444e-a00e-4228acdf8b84\.system_generated\steps\20\content.md"
with open(content_file, "r", encoding="utf-8") as f:
    text = f.read()

urls = re.findall(r'https?://[^\s"\'<>]+', text)
media = set()
for u in urls:
    if any(ext in u.lower() for ext in ['.png', '.jpg', '.jpeg', '.webp', '.svg', 'dms3rep', 'youtube.com', 'youtu.be', 'opt/']):
        # Clean URL trailing punctuation
        u_clean = u.rstrip(';,)"\'')
        media.add(u_clean)

print(f"Total media/video URLs found: {len(media)}")
for m in sorted(list(media)):
    print(m)
