import os
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1787033652699.png"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src).convert("RGBA")
w, h = img.size
print(f"Original: {w}x{h}")

# In the uploaded image:
# The TOP half is white/paper with texture
# The MIDDLE is the actual ripped paper edge with realistic layered fiber shreds and shadow
# The BOTTOM is empty/transparent or white

# We want the entire navbar background to BE this ripped paper banner directly!
# Let's save the exact banner as full-resolution WebP
out_webp = os.path.join(out_dir, "torn-paper-banner-exact.webp")
out_png = os.path.join(out_dir, "torn-paper-banner-exact.png")

img.save(out_webp, "WEBP", quality=95, method=6)
img.save(out_png, "PNG", optimize=True)

print(f"Saved exact torn banner: {out_webp} ({os.path.getsize(out_webp)/1024:.1f} KB)")
