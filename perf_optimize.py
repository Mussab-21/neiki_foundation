import os
import glob
import re
from PIL import Image

workspace_dir = r"d:\ATC\Neeki_web"

# TASK 3: Find large images and convert to WebP
print("TASK 3: Optimizing large PNG/JPG files...")
large_image_files = []
for root, dirs, files in os.walk(os.path.join(workspace_dir, 'assets')):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg')):
            path = os.path.join(root, f)
            if os.path.getsize(path) > 200 * 1024:  # 200 KB
                large_image_files.append(path)

converted_count = 0
converted_mappings = {}  # original_filename -> webp_filename

for orig_path in large_image_files:
    base_name, _ = os.path.splitext(orig_path)
    webp_path = base_name + '.webp'
    try:
        img = Image.open(orig_path)
        if img.mode == 'P':
            if 'transparency' in img.info:
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
        img.save(webp_path, 'WEBP', quality=80)
        os.remove(orig_path)
        
        orig_name = os.path.basename(orig_path)
        webp_name = os.path.basename(webp_path)
        converted_mappings[orig_name] = webp_name
        converted_count += 1
        print(f"Converted {orig_name} ({os.path.getsize(webp_path) // 1024} KB)")
    except Exception as e:
        print(f"Failed to convert {orig_path}: {e}")

print(f"Total large images converted: {converted_count}")

# Prepare list of HTML files
html_files = []
for root, dirs, files in os.walk(workspace_dir):
    # Modify dirs in-place to skip hidden directories and node_modules
    dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']
    
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

# Update HTML references for converted images
if converted_mappings:
    print("Updating HTML references for newly converted images...")
    for h_file in html_files:
        with open(h_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        updated = False
        for orig_name, webp_name in converted_mappings.items():
            if orig_name in content:
                content = content.replace(orig_name, webp_name)
                updated = True
        
        if updated:
            with open(h_file, 'w', encoding='utf-8') as f:
                f.write(content)

# TASK 4: Add display=swap to Google Fonts
print("TASK 4: Adding display=swap to Google Fonts...")
for h_file in html_files:
    with open(h_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex to find fonts.googleapis.com URLs and add display=swap if missing
    def font_replacer(match):
        url = match.group(1)
        if 'display=swap' not in url:
            if '?' in url:
                url += '&display=swap'
            else:
                url += '?display=swap'
        return f'href="{url}"'

    new_content = re.sub(r'href="(https://fonts\.googleapis\.com/[^"]*)"', font_replacer, content)
    if new_content != content:
        with open(h_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Added display=swap to {os.path.basename(h_file)}")

# TASK 1: Add width and height to img tags
print("TASK 1: Adding explicit width and height to images...")

def get_image_dimensions(html_path, img_src):
    html_dir = os.path.dirname(html_path)
    img_src = img_src.split('?')[0]
    
    if img_src.startswith('http') or img_src.startswith('data:'):
        return None
        
    if img_src.startswith('/'):
        abs_img_path = os.path.join(workspace_dir, img_src.lstrip('/'))
    else:
        abs_img_path = os.path.normpath(os.path.join(html_dir, img_src))
        
    try:
        if os.path.exists(abs_img_path):
            with Image.open(abs_img_path) as img:
                return img.size # (width, height)
    except:
        pass
    return None

img_tag_regex = re.compile(r'<img\s+([^>]+)>', re.IGNORECASE)
width_regex = re.compile(r'\s*\bwidth=["\']?[^"\'>\s]+["\']?', re.IGNORECASE)
height_regex = re.compile(r'\s*\bheight=["\']?[^"\'>\s]+["\']?', re.IGNORECASE)

for h_file in html_files:
    with open(h_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    updated = False
    
    def img_replacer(match):
        global updated
        img_attrs = match.group(1)
        
        # Don't modify if it already has both width and height
        if re.search(r'\bwidth\s*=', img_attrs, re.IGNORECASE) and re.search(r'\bheight\s*=', img_attrs, re.IGNORECASE):
            return match.group(0)
            
        src_match = re.search(r'src=["\']([^"\']+)["\']', img_attrs, re.IGNORECASE)
        if not src_match:
            return match.group(0)
            
        src = src_match.group(1)
        dims = get_image_dimensions(h_file, src)
        
        if dims:
            width, height = dims
            # Remove any existing width or height to avoid duplicates
            img_attrs = width_regex.sub('', img_attrs)
            img_attrs = height_regex.sub('', img_attrs)
            
            # Add explicit width and height
            new_tag = f'<img {img_attrs.strip()} width="{width}" height="{height}">'
            updated = True
            return new_tag
        return match.group(0)

    # Need a wrapper to mutate `updated` from inside regex sub
    class Replacer:
        def __init__(self):
            self.updated = False
        def __call__(self, match):
            res = img_replacer(match)
            if res != match.group(0):
                self.updated = True
            return res

    rep = Replacer()
    new_content = img_tag_regex.sub(rep, content)
    if rep.updated:
        with open(h_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Added width/height to images in {os.path.basename(h_file)}")

# TASK 2: Create/Update .htaccess
print("TASK 2: Updating .htaccess...")
htaccess_path = os.path.join(workspace_dir, '.htaccess')
htaccess_rules = r"""
# BEGIN Cache Control for Performance
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
    <FilesMatch "\.(jpg|jpeg|png|webp|svg|ico|css|js|woff2)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    <FilesMatch "\.(html|htm)$">
        Header set Cache-Control "no-cache, must-revalidate"
    </FilesMatch>
</IfModule>
# END Cache Control for Performance
"""

content = ""
if os.path.exists(htaccess_path):
    with open(htaccess_path, 'r', encoding='utf-8') as f:
        content = f.read()

if "Cache Control for Performance" not in content:
    with open(htaccess_path, 'a', encoding='utf-8') as f:
        f.write("\n" + htaccess_rules)
    print("Added cache rules to .htaccess")
        
print("Performance optimizations completed.")
