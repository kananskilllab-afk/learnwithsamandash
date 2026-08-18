import os
import numpy as np
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1787033652699.png"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src).convert("RGBA")
w, h = img.size
print(f"Loaded image: {w}x{h}")

arr = np.array(img)

# Crop out only the top paper portion with the torn edge
# The bottom background is pure white (#FFFFFF or transparent)
# Let's check background threshold: pixels below the tear are white (>250 across RGB or alpha=0)
# We make bottom white area transparent so only the top paper + torn fibers remain

# Find where the top paper starts (it starts at y=0)
# Pixels in the bottom half that are pure white (R>248, G>248, B>248) should become 100% transparent
# But the paper itself at the top is also whitish (~245-255), so we detect transparency from the bottom up!

# Let's flood-fill or scan from bottom
is_bottom_white = (arr[:, :, 0] > 250) & (arr[:, :, 1] > 250) & (arr[:, :, 2] > 250)

# Create an alpha mask from the bottom
# For each column x, find the lowest y where the paper shadow/fiber exists
alpha = np.ones((h, w), dtype=np.uint8) * 255
for x in range(w):
    col = arr[:, x, :3]
    # Scan from bottom upwards (h-1 down to 0)
    for y in range(h - 1, -1, -1):
        r, g, b = col[y]
        # If it's pure white (>252), it's the background below the tear
        if r > 252 and g > 252 and b > 252:
            alpha[y, x] = 0
        else:
            # We hit the torn paper shadow/edge! Stop masking this column
            break

arr[:, :, 3] = alpha
result = Image.fromarray(arr)

# Crop bounding box of non-transparent area
bbox = result.getbbox()
if bbox:
    result = result.crop((0, 0, w, bbox[3]))

# Save high-res WebP and PNG
out_webp = os.path.join(out_dir, "torn-paper-nav-edge.webp")
out_png = os.path.join(out_dir, "torn-paper-nav-edge.png")

result.save(out_webp, "WEBP", quality=95, method=6)
result.save(out_png, "PNG", optimize=True)

print(f"Saved torn paper edge: {out_webp} ({os.path.getsize(out_webp)/1024:.1f} KB, size: {result.size})")
