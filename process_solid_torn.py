import os
import numpy as np
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1787033652699.png"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"

img = Image.open(src).convert("RGBA")
w, h = img.size
print(f"Original image size: {w}x{h}")

arr = np.array(img)

# 1. Scan from bottom to find the torn edge for each column
# In the original image:
# Bottom background pixels are pure white (R>250, G>250, B>250) or already transparent.
# As soon as we scan from bottom and hit the dark shadow or paper fibers, that is the torn edge!

edge_y = np.zeros(w, dtype=int)
for x in range(w):
    col = arr[:, x, :3]
    # default to bottom if not found
    found_y = h - 1
    for y in range(h - 1, -1, -1):
        r, g, b = col[y]
        # Check if it's the empty background below the tear
        if r > 252 and g > 252 and b > 252:
            continue
        else:
            # We reached the paper shadow / fiber!
            found_y = y
            break
    edge_y[x] = found_y

# 2. Make the paper area above the tear 100% OPAQUE SOLID OFF-WHITE / WHITE
# Keep the subtle paper texture variations in the paper area, but ensure alpha = 255 (completely opaque)
# For the background below edge_y[x], alpha = 0 (completely transparent)

new_arr = arr.copy()
for x in range(w):
    ey = edge_y[x]
    # Everything above ey + 1 is 100% solid opaque (alpha = 255)
    new_arr[:ey + 1, x, 3] = 255
    # Everything below ey + 1 is 100% transparent (alpha = 0)
    new_arr[ey + 1:, x, 3] = 0

result = Image.fromarray(new_arr)

# Save high-quality 100% solid paper banner
out_webp = os.path.join(out_dir, "torn-paper-solid-header.webp")
out_png = os.path.join(out_dir, "torn-paper-solid-header.png")

result.save(out_webp, "WEBP", quality=98, method=6)
result.save(out_png, "PNG", optimize=True)

print(f"Saved 100% solid torn paper header: {out_webp} ({os.path.getsize(out_webp)/1024:.1f} KB)")
