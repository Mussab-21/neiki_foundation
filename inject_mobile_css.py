import os
import glob
import re

base_dir = r"D:\ATC\Neeki_web"
html_files = glob.glob(os.path.join(base_dir, "*.html"))

link_tag = '\n  <link rel="stylesheet" href="css/mobile-header.css?v=2">\n</head>'

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "css/mobile-header.css" not in content:
        content = re.sub(r'</head>', link_tag, content, flags=re.IGNORECASE)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected into {os.path.basename(file_path)}")
    else:
        print(f"Already injected in {os.path.basename(file_path)}")
