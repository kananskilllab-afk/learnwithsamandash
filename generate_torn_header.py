import os
import numpy as np
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1787033652699.png"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"

img = Image.open(src).convert("RGBA")
w, h = img.size
arr = np.array(img)

# The user's image has a clean white torn paper strip.
# In the original image:
# Top is solid white paper (R~240..255, G~240..255, B~240..255).
# Near the bottom of the paper is the natural torn edge fiber + dark shadow.
# Below the tear, the background is empty white (>252) or transparent (A=0).

# Let's create an alpha mask that only trims the bottom background:
alpha = np.ones((h, w), dtype=np.uint8) * 255
for x in range(w):
    for y in range(h - 1, -1, -1):
        r, g, b, a = arr[y, x]
        if a < 10 or (r >= 252 and g >= 252 and b >= 252):
            alpha[y, x] = 0
        else:
            break

arr[:, :, 3] = alpha
paper = Image.fromarray(arr)

# Resize to high-resolution 1920px wide banner
target_w = 1920
target_h = int(paper.height * (target_w / w))
resized = paper.resize((target_w, target_h), Image.Resampling.LANCZOS)

out_webp = os.path.join(out_dir, "torn-paper-header.webp")
out_png = os.path.join(out_dir, "torn-paper-header.png")

resized.save(out_webp, "WEBP", quality=95, method=6)
resized.save(out_png, "PNG", optimize=True)

print(f"Generated torn header: {out_webp} ({os.path.getsize(out_webp)/1024:.1f} KB, size: {resized.size})")
