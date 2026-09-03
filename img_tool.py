import os
from PIL import Image

workspace_dir = r"d:\ATC\Neeki_web"

# Convert large images
for root, dirs, files in os.walk(os.path.join(workspace_dir, 'assets')):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg')):
            path = os.path.join(root, f)
            if os.path.getsize(path) > 200 * 1024:
                webp_path = os.path.splitext(path)[0] + '.webp'
                try:
                    img = Image.open(path)
                    img = img.convert('RGB') if img.mode != 'RGBA' else img
                    img.save(webp_path, 'WEBP', quality=80)
                    os.remove(path)
                    print(f"Converted {f} to WebP.")
                except Exception as e:
                    print(f"Error converting {f}: {e}")

# Read image sizes for HTML replacement
import glob
print("IMAGE_DIMENSIONS_START")
for img_path in glob.glob(os.path.join(workspace_dir, "assets", "**", "*.*"), recursive=True):
    if img_path.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        try:
            with Image.open(img_path) as img:
                # Print relative path and dimensions
                rel_path = os.path.relpath(img_path, workspace_dir).replace('\\', '/')
                print(f"{rel_path}|{img.width}|{img.height}")
        except:
            pass
print("IMAGE_DIMENSIONS_END")
