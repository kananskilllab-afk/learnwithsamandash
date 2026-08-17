import os
import numpy as np
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1786974342439.png"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src).convert("RGBA")
arr = np.array(img)
h, w = arr.shape[:2]

# Transparent background threshold
# Pure white background outside the torn strip is > 248 on R,G,B
is_bg = (arr[:, :, 0] > 248) & (arr[:, :, 1] > 248) & (arr[:, :, 2] > 248)
arr[is_bg, 3] = 0

torn_img = Image.fromarray(arr)
bbox = torn_img.getbbox()
if bbox:
    torn_img = torn_img.crop(bbox)

# 1. Full torn paper banner strip
out_webp = os.path.join(out_dir, "torn-paper-strip.webp")
out_png = os.path.join(out_dir, "torn-paper-strip.png")
torn_img.save(out_webp, "WEBP", quality=95, method=6)
torn_img.save(out_png, "PNG", optimize=True)

print(f"Saved Torn Strip WebP: {out_webp} ({os.path.getsize(out_webp)/1024:.1f} KB)")

# 2. Extract bottom torn edge strip for full-width repeating navbar footer border
tw, th = torn_img.size
bottom_edge = torn_img.crop((0, int(th * 0.45), tw, th))
out_edge_webp = os.path.join(out_dir, "torn-edge-bottom.webp")
out_edge_png = os.path.join(out_dir, "torn-edge-bottom.png")
bottom_edge.save(out_edge_webp, "WEBP", quality=95, method=6)
bottom_edge.save(out_edge_png, "PNG", optimize=True)

print(f"Saved Torn Edge WebP: {out_edge_webp} ({os.path.getsize(out_edge_webp)/1024:.1f} KB)")
