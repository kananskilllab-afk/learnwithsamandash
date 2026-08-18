import os
import numpy as np
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1787033652699.png"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src).convert("RGBA")
w, h = img.size
print(f"Loaded: {w}x{h}")
arr = np.array(img)

# The user's image is a white torn paper banner on a transparent/white background.
# The paper body is at the top (from y=0 down to the tear).
# Below the tear is transparent background (in PNG alpha or pure white).
# In the original image:
# Any pixel that has alpha=0 or is pure white (R>250, G>250, B>250) below the tear should be transparent.

# Let's inspect rows from bottom to top
alpha = np.ones((h, w), dtype=np.uint8) * 255
for x in range(w):
    for y in range(h - 1, -1, -1):
        r, g, b, a = arr[y, x]
        if a < 10 or (r > 250 and g > 250 and b > 250):
            alpha[y, x] = 0
        else:
            break

arr[:, :, 3] = alpha
clean_img = Image.fromarray(arr)

# Resize to high resolution full banner 1920 wide with smooth interpolation
target_w = 1920
target_h = int(h * (target_w / w))
resized = clean_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

out_webp = os.path.join(out_dir, "torn-paper-banner.webp")
out_png = os.path.join(out_dir, "torn-paper-banner.png")

resized.save(out_webp, "WEBP", quality=95, method=6)
resized.save(out_png, "PNG", optimize=True)

print(f"Saved banner: {out_webp} ({os.path.getsize(out_webp)/1024:.1f} KB, size: {resized.size})")
