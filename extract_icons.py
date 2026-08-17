import os
import numpy as np
from PIL import Image

def extract_grid(image_path, out_dir, grid_config):
    os.makedirs(out_dir, exist_ok=True)
    img = Image.open(image_path).convert("RGBA")
    w, h = img.size
    
    for item in grid_config:
        name = item["name"]
        box = item["box"] # (x0_pct, y0_pct, x1_pct, y1_pct)
        x0 = int(box[0] * w)
        y0 = int(box[1] * h)
        x1 = int(box[2] * w)
        y1 = int(box[3] * h)
        
        cropped = img.crop((x0, y0, x1, y1))
        
        # Transparent background threshold
        arr = np.array(cropped)
        # Background is white > 242 across R,G,B
        is_bg = (arr[:, :, 0] > 240) & (arr[:, :, 1] > 240) & (arr[:, :, 2] > 240)
        arr[is_bg, 3] = 0
        
        icon = Image.fromarray(arr)
        bbox = icon.getbbox()
        if bbox:
            icon = icon.crop(bbox)
            
        # Resize to crisp 128x128 max box with aspect preserved
        icon.thumbnail((140, 140), Image.Resampling.LANCZOS)
        
        out_webp = os.path.join(out_dir, f"{name}.webp")
        out_png = os.path.join(out_dir, f"{name}.png")
        
        icon.save(out_webp, "WEBP", quality=92, method=6)
        icon.save(out_png, "PNG", optimize=True)
        print(f"Extracted: {name} -> {os.path.getsize(out_webp)/1024:.1f} KB")

# Sheet 1: 3 rows
# Row 1: Target, UserLogin, Menu, Close (4 items)
# Row 2: ArrowRight, Headphones, Book, PenTool (4 items)
# Row 3: Mic, Play, Eye (3 items)
sheet1_items = [
    # Row 1
    {"name": "icon-target", "box": (0.03, 0.05, 0.27, 0.35)},
    {"name": "icon-user-login", "box": (0.27, 0.05, 0.51, 0.35)},
    {"name": "icon-menu", "box": (0.51, 0.05, 0.73, 0.35)},
    {"name": "icon-close", "box": (0.73, 0.05, 0.97, 0.35)},
    
    # Row 2
    {"name": "icon-arrow-right", "box": (0.03, 0.36, 0.26, 0.65)},
    {"name": "icon-listening", "box": (0.26, 0.36, 0.48, 0.65)},
    {"name": "icon-reading", "box": (0.48, 0.36, 0.73, 0.65)},
    {"name": "icon-writing", "box": (0.73, 0.36, 0.97, 0.65)},
    
    # Row 3
    {"name": "icon-speaking", "box": (0.08, 0.66, 0.34, 0.96)},
    {"name": "icon-play", "box": (0.36, 0.66, 0.60, 0.96)},
    {"name": "icon-views", "box": (0.61, 0.66, 0.90, 0.96)},
]

# Sheet 2: 3 rows
# Row 1: GraduationVideo, ShieldCheck, Hourglass, FileCheck (4 items)
# Row 2: CheckPill, Calendar, Star, Globe (4 items)
# Row 3: WhatsApp, Email, Lock (3 items)
sheet2_items = [
    # Row 1
    {"name": "icon-lessons", "box": (0.03, 0.04, 0.29, 0.36)},
    {"name": "icon-shield-check", "box": (0.29, 0.04, 0.53, 0.36)},
    {"name": "icon-hourglass", "box": (0.53, 0.04, 0.74, 0.36)},
    {"name": "icon-mock-tests", "box": (0.74, 0.04, 0.97, 0.36)},
    
    # Row 2
    {"name": "icon-check-pill", "box": (0.03, 0.37, 0.28, 0.65)},
    {"name": "icon-calendar", "box": (0.28, 0.37, 0.52, 0.65)},
    {"name": "icon-star", "box": (0.52, 0.37, 0.74, 0.65)},
    {"name": "icon-study-abroad", "box": (0.74, 0.37, 0.97, 0.65)},
    
    # Row 3
    {"name": "icon-whatsapp", "box": (0.03, 0.65, 0.28, 0.96)},
    {"name": "icon-email", "box": (0.28, 0.65, 0.53, 0.96)},
    {"name": "icon-lock", "box": (0.54, 0.65, 0.74, 0.96)},
]

src1 = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\custom-icons\ielts-icon-set-full-spectrum-01.png"
src2 = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\custom-icons\ielts-icon-set-full-spectrum-02.png"
out_dir = r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images\icons"

extract_grid(src1, out_dir, sheet1_items)
extract_grid(src2, out_dir, sheet2_items)
print("All 22 icons extracted and saved successfully!")
