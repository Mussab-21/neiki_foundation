import os
import glob
import re
from PIL import Image

# 1. Optimize Phase 1 images
phase1_dir = r"d:\ATC\Neeki_web\assets\Phase 1.  ISLD donated Projects"
image_extensions = ('.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG')

count_converted = 0
for root, dirs, files in os.walk(phase1_dir):
    for file in files:
        if file.endswith(image_extensions):
            orig_path = os.path.join(root, file)
            base_name, _ = os.path.splitext(orig_path)
            webp_path = base_name + '.webp'
            
            try:
                img = Image.open(orig_path)
                # Preserve transparency if needed
                if img.mode == 'P':
                    if 'transparency' in img.info:
                        img = img.convert('RGBA')
                    else:
                        img = img.convert('RGB')
                        
                img.save(webp_path, 'WEBP', quality=80)
                os.remove(orig_path)
                count_converted += 1
            except Exception as e:
                print(f"Failed to convert {orig_path}: {e}")

print(f"Converted {count_converted} images in Phase 1 folder to WebP.")

# 2. Update all HTML files
html_files = []
for root, dirs, files in os.walk(r"d:\ATC\Neeki_web"):
    if 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

def replacer(match):
    # match.group(0) is the full src="..."
    # We want to replace the extension with .webp
    full_str = match.group(0)
    # The extension is at the end of the string before the quote
    new_str = re.sub(r'\.(jpg|jpeg|png|webp)"$', '.webp"', full_str, flags=re.IGNORECASE)
    return new_str

count_html_updated = 0
for h_file in html_files:
    try:
        with open(h_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Look for src="...Phase 1.  ISLD donated Projects/..."
        # Replace the extension with .webp
        new_content = re.sub(r'src="[^"]*Phase 1\.\s*ISLD donated Projects/[^"]*\.(?:jpg|jpeg|png|webp)"', replacer, content, flags=re.IGNORECASE)
        
        if new_content != content:
            with open(h_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count_html_updated += 1
    except Exception as e:
        print(f"Failed to process {h_file}: {e}")

print(f"Updated {count_html_updated} HTML files to point to WebP.")
