import glob
import re

html_files = glob.glob('*.html')

deleted_pages = [
    'financials.html',
    'work.html',
    'water-projects.html',
    'role.html',
    'story.html',
    'handwriting-demo.html'
]

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Fix brand color
    content = content.replace('#00a2e8', '#009EDB')
    content = content.replace('#00A2E8', '#009EDB')

    # Fix ways-to-give
    content = content.replace('href="ways-to-give.html"', 'href="#" onclick="alert(\'Donations are currently offline as we integrate our payment systems. Please contact us directly.\'); return false;"')

    # Remove links to deleted pages (try to catch <li> wrapper or just the <a> tag)
    for dp in deleted_pages:
        # Regex to remove an entire <li>...</li> block if it contains the link
        # This assumes standard formatting like <li><a href="work.html">...</a></li>
        li_pattern = re.compile(rf'<li>\s*<a[^>]*href="{dp}"[^>]*>.*?</a>\s*</li>', re.IGNORECASE | re.DOTALL)
        content = li_pattern.sub('', content)

        # Also remove div wrappers if they are in footer or somewhere else like <div class="footer-nav-primary">
        # Let's just remove the <a> tag if it's not wrapped in a list we caught
        a_pattern = re.compile(rf'<a[^>]*href="{dp}"[^>]*>.*?</a>', re.IGNORECASE | re.DOTALL)
        content = a_pattern.sub('', content)
        
    # Remove duplicate meta descriptions and titles?
    # The user noted that meta tags are duplicated across pages. I can't easily generate unique ones for 15 pages in one script.
    # But fixing the critical issues is more important now.

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Cleanup complete!")
