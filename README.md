# homepage-2026
My first personal website. After all, it is just a résumé

# 📄 Matveichenko Vladislav — Personal Résumé

> A dark, editorial-style personal résumé website with smooth animations, a command palette terminal, and a custom cursor — built with vanilla HTML, CSS, and JavaScript.

**Author:** [Matveichenko Vladislav](https://www.linkedin.com/in/matveichenko-vladislav-71192a303)

---

## ✨ Features

- **Animated hero section** — full-viewport intro with grid overlay and parallax number
- **Scroll reveal animations** — elements fade and slide in as you scroll
- **Animated skill bars** — fill on scroll into view
- **Custom cursor** — gold dot with a lagging ring follower
- **Scroll progress bar** — thin gold line at the top of the page
- **Command palette terminal** — open with `` ` ``, `Ctrl/Cmd+K`, or `Win+R`
- **Help Ukraine widget** — embedded support widget
- **Fully responsive** — mobile-friendly layout
- **Print / PDF ready** — clean print styles

---

## 🖥️ Command Palette

Press `` ` `` / `Ctrl+K` / `Cmd+K` to open the terminal overlay.

| Command | Shortcut | Action |
|---|---|---|
| 📁 Open Projects | `P` | Scroll to experience section |
| 📬 Contact | `C` | Open LinkedIn profile |
| 🎌 Random Anime Quote | `Q` | Display a random anime quote |
| 🖨️ Print / Save CV | `D` | Open browser print dialog |
| 🥚 Easter Egg | `E` | 👀 |

Navigate with `↑ ↓`, confirm with `Enter`, close with `Esc`.

---

## 🗂️ Project Structure

```
/
├── index.html          # Main page markup
├── styles.css          # All styles (layout, animations, themes)
├── index.js            # Cursor, scroll reveal, skill bars, parallax
├── terminal.js         # Command palette logic
└── assets/
    └── avatar.png      # Profile photo
```

---

## 🚀 Getting Started

No build step, no dependencies — just open the file.

```bash
git clone https://github.com/m1liaron/<repo-name>.git
cd <repo-name>

# Option 1 — open directly
open index.html

# Option 2 — local dev server (recommended, avoids CORS on assets)
npx serve .
# or
python -m http.server 8080
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, keyframes, grid, flexbox) |
| Logic | Vanilla JavaScript (ES6+, IntersectionObserver) |
| Fonts | Google Fonts — Cormorant Garamond, Syne, DM Mono |
| Widget | [Help Ukraine Win](https://helpukrainewinwidget.org) |

---

## 📐 Sections

| # | Section | Description |
|---|---|---|
| 01 | **Hero** | Name, title, LinkedIn contact |
| 02 | **About** | Bio and personal info grid |
| 03 | **Skills** | Animated bars — Web, Backend, Professional |
| 04 | **Experience** | Projects grouped by Frontend / Full-Stack / Mobile |
| 05 | **Additional** | Awards, interests, certifications |
| — | **Footer** | Email, LinkedIn, GitHub |

---

## 🎨 Customization

All colors are CSS custom properties in `styles.css`:

```css
:root {
  --bg:       #0e0e0e;   /* page background    */
  --gold:     #c9a84c;   /* primary accent      */
  --accent:   #e8c96d;   /* bright gold         */
  --text:     #e8e2d5;   /* body text           */
  --muted:    #8a8070;   /* secondary text      */
}
```

To swap your own content, update the relevant sections in `index.html`. Skill bar percentages are driven by the `data-pct` attribute:

```html
<div class="skill-bar-fill" data-pct="75"></div>
```

---

## 📬 Contact

- **Email:** machinker34@gmail.com
- **LinkedIn:** [matveichenko-vladislav-71192a303](https://www.linkedin.com/in/matveichenko-vladislav-71192a303)
- **GitHub:** [m1liaron](https://github.com/m1liaron)

---

## 🇺🇦 Support Ukraine

This site includes the [Help Ukraine Win](https://helpukrainewinwidget.org) widget.
If you'd like to support Ukraine, please visit [United24](https://u24.gov.ua).

---

© 2026 Matveichenko Vladislav — All rights reserved