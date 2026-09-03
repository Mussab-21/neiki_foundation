import os

# Working Directory
base_dir = r"D:\ATC\Neeki_web\Mobile_UI-UX"
index_path = os.path.join(base_dir, "index.html")
css_path = os.path.join(base_dir, "css", "main.css")

# CSS to append/modify for the mobile layout
MOBILE_CSS = """
/* -------------------------------------
   MOBILE SPECIFIC UI (Draft Implement)
   ------------------------------------- */
:root {
  --mob-top-height: 60px;
  --mob-bot-height: 60px;
}

@media (max-width: 900px) {
  body {
    padding-top: var(--mob-top-height) !important;
    padding-bottom: calc(var(--mob-bot-height) + 20px) !important;
  }

  /* TOP BAR */
  .site-header {
    position: fixed !important;
    top: 0; left: 0; right: 0;
    height: var(--mob-top-height) !important;
    background-color: var(--color-primary) !important; /* same as web ui */
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 0 15px !important;
    z-index: 10000;
  }
  .header-inner {
    display: flex !important;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  /* Left side: Hamburger + Logo */
  .header-left-group {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .mobile-menu-toggle {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    color: white !important;
    font-size: 1.8rem;
    background: transparent;
    border: 1px dotted rgba(255, 255, 255, 0.6);
    border-radius: 4px;
    padding: 0;
  }
  .header-logo {
    height: 30px !important;
    width: auto !important;
    object-fit: contain;
  }
  
  /* Right side: Donate */
  .header-donate-btn {
    display: inline-block !important;
    background: white;
    color: var(--color-primary);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.85rem;
    font-family: var(--font-sans-bold);
    text-decoration: none;
    font-weight: 700;
  }

  /* Hamburger Drawer */
  .main-nav {
    display: none !important; /* hidden by default */
    position: fixed !important;
    top: var(--mob-top-height) !important;
    left: 0; right: 0; bottom: 0;
    background: var(--color-primary) !important;
    z-index: 9999;
    padding: 2rem !important;
    overflow-y: auto !important;
  }
  .main-nav.menu-open {
    display: block !important;
  }
  .main-nav ul {
    display: flex !important;
    flex-direction: column !important;
    gap: 1.5rem !important;
  }
  .main-nav a {
    color: white !important;
    font-size: 1.2rem !important;
    font-family: var(--font-sans-bold) !important;
    text-decoration: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-nav a::after {
    content: '\203A';
    font-size: 1.8rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
  }
  
  .header-actions {
    display: none !important; /* Hide original desktop actions */
  }

  /* BOTTOM NAVIGATION BAR */
  .mobile-bottom-nav {
    display: flex !important;
    position: fixed;
    bottom: 0 !important;
    left: 0; right: 0;
    height: var(--mob-bot-height);
    background: #ffffff;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
    z-index: 9999;
    justify-content: space-around;
    align-items: center;
    padding-bottom: env(safe-area-inset-bottom);
  }
  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 10px;
    font-family: var(--font-sans-bold);
    text-decoration: none;
    flex: 1;
  }
  .mobile-nav-item svg {
    width: 20px; height: 20px;
    margin-bottom: 4px;
    fill: currentColor;
  }
  .mobile-nav-item.active {
    color: var(--color-primary);
  }
  
  /* Middle Donate Button */
  .mobile-nav-item.donate-btn-nav {
    position: relative;
    top: -15px;
    background: var(--color-primary);
    color: white !important;
    width: 55px; height: 55px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 158, 219, 0.4);
    flex: none;
    border: 4px solid white;
  }
  .mobile-nav-item.donate-btn-nav span {
    display: block;
    margin-top: -2px;
  }
  .mobile-nav-item.donate-btn-nav svg {
    width: 22px; height: 22px;
    margin-bottom: 0;
  }

  /* SLIDER SECTION */
  .hero-container {
    height: auto !important;
    margin-bottom: 1rem !important;
  }
  .hero-slide {
    opacity: 0; pointer-events: none; position: absolute; top:0; left:0; width:100%;
    transition: opacity 0.5s;
  }
  .hero-slide.active {
    opacity: 1; pointer-events: auto; position: relative;
  }
  .new-donate-slide {
    display: flex !important;
    flex-direction: column !important;
    background: #f8fbff !important;
  }
  .new-donate-media {
    height: 30vh !important; /* 25-30% */
    min-height: 250px !important;
    width: calc(100% - 30px) !important;
    margin: 15px auto !important;
    border-radius: 30px !important;
  }
  .new-donate-img {
    height: 100% !important;
  }
  .new-donate-overlay-content {
    padding: 1rem 15px !important;
  }
  .new-donate-headline {
    font-size: 1.6rem !important;
    margin-bottom: 0.5rem !important;
  }
  .new-donate-subtext {
    font-size: 0.9rem !important;
  }
  .new-donate-pillars { display: none !important; }

  /* Donation Form Adjustment */
  .new-donate-form-wrapper {
    padding: 0 15px !important;
    margin-top: 1.5rem !important;
    z-index: 10; position: relative;
  }
  .new-donate-card {
    padding: 1.25rem !important;
    border-radius: 12px !important;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08) !important;
    background: white !important;
  }
  .new-donate-card-title { font-size: 1.3rem !important; }
  .new-donate-card-desc { font-size: 0.85rem !important; }

  /* HOME PAGE SECTIONS FROM DRAFT */
  
  /* Foundation Progress */
  .facts-wrapper { padding: 1.5rem 15px !important; margin-top: 1rem !important; }
  .facts-card {
    border-radius: 16px !important;
    padding: 1.5rem !important;
    background: transparent !important;
    border: 2px solid var(--color-primary);
  }
  .facts-title-wrapper h2 { font-size: 1.4rem !important; color: var(--color-text) !important; }
  .facts-title-wrapper p { display: none !important; }
  .stats-row {
    flex-direction: row !important;
    justify-content: space-around !important;
  }
  .stat-item { padding: 0 !important; text-align: center; }
  .stat-number { font-size: 1.8rem !important; color: var(--color-primary) !important; }
  .stat-label { font-size: 0.8rem !important; color: var(--color-text) !important; }

  /* Strong Governance */
  .structure-section {
    border: 2px solid var(--color-primary);
    border-radius: 16px;
    margin: 1rem 15px !important;
    padding: 1.5rem !important;
    background: transparent !important;
  }
  .structure-section h2 { font-size: 1.4rem !important; text-align: left !important; margin-bottom: 1.5rem !important; }
  .structure-section > div > div {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-around !important;
    gap: 0 !important;
  }
  .structure-section svg { width: 30px !important; height: 30px !important; }
  .structure-section h4 { font-size: 0.7rem !important; }
  .structure-section .hero-btn { width: 100%; text-align: center; margin-top: 1.5rem; }

  /* Vision Statement */
  .mission-section {
    border: 2px solid var(--color-primary) !important;
    border-radius: 16px !important;
    margin: 1rem 15px !important;
    padding: 1.5rem !important;
    background: transparent !important;
    text-align: center !important;
  }
  .mission-statement {
    font-size: 1.2rem !important;
    margin-bottom: 1rem !important;
    color: var(--color-text) !important;
  }
  .mission-section .btn-outline-blue { display: inline-block; }

  /* Our Gallery */
  .gallery-section { padding: 1rem 15px !important; }
  .gallery-section h2 { font-size: 1.5rem !important; text-align: center !important; }
  .custom-slider img { width: 150px !important; height: 150px !important; border-radius: 12px !important; }

  /* Future Goals */
  .future-goals-marquee-section { padding: 1rem 15px !important; background: transparent !important; }
  .fg-heading { font-size: 1.5rem !important; text-align: center !important; }
  .marquee-content a {
    width: 140px !important; height: 140px !important;
    border: 2px solid var(--color-primary);
    background: transparent !important;
    color: var(--color-text) !important;
  }
  .marquee-content a .goal-icon { background: var(--color-primary); color: white; }
  /* Carousel Controls Mobile */
  .new-carousel-controls {
    flex-direction: row !important;
    bottom: 20px !important;
    top: auto !important;
    right: 50% !important;
    transform: translateX(50%) !important;
    background: transparent !important;
    padding: 0 !important;
  }
  .new-carousel-controls .dots-wrapper {
    display: flex; gap: 8px; align-items: center;
  }
  .new-carousel-controls .dot { margin: 0 !important; }
  .new-carousel-controls .play-pause-toggle {
    display: flex; color: white; cursor: pointer; margin-left: 10px;
  }
}

@media (min-width: 901px) {
  .mobile-bottom-nav, .header-left-group, .header-donate-btn { display: none !important; }
  .new-carousel-controls { flex-direction: column !important; right: 2rem !important; bottom: auto !important; top: 50% !important; transform: translateY(-50%) !important; }
  .new-carousel-controls .dots-wrapper { display: flex; flex-direction: column; gap: 8px; align-items: center; }
  .new-carousel-controls .play-pause-toggle { margin-left: 0; margin-top: 10px; }
}
"""

with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

marker = "/* -------------------------------------\n   MOBILE SPECIFIC UI (Draft Implement)"
if marker in content:
    content = content[:content.find(marker)]

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content.strip() + "\n\n" + MOBILE_CSS)

# Update HTML Structure for Top Bar and Bottom Bar
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Header
header_replacement = """
  <header class="site-header" id="header">
    <div class="container header-inner">
      <div class="header-left-group">
        <button class="mobile-menu-toggle" aria-label="Toggle Menu">&#9776;</button>
        <a href="/" class="nav-brand">
          <img loading="lazy" src="assets/img/neiki_logo_white_transparent.png" alt="NEIKI Sub Say Foundation" class="header-logo">
        </a>
      </div>
      <a href="donate.html" class="header-donate-btn">Donate Us</a>

      <nav class="main-nav">
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="impact.html">Our Impact</a></li>
          <li><a href="flood-relief.html">2025 Flood Relief</a></li>
          <li><a href="accountability.html">Accountability & Impact</a></li>
        </ul>
      </nav>
      
      <!-- Desktop Actions (hidden on mobile) -->
      <div class="header-actions" style="display: flex; gap: 1rem; align-items: center;">
        <a href="contact.html" style="...">Contact Us</a>
        <a href="donate.html" style="...">Donate</a>
      </div>
    </div>
  </header>
"""
# Replace existing header block
import re
html = re.sub(r'<header class="site-header".*?</header>', header_replacement, html, flags=re.DOTALL)


# 2. Add Bottom Navigation
bottom_nav = """
<!-- Mobile Bottom Navigation -->
<nav class="mobile-bottom-nav">
  <a href="index.html" class="mobile-nav-item active">
    <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
    <span>Home</span>
  </a>
  <a href="impact.html" class="mobile-nav-item">
    <svg viewBox="0 0 24 24"><path d="M11 21h-1l1-7H7.5c-.8 0-1.2-1-.8-1.6l6-10h1l-1 7h3.5c.8 0 1.2 1 .8 1.6l-6 10z"/></svg>
    <span>Impact</span>
  </a>
  <a href="donate.html" class="mobile-nav-item donate-btn-nav">
    <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    <span>Donate</span>
  </a>
  <a href="about.html" class="mobile-nav-item">
    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
    <span>About</span>
  </a>
  <a href="contact.html" class="mobile-nav-item">
    <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
    <span>Contact</span>
  </a>
</nav>
"""
if "mobile-bottom-nav" not in html:
    html = html.replace('</body>', bottom_nav + '\n</body>')

# 3. Add Hamburger JS
if "nav.classList.toggle('menu-open')" not in html:
    html = html.replace('</body>', """
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    if(toggle && nav) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        nav.classList.toggle('menu-open');
        toggle.innerHTML = nav.classList.contains('menu-open') ? '&#10005;' : '&#9776;';
      });
    }
  });
</script>
</body>""")
else:
    # If the script already exists, replace it to include the icon toggle
    import re
    script_pattern = r"<script>\s*document\.addEventListener\('DOMContentLoaded', function\(\) \{\s*const toggle = document\.querySelector\('\.mobile-menu-toggle'\);.*?<\/script>"
    new_script = """<script>
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    if(toggle && nav) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        nav.classList.toggle('menu-open');
        toggle.innerHTML = nav.classList.contains('menu-open') ? '&#10005;' : '&#9776;';
      });
    }
  });
</script>"""
    html = re.sub(script_pattern, new_script, html, flags=re.DOTALL)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated Mobile UI in Mobile_UI-UX folder")
