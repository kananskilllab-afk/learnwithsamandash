import numpy as np
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1787033652699.png"
img = Image.open(src).convert("RGBA")
arr = np.array(img)
h, w = arr.shape[:2]

# Find the exact top and bottom bounds of the paper
# The paper has alpha > 100
alpha = arr[:, :, 3]

top_y_list = []
bot_y_list = []

for x in range(w):
    col_a = alpha[:, x]
    paper_indices = np.where(col_a > 50)[0]
    if len(paper_indices) > 0:
        top_y_list.append(paper_indices[0])
        bot_y_list.append(paper_indices[-1])
    else:
        top_y_list.append(50)
        bot_y_list.append(200)

min_top = min(top_y_list) # where the top edge of paper starts
print(f"Top paper bound: {min_top}, Bot tear bounds: min={min(bot_y_list)}, max={max(bot_y_list)}")

# The paper strip should extend solid from the top of the navbar (y=0) all the way down to the torn edge!
# Let's create an exact SVG clipPath and a CSS polygon
# Total navbar paper block height = 125px
# Content sits in top 0-75px, torn edge is between 80px and 125px

# Let's map bot_y_list to CSS percentages:
# min_tear maps to 82px (65.6%), max_tear maps to 124px (99.2%)
min_bot = min(bot_y_list)
max_bot = max(bot_y_list)

sample_points = []
step = 4 # high resolution point every 4px
for x in range(0, w, step):
    x_pct = (x / (w - 1)) * 100.0
    bot_y = bot_y_list[x]
    y_px = 80.0 + ((bot_y - min_bot) / (max_bot - min_bot)) * 43.0
    y_pct = (y_px / 125.0) * 100.0
    sample_points.append((x_pct, y_pct))

# Make sure 100% is included
if sample_points[-1][0] < 100.0:
    bot_y = bot_y_list[-1]
    y_px = 80.0 + ((bot_y - min_bot) / (max_bot - min_bot)) * 43.0
    y_pct = (y_px / 125.0) * 100.0
    sample_points.append((100.0, y_pct))

# Build CSS Polygon: (0% 0%) -> (100% 0%) -> (sample_points in reverse) -> (0% 0%)
poly_coords = ["0% 0%", "100% 0%"]
for x_pct, y_pct in reversed(sample_points):
    poly_coords.append(f"{x_pct:.2f}% {y_pct:.2f}%")

css_polygon = "polygon(" + ", ".join(poly_coords) + ")"

with open(r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\clip_path.css", "w") as f:
    f.write(css_polygon)

print("Created pixel-perfect CSS clip-path polygon from reference image!")
