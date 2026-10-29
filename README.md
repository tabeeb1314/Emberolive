# Ember & Olive — Modern American Bistro Website (Portfolio Concept)

**Ember & Olive** is a complete, responsive, editorial-grade restaurant website built with semantic **HTML5**, modern **CSS3**, and dependency-free **Vanilla JavaScript (ES6+)**.

> **Portfolio Disclaimer:** *Ember & Olive* is a fictional restaurant concept situated in Austin, Texas, created exclusively as a web design, UI/UX, brand strategy, and front-end development portfolio showcase. All street addresses (`418 West 2nd Street, Suite 110, Austin, TX 78701`), telephone numbers (`(512) 555-0194`), email addresses (`hello@emberandolive-austin.example`), and menu prices are fictional sample content.

---

## 1. Project Folder Structure

```text
ember-and-olive/
├── index.html                        # Semantic HTML5 markup (all 10 sections, WAI-ARIA tabs, metadata)
├── style.css                         # Custom editorial CSS3 (CSS Grid, custom properties, reduced-motion)
├── script.js                         # Vanilla JS (mobile nav, ARIA tabs, dietary filters, form validation)
├── README.md                         # Local setup, GitHub Pages deployment, & architecture documentation
└── assets/                           # Local visual assets & custom vector iconography
    ├── favicon.svg                   # Custom ember flame & olive branch SVG emblem
    ├── hero-hearth-table.jpg         # Hero editorial photograph (wood-fired hearth & bistro table)
    ├── story-chef-hearth.jpg         # Culinary philosophy photograph (chef at live post-oak hearth)
    ├── dish-prime-ribeye.jpg         # Signature dish: 14oz Dry-Aged Prime Ribeye
    ├── dish-saffron-tagliolini.jpg   # Signature dish: Hand-Cut Saffron Tagliolini
    ├── dish-red-snapper.jpg          # Signature dish: Wood-Roasted Gulf Red Snapper
    ├── dish-peach-burrata.jpg        # Signature dish: Charred Fredericksburg Peach & Burrata
    ├── dish-fig-galette.jpg          # Signature dish: Roasted Black Mission Fig Galette
    └── dining-room-interior.jpg      # Dining experience photograph (warm limewash & olive leather interior)
```

---

## 2. Visual Identity & Design Decisions

- **Aesthetic Direction:** Warm, tactile, editorial hospitality inspired by independent culinary magazines and Central Texas architectural materiales (limewash plaster, walnut timber, post-oak embers, and cold-pressed olive oil).
- **Color Palette:**
  - **Alabaster Ivory (`#FAF6F0`) & Warm Linen (`#F2ECE1`):** Primary and secondary editorial surfaces that avoid harsh pure-white glare.
  - **Deep Hearth Charcoal (`#1C1A17`) & Warm Slate (`#46413A`):** High-contrast typography exceeding WCAG AA/AAA readability standards.
  - **Texas Olive Green (`#3B4934`) & Soft Sage (`#E5ECE0`):** Grounding botanical accents for badges, active menu tabs, and culinary notes.
  - **Restrained Ember Terracotta (`#B8502B`):** Used purposefully for eyebrow rules, active focus outlines, and primary reservation calls to action.
- **Typography Pairing:**
  - **Display & Headings:** *Cormorant Garamond* (weights 500, 600, 700 + italic) for literary warmth and menu elegance.
  - **Body, UI & Forms:** *Plus Jakarta Sans* (weights 400, 500, 600, 700) with `tabular-nums` alignment for crisp pricing and hours tables.

---

## 3. How to Run the Website Locally

Because this project uses standard HTML5, CSS3, and Vanilla JavaScript with zero build steps or paid dependencies, you can run it immediately on any computer:

### Method A: Direct Browser Open (Zero Setup)
1. Download and unzip `ember-and-olive-portfolio.zip`.
2. Double-click `index.html` to open it directly in Chrome, Firefox, Safari, or Edge.

### Method B: Local Development Server (Recommended for Testing)
Running a lightweight local static server ensures full parity with GitHub Pages:

- **Using Python 3 (built into macOS/Linux):**
  ```bash
  cd ember-and-olive
  python3 -m http.server 8080
  ```
  Then open `http://localhost:8080` in your browser.

- **Using VS Code Live Server:**
  1. Open the `ember-and-olive` folder in Visual Studio Code.
  2. Right-click `index.html` and select **"Open with Live Server"**.

---

## 4. Step-by-Step GitHub Pages Deployment Instructions

This repository is 100% static and ready for free hosting on **GitHub Pages**:

1. **Create a GitHub Repository:**
   - Sign in to [GitHub](https://github.com) and click **New repository**.
   - Name your repository (for example, `ember-and-olive-bistro`) and set it to **Public**.
2. **Upload or Push the Project Files:**
   - Initialize Git inside the `ember-and-olive` project folder and push the files:
     ```bash
     cd ember-and-olive
     git init
     git branch -M main
     git add index.html style.css script.js README.md assets/
     git commit -m "Initial release of Ember & Olive portfolio restaurant website"
     git remote add origin https://github.com/<your-username>/ember-and-olive-bistro.git
     git push -u origin main
     ```
   - *(Alternatively, click **Add file → Upload files** in the GitHub web interface and drag `index.html`, `style.css`, `script.js`, `README.md`, and the `assets/` folder into the root of the repository.)*
3. **Enable GitHub Pages:**
   - In your repository on GitHub, click **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment → Source**, select **Deploy from a branch**.
   - Select the **`main`** branch and **`/ (root)`** folder, then click **Save**.
4. **View Your Live Portfolio Site:**
   - Wait 60–90 seconds for GitHub Actions to finish publishing, then visit:
     `https://<your-username>.github.io/ember-and-olive-bistro/`

---

## 5. External Font & Image Sources

1. **Typography (Google Fonts CDN):**
   - [`Cormorant Garamond`](https://fonts.google.com/specimen/Cormorant+Garamond) (SIL Open Font License)
   - [`Plus Jakarta Sans`](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (SIL Open Font License)
   - Graceful system font fallbacks (`Georgia, serif` and `-apple-system, BlinkMacSystemFont, sans-serif`) are configured in `style.css` so typography remains cohesive even offline.
2. **Photography & Vector Graphics (`assets/`):**
   - All 8 food and interior photographs (`assets/*.jpg`) are custom-generated, art-directed editorial culinary photographs included locally in the `assets/` folder—no fragile third-party random image URLs are used.
   - Custom inline SVG iconography (brand emblem, location pin, and Downtown Austin architectural street diagram) is authored directly in semantic SVG markup.
   - Every `<figure class="editorial-media">` container also includes a CSS + JS error fallback (`initImageFallbacks()`) so the layout remains visually coherent if an image path is ever offline or renamed.

---

## 6. Honest Breakdown: Functional Front-End Features vs. Backend Requirements

### Fully Functional on the Front End (Included Out of the Box)
- **Responsive Navigation & Mobile Drawer:** Sticky header, animated hamburger button (`aria-expanded`, `aria-controls`), Escape-key dismissal, and automatic drawer closing when a section link is selected.
- **WAI-ARIA Menu Tabs & Dietary Filters:** Full pointer and keyboard (`ArrowLeft`, `ArrowRight`, `Home`, `End`) support across all 5 menu categories (*Starters*, *Main Courses*, *Pasta*, *Desserts*, *Drinks*) plus real-time dietary tag filtering (*All Items*, *Wood-Fired*, *Vegetarian*, *Gluten-Free*).
- **Interactive Cross-Section Workflows:**
  - Clicking **"View in [Category] →"** on any Signature Dish switches the Full Menu tab to that course and smoothly scrolls to the menu.
  - Clicking **"Prefer This Setting →"** in the Dining Experience section highlights that atmospheric zone and pre-populates the preferred seating note in the Reservation form.
- **Client-Side Reservation Form Validation & Demo Receipt:**
  - Enforces required fields (Name, Email, Phone, Guests, Date, Time).
  - Dynamically calculates the current local date to prevent past dates and checks whether the chosen date falls on a Monday (when the bistro is closed).
  - Includes a **"Fill Sample Guest Details"** helper button for portfolio reviewers and renders a structured **Demonstration Confirmation Receipt** upon valid submission.
- **Client-Side Contact Form & Sample Social Previews:**
  - Validates Name, Email, Topic, and Message length, and displays a transparent demonstration confirmation message.
- **Dynamic Opening Hours Highlight & Back-to-Top Control:**
  - Highlights the current day of the week in the opening hours table and displays a floating back-to-top button after scrolling past the hero section.

### Features Requiring a Backend or Third-Party Service in Production
- **Live Table Inventory & Real Booking Transmission:**
  - Currently, the Reservation form simulates confirmation in the browser. For a real restaurant client, connect the form submission handler in `script.js` to a hospitality booking platform (such as **ResyOS**, **OpenTable**, **SevenRooms**, or **Tock**) or a custom backend API (e.g., Node.js/Express or Next.js + PostgreSQL) with SMS/email confirmation via **Twilio** or **Resend**.
- **Contact Form Email Delivery:**
  - Currently, the Contact form validates inputs client-side without sending an email. For a live deployment on GitHub Pages, point the form to a serverless form endpoint (such as **Formspree**, **Web3Forms**, **Netlify Forms**, or an **AWS Lambda / Cloudflare Worker** route).
- **Content Management System (CMS) for Daily Menu Updates:**
  - Menu items are currently structured in semantic HTML for zero-latency static hosting. For a restaurant manager who wants to update prices or seasonal dishes without editing HTML, connect a headless CMS (such as **Sanity**, **Contentful**, or **Decap CMS**).
