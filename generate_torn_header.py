import os
import numpy as np
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1787033652699.png"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"

img = Image.open(src).convert("RGBA")
w, h = img.size
arr = np.array(img)

# In the user image:
# The top white paper is in the upper area (y=0 down to the tear line ~y=120..220).
# Below the tear line is white/transparent background.
# We want:
# 1) Top paper to remain pure solid paper
# 2) Everything BELOW the bottom-most contour of the tear to be 100% transparent.
# Let's inspect column by column:
# The paper body has brightness ~235-255 with slight shadow/texture near the tear.
# The background below the tear is pure white (R>250, G>250, B>250) or already transparent (A=0).

alpha = np.ones((h, w), dtype=np.uint8) * 255
for x in range(w):
    for y in range(h - 1, -1, -1):
        r, g, b, a = arr[y, x]
        # Check if it's the bottom empty area
        if a < 10 or (r >= 252 and g >= 252 and b >= 252):
            alpha[y, x] = 0
        else:
            # We hit the edge of the paper!
            break

arr[:, :, 3] = alpha
paper_strip = Image.fromarray(arr)

# Trim unused transparent space at the bottom
bbox = paper_strip.getbbox()
if bbox:
    paper_strip = paper_strip.crop((0, 0, w, bbox[3]))

# Resize to standard 1920px width
final_banner = paper_strip.resize((1920, int(paper_strip.height * (1920 / w))), Image.Resampling.LANCZOS)

out_webp = os.path.join(out_dir, "torn-paper-header.webp")
out_png = os.path.join(out_dir, "torn-paper-header.png")

final_banner.save(out_webp, "WEBP", quality=95, method=6)
final_banner.save(out_png, "PNG", optimize=True)

print(f"Generated torn header banner: {out_webp} ({os.path.getsize(out_webp)/1024:.1f} KB, size: {final_banner.size})")
