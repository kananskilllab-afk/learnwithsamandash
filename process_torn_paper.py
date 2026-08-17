import os
import cv2
import numpy as np
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1786977044084.png"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"
os.makedirs(out_dir, exist_ok=True)

img_bgr = cv2.imread(src)
h, w = img_bgr.shape[:2]

# Outer canvas is pure white (#FFFFFF), threshold background
gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
# Paper has textures/shadows, pure white background is > 252
is_bg = (img_bgr[:, :, 0] > 250) & (img_bgr[:, :, 1] > 250) & (img_bgr[:, :, 2] > 250)

# Build RGBA image
rgba = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2BGRA)
rgba[is_bg, 3] = 0

pil_img = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))
bbox = pil_img.getbbox()
if bbox:
    pil_img = pil_img.crop(bbox)

# Save high quality transparent WebP and PNG
out_webp = os.path.join(out_dir, "torn-paper-strip.webp")
out_png = os.path.join(out_dir, "torn-paper-strip.png")

pil_img.save(out_webp, "WEBP", quality=95, method=6)
pil_img.save(out_png, "PNG", optimize=True)

print(f"Processed torn paper strip: {pil_img.size} -> {os.path.getsize(out_webp)/1024:.1f} KB")
