# NEIKI Sub Say Foundation — Full Website Architecture
**Native HTML / CSS / JS build — Water-themed NGO website**
Mentor reference: gatesfoundation.org (structure, restraint, editorial tone)
Current site: neikisubsay.org (WordPress — being rebuilt native)

---

## 1. Design Language

### 1.1 Theme concept
"Water" is the visual and narrative thread of the whole site — not just the water-well project. Every page should feel calm, clean, and flowing: soft gradients, wave dividers between sections, blue-dominant palette, lots of white space (like Gates Foundation's airy layout), and photography-led storytelling instead of clipart/stock icons wherever possible.

### 1.2 Color palette

| Role | Color | Hex | Usage |
|---|---|---|---|
| Primary (Deep Water) | Navy blue | `#0B3C5D` | Header bg, footer bg, primary headings |
| Secondary (Ocean) | Mid blue | `#1E88C7` | Buttons, links, active nav state |
| Accent (Fresh Water) | Cyan/aqua | `#4FD1E8` | Hover states, icons, progress bars, dividers |
| Accent 2 (Life/Growth) | Teal-green | `#2E9E6D` | Success states, "goal reached" badges, secondary CTA |
| Warm accent (Donate CTA) | Amber/sand | `#F2A93B` | Donate button only — the one warm color, used sparingly so it always draws the eye |
| Neutral dark | Charcoal | `#1C2B33` | Body text |
| Neutral mid | Slate gray | `#5B6B73` | Secondary text, captions |
| Neutral light | Fog gray | `#F4F8FA` | Section alt-background |
| White | Pure white | `#FFFFFF` | Base background, card backgrounds |
| Border/divider | Pale blue-gray | `#DCE9EF` | Card borders, table lines |

Rule of thumb: **80% white/fog, 15% navy/ocean blue, 5% amber accent.** Amber is reserved exclusively for "Donate" so it never loses impact.

### 1.3 Typography

| Use | Font | Notes |
|---|---|---|
| Headings (H1–H3) | **Poppins** (600/700) | Rounded, friendly, modern — google font, water-droplet-ish curves |
| Sub-headings (H4–H6), nav, buttons | **Poppins** (500) | Same family, lighter weight for hierarchy |
| Body text | **Inter** (400/500) | High legibility at small sizes, neutral |
| Quotes / Chairman's message / pull quotes | **Lora** (italic, 400) | Serif italic gives warmth/emotion to testimonial-style content |

Load via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Lora:ital,wght@1,400;1,500&display=swap" rel="stylesheet">
```

### 1.4 Type scale (desktop / mobile)

| Element | Desktop | Mobile | Weight | Line-height | Color |
|---|---|---|---|---|---|
| H1 (page hero) | 48px | 32px | 700 | 1.15 | `#FFFFFF` (on hero) / `#0B3C5D` |
| H2 (section title) | 34px | 26px | 700 | 1.2 | `#0B3C5D` |
| H3 (card/subsection) | 22px | 19px | 600 | 1.3 | `#0B3C5D` |
| H4 (small heading) | 18px | 16px | 600 | 1.4 | `#1C2B33` |
| Body large (intro para) | 18px | 16px | 400 | 1.7 | `#1C2B33` |
| Body regular | 16px | 15px | 400 | 1.7 | `#1C2B33` |
| Caption/meta | 13px | 12px | 500 | 1.5 | `#5B6B73` |
| Button text | 15px | 14px | 600 | 1 | uppercase, 0.5px letter-spacing |
| Nav links | 15px | 15px | 500 | 1 | `#1C2B33`, hover → `#1E88C7` |

Base `font-size: 16px` on `<html>`, everything else in `rem`. Container max-width: **1200px**, side padding 24px (desktop), 16px (mobile).

### 1.5 Visual motifs (water theme, used throughout)
- Wave-shaped SVG dividers between sections (alternate direction each section) in `#F4F8FA` or `#0B3C5D`.
- Water-drop icon as a bullet/marker replacement in lists.
- Subtle animated ripple on button hover (CSS `::after` scale + fade).
- Photography treatment: slight blue-duotone overlay (`linear-gradient(rgba(11,60,93,.35), rgba(11,60,93,.05))`) on hero images so white text stays legible.
- Progress bars for fundraising goals styled as a "filling water tank" (rounded rect, aqua fill animating left→right).

### 1.6 Spacing & grid
- 8px base spacing unit (8/16/24/32/48/64/96 rhythm).
- Section vertical padding: 96px desktop / 56px mobile.
- 12-column CSS grid for content areas; cards use `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`.
- Border-radius standard: 12px (cards, images), 999px (buttons/pills).
- Shadow standard: `0 8px 24px rgba(11,60,93,0.08)`.

---

## 2. Sitemap (all pages)

```
/ (Home)
├── /about-us
│   ├── /about-us/chairman-message
│   ├── /about-us/sdg-aligned
│   ├── /about-us/team
│   └── /about-us/governance
├── /our-projects
│   ├── /our-projects/clean-water
│   ├── /our-projects/food-security
│   ├── /our-projects/health-medical
│   ├── /our-projects/education
│   ├── /our-projects/emergency-rehabilitation
│   └── /our-projects/flagship-programs
│       ├── /our-projects/flagship-programs/apna-ghar
│       ├── /our-projects/flagship-programs/clean-water-treatment
│       ├── /our-projects/flagship-programs/nutrition-drive
│       └── /our-projects/flagship-programs/education-skills
├── /causes (list of active fundraising campaigns)
│   └── /causes/[cause-slug] (dynamic/template page)
├── /events
│   └── /events/[event-slug] (e.g. build-a-water-well-in-pakistan)
├── /stories (success stories)
│   └── /stories/[story-slug]
├── /become-a-volunteer
├── /donate
├── /legal-status
├── /ask-a-question (FAQ / contact form)
├── /contact-us
└── /404 (error page)
```

**Total: 13 primary nav-reachable pages + 3 dynamic templates (causes, events, stories) that generate N pages from content.**

---

## 3. Global Layout (every page)

### 3.1 Top bar (thin, optional)
- Background `#0B3C5D`, height 36px, white text 13px.
- Left: address + phone (icon + text). Right: social icons (FB, IG, LinkedIn, X, YouTube — 16px, white, hover → `#4FD1E8`).

### 3.2 Header (sticky on scroll, height 84px desktop / 64px mobile)
- Background: white, `box-shadow` appears only after scroll.
- Left: NEIKI logo (SVG, water-drop mark + wordmark), 40px height.
- Center/Left-of-center: primary nav (Home / About Us / Our Projects / Causes / Events / Stories / Legal Status) — dropdown on About Us and Our Projects (mega-menu style like current site, reformatted cleanly into 2–3 columns).
- Right: "Donate Now" button — pill shape, `#F2A93B` background, white bold text, always visible, slightly larger than other CTAs (44px height).
- Mobile: hamburger → full-screen slide-in nav, `#0B3C5D` background, white 18px links stacked, accordion for sub-items.

### 3.3 Footer (background `#0B3C5D`, white/light-blue text)
4-column grid (desktop) → stacked (mobile):
1. **About column** — logo (white version), one-line mission, social icons.
2. **Quick Links** — Home, About Us, Our Projects, Causes, Legal Status, Contact.
3. **Address to Visit Us** — i8 Markaz Islamabad, ICT 44790 / phone / email, each with a small aqua icon.
4. **Newsletter** — "Get updates on our water projects" + email input (pill, white bg) + subscribe button (amber).
Below the grid: thin divider line (`rgba(255,255,255,.15)`), then legal row — "© [year] NEIKI Sub Say Foundation — A company set up under Section 42 of the Companies Act, 2017" (left) + Privacy / Terms links (right), 13px.

---

## 4. Page-by-Page Breakdown

For each page: purpose, sections top→bottom, content source, and specific styling notes.

---

### 4.1 Home (`/`)

**Purpose:** Emotional hook + trust signals + funnel into Donate/Volunteer, mirroring Gates Foundation's "story tiles → stats → CTA" rhythm but water-themed.

| # | Section | Content | Style notes |
|---|---|---|---|
| 1 | **Hero slider** | Full-bleed image carousel (water well builds, relief camps). Headline "Donate a water well in Pakistan" / sub "We are community-powered — 100% of your donation builds water wells in Pakistan." + "Take Action" CTA | Height 620px desktop / 480px mobile. H1 white 48px on blue-duotone photo. CTA = amber pill button. Auto-rotate 6s, dot indicators bottom-center in aqua. |
| 2 | **Impact strip** | 4 stat counters (Wells Built, People Served, Provinces Reached, Active Projects) — animate count-up on scroll | White bg, icons in aqua circle, number 36px Poppins 700 navy, label 14px gray uppercase |
| 3 | **Mission statement** | Short 2-sentence mission pulled from About Us + "Learn more about our role" link | Fog-gray bg (`#F4F8FA`), centered, max-width 720px, body-large 18px, Lora italic for the mission line itself |
| 4 | **What We Do (3 tiles)** | Our Work / Our Story / Clean Water Focus — each with photo, 1-line description, "Learn more" link (Gates Foundation's 3-tile pattern) | Equal 3-col cards, 12px radius, image top 200px, hover: image scales 1.04, card lifts (shadow) |
| 5 | **Featured campaign (well countdown)** | "Build a Water Well in Pakistan" — event countdown timer (Days/Hours/Mins/Sec) + Donate Now button | Navy card, white text, aqua countdown digits in white boxes |
| 6 | **Successful Stories** | 3 completed-project cards (AhmadPur relief, Cholistan water, education program) — photo, location tag, title, "Money Spent" figure | Card layout identical to current site but restyled: rounded photo top, location as aqua pill tag over image |
| 7 | **Recent Causes** | 4 active fundraising cause cards with progress bar (goal $ + % raised) | "Water tank fill" progress bar style described in 1.5 |
| 8 | **Upcoming Events** | 2–3 event cards, date badge (navy square, white day/month), countdown, short excerpt, Read More | |
| 9 | **Become a Volunteer** | Full-width band, navy-to-ocean gradient bg, white heading, 1-paragraph invite, "Welcome as Volunteer" CTA (white button, navy text) | |
| 10 | **Partners/Sponsors strip** | Logo row: UBL, SECP, Punjab Charity Commission, Ministry of Interior, Govt of Pakistan, FBR | Grayscale logos, color on hover, white bg, 60px logo height |
| 11 | **Newsletter/Contact mini-block** (optional, can fold into footer) | | |
| — | Footer | as global spec | |

---

### 4.2 About Us (`/about-us`)

**Purpose:** Trust + credibility. Mirrors Gates Foundation's "Our Role / How We Work / Our Story" three-part structure.

| # | Section | Content |
|---|---|---|
| 1 | Page hero (280px height, smaller than home) | Title "About Us" + breadcrumb (Home / About Us) over a water-themed photo |
| 2 | **Who We Are** | Full paragraph from existing content: non-profit humanitarian org, Section 42 company, founded on structured charity philosophy |
| 3 | **Our Philosophy** | Pull-quote style block (Lora italic, 22px, centered, aqua left-border 4px) |
| 4 | **Chairman's Message** | Photo (circular, 140px) + name/title + quoted message in Lora italic 18px, card with subtle shadow, aqua quotation-mark watermark graphic |
| 5 | **Vision & Mission** | 2-column: Vision (left, navy icon) / Mission as bulleted 6-item list (Education, Healthcare, Food security, Clean water, Disaster response, Livelihood development) — each bullet with water-drop icon |
| 6 | **Transparency & Governance** | 2-column: "Transparency Commitment" paragraph + checklist (Program-wise fund allocation, Donor-restricted funds, Internal audits, Impact reporting) using check-icon in teal-green; "Governance Structure" as a simple vertical org list (Board of Trustees → Board of Directors → Executive Management → Program & Field Teams) styled as a connected flow with thin aqua connector lines |
| 7 | **Our Team** | 3-card team grid: Rafee ur Rehman (Founder & CEO), Muhammad Rashid Maqbool (Team Manager), Taimoor Raziq (Financial Expert) — circular photo 160px, name 18px bold navy, role 14px gray, social icons row |
| 8 | **Our Impact / Areas of Concern** | 4-icon grid: Global Presence, Why NEIKI, Individuals Assisted, SDG-aligned NGO |
| 9 | **Sponsoring Companies** | logo strip (same component as home) |
| 10 | Footer | |

Sub-pages (anchor-linked from dropdown, can be true separate routes or in-page anchors):
- `/about-us/chairman-message` → same content as section 4, standalone page with full message + photo gallery of chairman at field visits.
- `/about-us/sdg-aligned` → grid of UN SDG icons (official colors) NEIKI aligns with, each linking to related project.
- `/about-us/team` → expanded team page with bios.
- `/about-us/governance` → expanded governance/org-chart page.

---

### 4.3 Our Projects (`/our-projects`)

**Purpose:** Central hub for programmatic work — the Gates Foundation "Our Work" equivalent.

| # | Section |
|---|---|
| 1 | Hero: "Our Projects" title over water-project photo |
| 2 | Intro paragraph: NEIKI's programmatic approach |
| 3 | **Current Projects grid** (5 cards): Emergency & Rehabilitation Support, Clean Water Projects, Food Security Program, Health & Medical Assistance, Education Support Program — each card: icon, title, 2-line description, "View Project →" |
| 4 | **Flagship Programs** — larger feature blocks (image left/text right, alternating), for: Apna Ghar Program (Shelter & Rehabilitation), Clean Water & Treatment Program, Cooked Food & Nutrition Drive, Education & Skill Development Program |
| 5 | **Phase 2 (Expanding Impact)** — tag/label "Coming Next" pill in amber; grid of 6: Women Empowerment & Livelihood, Environmental Sustainability & Climate Action, Disaster Response & Relief Operations, Community Development & Poverty Alleviation, Community Medical Clinics & Mobile Health Units, Health Awareness & Medical Aid |
| 6 | **Looking Forward** — tag "Future Vision"; grid of 5: Orphan & Child Welfare, Orphan Marriage & Family Support, Youth Empowerment & Volunteer Development, Sustainable Agriculture & Food Security, Faith & Humanity Campaigns |
| 7 | CTA band: "Support a Project" → Donate |
| — | Footer |

Each project name becomes its own detail page using a **shared project-template** (see §5) — so `/our-projects/clean-water`, `/our-projects/food-security`, etc. all reuse one layout with swapped content.

---

### 4.4 Causes (`/causes`)

**Purpose:** Active fundraising campaigns (donation-specific, separate from broader "Projects").

| # | Section |
|---|---|
| 1 | Hero: "Urgent Causes" |
| 2 | Filter bar (optional): All / Water / Health / Education / Emergency |
| 3 | Grid of cause cards (from current site: Fight for the Right Cause, Providing Education to Poor, The Old Need Our Support, Help Us Save The Children, We Can Work To Stop Beggary) — each: photo, category tag, title, goal amount, progress bar, Donate button |
| 4 | Footer |

`/causes/[slug]` template: hero image, goal vs raised (large water-tank progress graphic), story/description, donation amount buttons ($25/$50/$100/Custom), share buttons, related causes at bottom.

---

### 4.5 Events (`/events`)

| # | Section |
|---|---|
| 1 | Hero: "Upcoming Events" |
| 2 | Timeline-style list, each with date badge, countdown (if future), excerpt, Read More |
| 3 | Past events archive (grid, dimmed/grayscale badge "Completed") |
| 4 | Footer |

`/events/[slug]` template: hero, full countdown widget, full description, location, "Donate to this Event" CTA, photo gallery.

---

### 4.6 Stories (`/stories`)

**Purpose:** Gates-Foundation-style "Ideas" editorial section — long-form human stories, builds emotional trust.

| # | Section |
|---|---|
| 1 | Hero: "Our Stories" — "100% Completed Stories" subheading |
| 2 | Filterable grid (Water / Education / Health / Emergency Relief) |
| 3 | Cards: photo, location tag, title, "Money Spent $X" stat |
| 4 | Footer |

`/stories/[slug]` template: full-width hero photo, title, location + date, article body (Inter 18px, 1.8 line-height, max-width 720px for readability — matching Gates Foundation's article width), pull quotes in Lora italic, image gallery, impact stat callout box, related stories row.

---

### 4.7 Become a Volunteer (`/become-a-volunteer`)

| # | Section |
|---|---|
| 1 | Hero: "Become a Volunteer" + inviting photo |
| 2 | Why Volunteer — 3–4 benefit tiles (icon + short text) |
| 3 | Volunteer areas — Education, Healthcare, Water & Sanitation, Humanitarian Assistance (icon grid) |
| 4 | **Volunteer application form**: Full Name, Email, Phone, City, Area of Interest (dropdown), Availability, Message — submit button "Join as Volunteer" | Fields: white bg, `#DCE9EF` border, 8px radius, focus state border → `#1E88C7` with subtle aqua glow. Labels 14px medium, gray. |
| 5 | Footer |

---

### 4.8 Donate (`/donate`)

**Purpose:** Conversion page — must be fast, trustworthy, minimal distraction (unlike other pages, cut the footer's newsletter clutter).

| # | Section |
|---|---|
| 1 | Short hero/intro: "100% of your donation goes to the field" + trust badges (Section 42, SECP, FBR registered) |
| 2 | **Donation form**: choose cause (dropdown: General / Clean Water / Food / Health / Education / Emergency), choose amount (preset pills $25/$50/$100/$250 + custom input), one-time vs monthly toggle, donor details, payment button | Preset amount pills: unselected = white/border, selected = amber fill white text. Big final CTA button 56px height, amber, "Donate Securely". |
| 3 | Trust strip: bank/payment logos, "Your data is secure" note, link to Legal Status page |
| 4 | Minimal footer (legal row only) |

---

### 4.9 Legal Status (`/legal-status`)

| # | Section |
|---|---|
| 1 | Hero: "Legal Status" |
| 2 | Registration details: Section 42 Companies Act 2017, SECP registration number, Punjab Charity Commission, FBR tax-exemption status, Ministry of Interior clearance — presented as a clean definition list or table |
| 3 | Downloadable documents (registration certificate PDFs) as file-card links |
| 4 | Government/partner logo strip (reuse component) |
| 5 | Footer |

Typography note: this page is document-heavy — use a simple 2-column label/value table, 15px, generous row padding (16px), zebra striping in `#F4F8FA`.

---

### 4.10 Ask a Question (`/ask-a-question`)

| # | Section |
|---|---|
| 1 | Hero: "Ask a Question" |
| 2 | FAQ accordion (How is my donation used? / Is NEIKI tax-exempt? / How can I volunteer? / etc.) — chevron icon rotates on open, aqua accent line under open item |
| 3 | "Still have a question?" mini contact form (Name, Email, Question) → feeds into same handler as Contact Us |
| 4 | Footer |

---

### 4.11 Contact Us (`/contact-us`)

| # | Section |
|---|---|
| 1 | Hero: "Contact Us" |
| 2 | 2-column: left = contact form (Name, Email, Subject, Message, Send button); right = info card (address, phone, email, office hours) + embedded Google Map (Islamabad i8 Markaz, styled with a custom blue map skin if using Google Maps JS API, or a static map image) |
| 3 | Social icons row |
| 4 | Footer |

---

### 4.12 404 Page

- Water-drop illustration (empty well / dry tap graphic), H1 "Page Not Found", short line, "Back to Home" button. Keep header + footer for navigation continuity.

---

## 5. Reusable Templates (so you don't hand-build every page from scratch)

| Template | Used by | Key repeating blocks |
|---|---|---|
| **project-detail.html** | all /our-projects/* pages | hero, overview text, "Goals" bullet list, image gallery, related stories, donate CTA |
| **cause-detail.html** | all /causes/* pages | hero, goal/raised bar, story, donate widget, share buttons |
| **event-detail.html** | all /events/* pages | hero, countdown, description, location, donate CTA |
| **story-detail.html** | all /stories/* pages | hero photo, article body, stat callout, gallery, related |
| **card-grid.html** (partial) | Home, Projects, Causes, Stories, Events list pages | reusable card component with photo/tag/title/meta/CTA slot |

Build these as HTML partials/includes (or JS template literals if using vanilla JS with no build step) so content changes happen in one file, not 20.

---

## 6. Component Library (build once, reuse everywhere)

| Component | States | Notes |
|---|---|---|
| **Button — Primary** | default / hover / active / disabled | `#1E88C7` bg → hover `#0B3C5D`; pill shape; 12px 28px padding |
| **Button — Donate (CTA)** | default / hover | `#F2A93B` bg → hover darken 8%; always pill; used only for donation actions |
| **Button — Secondary/Outline** | default / hover | transparent bg, `#1E88C7` border+text → hover fills `#1E88C7` bg white text |
| **Card** | default / hover | white bg, 12px radius, 1px `#DCE9EF` border, hover: shadow + 4px lift |
| **Progress bar (water tank)** | 0–100% | track `#DCE9EF`, fill gradient `#4FD1E8 → #1E88C7`, rounded, animated width on scroll-into-view |
| **Countdown timer** | live | 4 boxes (Days/Hrs/Min/Sec), navy bg white numbers, aqua labels |
| **Nav dropdown / mega-menu** | closed / open | fade+slide-down 200ms, white bg, shadow |
| **Accordion (FAQ)** | closed / open | chevron rotate 180°, aqua underline on active |
| **Form input** | default / focus / error | border `#DCE9EF` → focus `#1E88C7` glow → error `#E24C4C` |
| **Tag/pill (category label)** | — | small aqua-bg white-text pill, 11px uppercase, used on cards over images |
| **Stat counter** | animates on scroll | count-up JS (e.g. simple requestAnimationFrame or a tiny lib) |
| **Wave divider (SVG)** | — | flips per section for rhythm |

---

## 7. Technical Structure (native web, no framework)

```
/neiki-website
├── index.html
├── about-us.html
├── about-us-chairman.html
├── about-us-sdg.html
├── about-us-team.html
├── about-us-governance.html
├── our-projects.html
├── our-projects-clean-water.html   (repeat pattern per project)
├── causes.html
├── causes-[slug].html              (or JS-driven single template + JSON data)
├── events.html
├── events-[slug].html
├── stories.html
├── stories-[slug].html
├── become-a-volunteer.html
├── donate.html
├── legal-status.html
├── ask-a-question.html
├── contact-us.html
├── 404.html
├── /assets
│   ├── /css
│   │   ├── variables.css      (color/font tokens as CSS custom properties)
│   │   ├── base.css           (reset, typography, grid)
│   │   ├── components.css     (buttons, cards, forms, nav, footer)
│   │   └── pages.css          (page-specific overrides)
│   ├── /js
│   │   ├── nav.js              (mobile menu, dropdowns)
│   │   ├── countdown.js
│   │   ├── counter.js          (stat count-up)
│   │   ├── progress-bars.js    (scroll-triggered fill animation)
│   │   ├── slider.js           (hero carousel)
│   │   └── forms.js            (validation + submit handling)
│   ├── /img
│   └── /fonts (or Google Fonts CDN link)
└── /data
    ├── causes.json
    ├── events.json
    ├── stories.json
    └── projects.json
```

Use CSS custom properties in `variables.css` so the whole theme is swappable from one place:
```css
:root{
  --color-primary:#0B3C5D;
  --color-secondary:#1E88C7;
  --color-accent:#4FD1E8;
  --color-accent-2:#2E9E6D;
  --color-cta:#F2A93B;
  --color-text:#1C2B33;
  --color-text-muted:#5B6B73;
  --color-bg-alt:#F4F8FA;
  --color-border:#DCE9EF;
  --font-heading:'Poppins',sans-serif;
  --font-body:'Inter',sans-serif;
  --font-quote:'Lora',serif;
  --radius-card:12px;
  --radius-pill:999px;
  --shadow-card:0 8px 24px rgba(11,60,93,0.08);
  --space-section:96px;
}
```

For the dynamic-feeling pages (causes/events/stories) with no backend/CMS, keep it simple: store each list in a `.json` file under `/data`, and have one JS file (`content-loader.js`) fetch and render cards on the list pages, and render detail pages by reading a `?id=` query param — that gives you a "native web" (no framework) way to avoid duplicating 20 nearly-identical HTML files by hand. If you'd rather keep it 100% static HTML per page (simpler to reason about, better for SEO without extra work), just copy the detail template per item — either approach is valid, pick based on how often content will change.

---

## 8. Writing Style Guide (tone of voice)

Modeled on Gates Foundation's tone: warm, human, factual, never guilt-tripping.

- **Headlines**: short, active, human-centered ("Every child deserves clean water" not "Water Crisis Statistics").
- **Body copy**: plain language, short paragraphs (2–4 sentences), lead with the person/place, follow with the impact, close with the number.
- **Numbers**: always concrete and specific ("$1,300 built a well in Cholistan" beats "we helped many families").
- **CTAs**: verb-first, specific ("Build a Well" / "Sponsor a Child" / "Join as Volunteer" — not generic "Click Here" or "Submit").
- **Avoid**: stock NGO clichés ("changing lives one drop at a time" overused), guilt-based appeals, ALL CAPS urgency.
- Existing placeholder/Lorem-ipsum content on the current site (e.g. the Women's Health Day event excerpt) should be rewritten in this voice before launch — flag any page still using placeholder text.

---

## 9. Page-Count Summary

| Category | Count |
|---|---|
| Core static pages | 12 (Home, About Us + 4 sub, Our Projects, Volunteer, Donate, Legal Status, Ask a Question, Contact Us) |
| Project detail pages | 5 current + 4 flagship + 6 phase-2 + 5 looking-forward = up to 20 (can launch with the 5 current + 4 flagship = 9, add rest later) |
| Cause detail pages | dynamic, driven by `causes.json` (currently 5) |
| Event detail pages | dynamic, driven by `events.json` (currently 2) |
| Story detail pages | dynamic, driven by `stories.json` (currently 3) |
| Error page | 1 (404) |
| **Total nav-visible routes at launch** | **~13**, expandable via JSON without new page files |

---

## 10. Suggested Build Order

1. `variables.css` + `base.css` (tokens, typography, grid) — get the water theme locked first.
2. Header + Footer (global, appears everywhere) + nav.js.
3. Home page (proves out hero slider, cards, counters, progress bars — reused everywhere after).
4. About Us (static content is ready from current site copy).
5. Our Projects hub + one project-detail template.
6. Causes list + cause-detail template + donate.js logic.
7. Events + Stories (same pattern as Causes).
8. Volunteer, Donate, Legal Status, Ask a Question, Contact Us (form-heavy pages, do last since forms.js is shared).
9. 404 + final responsive QA pass (test at 375px, 768px, 1024px, 1440px).

---

*This document is the build spec. Content (final copy, real photography, project numbers) can be swapped in per the writing-style guide above without changing structure. Let me know if you want the actual `variables.css` + starter `index.html` scaffolded next.*
