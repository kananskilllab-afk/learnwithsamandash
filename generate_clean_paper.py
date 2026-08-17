import os
import cv2
import numpy as np
from PIL import Image, ImageEnhance

# 1. Clean the crumpled grid background so it is subtle, high-contrast, clean and not grey/dirty
bg_src = r"C:\Users\mahim\.gemini\antigravity-ide\brain\94ef2b3e-3e7e-41f4-ab01-6c8a6f87aaf7\.user_uploaded\media_1786973541032.jpg"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images"

bg = Image.open(bg_src).convert("RGB")
# Brighten paper highlights so text stands out crisply
bg_arr = np.array(bg, dtype=np.float32)
# Lift paper whites to clean #FAFAF7 while retaining grid lines & wrinkles
bg_arr = np.clip(bg_arr * 1.06 + 10, 0, 255).astype(np.uint8)
clean_bg = Image.fromarray(bg_arr)
clean_bg.save(os.path.join(out_dir, "crumpled-grid-bg.webp"), "WEBP", quality=92, method=6)
print("Saved clean bright crumpled-grid-bg.webp")

# 2. Extract SVG Vector Torn Paper Wave for pixel-perfect razor-sharp navbar border
# We generate a seamless 1200px wide SVG ripped paper jagged wave path
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 32" preserveAspectRatio="none" width="100%" height="100%">
  <path d="M0,0 L1200,0 L1200,16 
           Q1180,24 1160,18 T1120,26 T1080,14 T1040,24 T1000,16 T960,26 T920,18 T880,24 T840,14 T800,26 T760,18 T720,24 T680,14 T640,26 T600,18 T560,24 T520,14 T480,26 T440,18 T400,24 T360,14 T320,26 T280,18 T240,24 T200,14 T160,26 T120,18 T80,24 T40,14 T0,20 Z" 
        fill="#FFFFFF" />
  <path d="M0,20 Q40,14 80,24 T120,18 T160,26 T200,14 T240,24 T280,18 T320,26 T360,14 T400,24 T440,18 T480,26 T520,14 T560,24 T600,18 T640,26 T680,14 T720,24 T760,18 T800,26 T840,14 T880,24 T920,18 T960,26 T1000,16 T1040,24 T1080,14 T1120,26 T1160,18 Q1180,24 1200,16" 
        fill="none" stroke="#122331" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>'''

with open(os.path.join(out_dir, "torn-paper-edge.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)
print("Saved razor-sharp torn-paper-edge.svg")
