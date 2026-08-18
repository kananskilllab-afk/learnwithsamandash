import cv2
import numpy as np
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1787033652699.png"
img_bgr = cv2.imread(src)
h, w = img_bgr.shape[:2]

# In the image, top part is the paper (R~240-255, G~240-255, B~240-255)
# In the middle is the torn edge + dark fibers/shadows (R,G,B < 240)
# Below the torn edge is the pure white background of the image canvas (R>250, G>250, B>250)

# Let's inspect rows from top to bottom
# For each column x, find the lowest row y that is part of the paper/tear
# Let's use edge detection / thresholding
gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

edge_y = []
for x in range(w):
    # Scan from h//3 downwards to find where the dark tear contour ends
    # The tear happens between y = 50 and y = 250
    # Let's find the lowest pixel where gray < 242
    col = gray[:, x]
    tear_y = 120
    for y in range(h - 1, 30, -1):
        if col[y] < 245: # dark pixel belonging to torn fiber / shadow
            tear_y = y
            break
    edge_y.append(tear_y)

print(f"Detected edge min y: {min(edge_y)}, max y: {max(edge_y)}")

# Create a full 1440-width SVG mask and CSS clip-path using these exact points
sample_points = []
step = max(1, w // 240)
for x in range(0, w, step):
    x_pct = (x / (w - 1)) * 100.0
    # Map the tear so on a 125px navbar, it sits between 80px and 120px
    # min_y -> 82px (65.6%), max_y -> 122px (97.6%)
    min_val = min(edge_y)
    max_val = max(edge_y)
    y_px = 82.0 + ((edge_y[x] - min_val) / (max_val - min_val + 1e-5)) * 38.0
    y_pct = (y_px / 125.0) * 100.0
    sample_points.append((x_pct, y_pct))

# Build CSS polygon from (0,0) -> (100,0) -> (100, y_end) -> (points backwards) -> (0, y_start)
poly_coords = ["0% 0%", "100% 0%"]
for x_pct, y_pct in reversed(sample_points):
    poly_coords.append(f"{x_pct:.2f}% {y_pct:.2f}%")

css_poly = "polygon(" + ", ".join(poly_coords) + ")"
with open(r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\clip_path.css", "w") as f:
    f.write(css_poly)

print("Accurate CSS polygon generated!")
