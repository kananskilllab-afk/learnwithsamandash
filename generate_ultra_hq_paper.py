import os
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1786974342439.png"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src).convert("RGBA")
w, h = img.size

# High-precision alpha channel extraction
arr = np.array(img, dtype=np.float32)
# Pure background pixels: R, G, B > 250
r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
# Calculate color deviation from pure white #FFFFFF
dist_from_white = 255 - np.minimum(r, np.minimum(g, b))

# Alpha: if distance is small (< 5), alpha is 0. If > 18, alpha is 255. Smooth ramp in between.
alpha = np.clip((dist_from_white - 4) / 14.0 * 255.0, 0, 255).astype(np.uint8)

# Reassemble image
arr[:, :, 3] = alpha
processed_img = Image.fromarray(arr.astype(np.uint8))

# Crop tightly
bbox = processed_img.getbbox()
if bbox:
    processed_img = processed_img.crop(bbox)

# Super-sample & sharpen for ultra-high quality rendering
enhancer = ImageEnhance.Contrast(processed_img)
super_clean = enhancer.enhance(1.08)

# 1. Floating Banner Island / Plaque (High-Res 1400px wide)
banner_w = 1400
banner_h = int(super_clean.size[1] * (banner_w / super_clean.size[0]))
floating_plaque = super_clean.resize((banner_w, banner_h), Image.Resampling.LANCZOS)
floating_plaque = floating_plaque.filter(ImageFilter.UnsharpMask(radius=1.2, percent=130, threshold=2))

out_banner_webp = os.path.join(out_dir, "torn-paper-island.webp")
out_banner_png = os.path.join(out_dir, "torn-paper-island.png")
floating_plaque.save(out_banner_webp, "WEBP", quality=96, method=6)
floating_plaque.save(out_banner_png, "PNG", optimize=True)

print(f"Saved Ultra-HQ Floating Plaque: {out_banner_webp} ({os.path.getsize(out_banner_webp)/1024:.1f} KB)")

# 2. Extract Top and Bottom continuous torn seam brushes
pw, ph = super_clean.size
top_seam = super_clean.crop((0, 0, pw, int(ph * 0.35)))
bot_seam = super_clean.crop((0, int(ph * 0.65), pw, ph))

top_seam.save(os.path.join(out_dir, "torn-seam-top.webp"), "WEBP", quality=95)
bot_seam.save(os.path.join(out_dir, "torn-seam-bottom.webp"), "WEBP", quality=95)

print("All Ultra-HQ Torn Paper assets generated successfully!")
