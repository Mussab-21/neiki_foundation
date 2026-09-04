import os
from bs4 import BeautifulSoup
import re

html_files = []
for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

# Define mapping for specific classes
# Rules match either the img's class or its parent's class
rules = {
    'gallery-img': {'width': '450', 'height': '300'},
    'card-horizontal-img': {'width': '640', 'height': '400'},
    'idea-card-img': {'width': '380', 'height': '237'},
    'intro-card-img-wrapper': {'width': '300', 'height': '250'},
    'partners-image-container': {'width': '640', 'height': '600'},
    'more-card-img': {'width': '400', 'height': '275'},
    'new-donate-img': {'width': '1280', 'height': '600'},
    'hero-img': {'width': '1280', 'height': '700'},
    'custom-slider': {'width': '150', 'height': '150'},
    'header-search': {'width': '26', 'height': '26'},
    'header-logo-icon': {'width': '45', 'height': '45'},
    'header-logo-wordmark': {'width': '200', 'height': '45'},
}

def get_dimensions_for_img(img):
    img_classes = img.get('class', [])
    if isinstance(img_classes, str):
        img_classes = [img_classes]
    
    # Check img classes
    for cls in img_classes:
        if cls in rules:
            return rules[cls]
    
    # Check parent classes
    parent = img.parent
    while parent and parent.name != 'body':
        parent_classes = parent.get('class', [])
        if isinstance(parent_classes, str):
            parent_classes = [parent_classes]
        for cls in parent_classes:
            if cls in rules:
                return rules[cls]
        parent = parent.parent
        
    return None

def scale_dimensions(w_str, h_str):
    try:
        w = int(w_str)
        h = int(h_str)
        if w > 800 or h > 800:
            scale = 800.0 / max(w, h)
            return str(int(w * scale)), str(int(h * scale))
        return w_str, h_str
    except:
        return w_str, h_str

for filepath in html_files:
    if 'old' in filepath.lower() or 'test' in filepath.lower():
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    soup = BeautifulSoup(content, 'html.parser')
    replacements = []
    
    for img in soup.find_all('img'):
        if not img.has_attr('width') or not img.has_attr('height'):
            continue
            
        old_w = img['width']
        old_h = img['height']
        
        dims = get_dimensions_for_img(img)
        if dims:
            new_w, new_h = dims['width'], dims['height']
        else:
            new_w, new_h = scale_dimensions(old_w, old_h)
            
        if old_w != new_w or old_h != new_h:
            # Reconstruct the original tag as much as possible for regex matching
            # Since BS4 modifies attributes, we use regex on the raw content
            # We look for <img ... width="old_w" ... height="old_h" ...>
            # But the order might vary.
            pass

    # A safer way to do this without BS4 modifying the HTML is to use regex entirely
    # Let's replace the logic to be regex based for the whole replacement process,
    # but since we need context (parent classes), we can use BS4 to find the exact src 
    # of the image that needs changing, then use regex to find that src in the file 
    # and replace its width and height.
    
    for img in soup.find_all('img'):
        if not img.has_attr('width') or not img.has_attr('height') or not img.has_attr('src'):
            continue
            
        old_w = img['width']
        old_h = img['height']
        src = img['src']
        
        dims = get_dimensions_for_img(img)
        if dims:
            new_w, new_h = dims['width'], dims['height']
        else:
            new_w, new_h = scale_dimensions(old_w, old_h)
            
        if old_w != new_w or old_h != new_h:
            replacements.append((src, old_w, old_h, new_w, new_h))
            
    if replacements:
        for src, old_w, old_h, new_w, new_h in replacements:
            # Find the img tag with this src
            # Regex to match the img tag containing this src
            src_escaped = re.escape(src)
            img_pattern = re.compile(r'(<img[^>]*?src=["\']' + src_escaped + r'["\'][^>]*?>)', re.IGNORECASE)
            
            def replace_img(match):
                tag = match.group(1)
                # Replace width
                tag = re.sub(r'(width=["\'])' + re.escape(old_w) + r'(["\'])', r'\g<1>' + str(new_w) + r'\g<2>', tag)
                # Replace height
                tag = re.sub(r'(height=["\'])' + re.escape(old_h) + r'(["\'])', r'\g<1>' + str(new_h) + r'\g<2>', tag)
                return tag
                
            content = img_pattern.sub(replace_img, content)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath} ({len(replacements)} images)")

