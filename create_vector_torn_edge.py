import numpy as np

# Generate high-detail natural SVG torn paper path across 1440 width and 32px height
np.random.seed(42)
width = 1440
points = 360 # point every 4px for fine ragged organic detail

x_vals = np.linspace(0, width, points)
# Generate organic jagged torn path using multiple frequency harmonics
base_y = 12.0
noise = (
    5.0 * np.sin(x_vals * 0.02) +
    3.5 * np.cos(x_vals * 0.045) +
    2.2 * np.sin(x_vals * 0.09) +
    1.5 * np.cos(x_vals * 0.18) +
    1.0 * np.sin(x_vals * 0.35) +
    np.random.uniform(-1.2, 1.2, points)
)
y_vals = np.clip(base_y + noise, 2, 28)

# Make first and last points seamless
y_vals[0] = base_y
y_vals[-1] = base_y

# Build SVG Path: starts top-left (0,0) -> top-right (1440,0) -> right (1440, y_end) -> ragged path backwards to (0, y_start) -> close (Z)
path_data = f"M 0 0 L {width} 0 L {width} {y_vals[-1]:.2f} "
for i in range(points - 1, -1, -1):
    path_data += f"L {x_vals[i]:.2f} {y_vals[i]:.2f} "
path_data += "Z"

# 1. Pure SVG component for the bottom torn edge
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} 32" preserveAspectRatio="none" class="torn-paper-edge-svg">
  <defs>
    <!-- Paper texture & fiber shadow filter -->
    <filter id="torn-shadow" x="-5%" y="-10%" width="110%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#122331" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#122331" flood-opacity="0.12"/>
    </filter>
  </defs>
  <!-- Drop shadow backing path -->
  <path d="{path_data}" fill="#FFFFFF" filter="url(#torn-shadow)"/>
  <!-- Crisp white solid paper body with micro fiber stroke -->
  <path d="{path_data}" fill="#FFFFFF" stroke="#E5E5E0" stroke-width="0.75"/>
</svg>'''

with open(r"c:\Users\mahim\OneDrive\Desktop\LearnWithSamAndAsh\client\public\images\torn-paper-edge.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

print("Created 100% vector torn-paper-edge.svg")
