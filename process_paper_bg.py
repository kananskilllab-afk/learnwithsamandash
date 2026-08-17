import os
from PIL import Image, ImageEnhance

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1786973541032.jpg"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src).convert("RGB")
w, h = img.size
print(f"Original size: {w}x{h}")

# 1. High-quality background version
# Mild contrast and brightness balancing so it feels like authentic crumpled math graph paper
enhancer = ImageEnhance.Contrast(img)
enhanced = enhancer.enhance(1.05)

# Save as optimized full-res WebP & JPG
out_webp = os.path.join(out_dir, "crumpled-grid-bg.webp")
out_jpg = os.path.join(out_dir, "crumpled-grid-bg.jpg")

enhanced.save(out_webp, "WEBP", quality=90, method=6)
enhanced.save(out_jpg, "JPEG", quality=92, optimize=True)

print(f"Saved WebP: {out_webp} ({os.path.getsize(out_webp)/1024:.1f} KB)")
print(f"Saved JPG: {out_jpg} ({os.path.getsize(out_jpg)/1024:.1f} KB)")
