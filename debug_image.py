import numpy as np
from PIL import Image

src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1787033652699.png"
img = Image.open(src).convert("RGBA")
arr = np.array(img)
h, w = arr.shape[:2]

print("Image shape:", arr.shape)
print("Top-left pixel RGBA:", arr[10, 10])
print("Middle pixel RGBA:", arr[180, 500])
print("Bottom-left pixel RGBA:", arr[350, 10])
print("Bottom-middle pixel RGBA:", arr[350, 500])

# Print sample alpha or colors along column 500 from top to bottom
for y in range(0, h, 20):
    print(f"y={y:3d}: RGBA={arr[y, 500]}")
