# Shubham Vikral — Portfolio (React + Vite)

Fully responsive portfolio with mobile-first layouts, real photo support, and zero deprecated warnings.

---

## Getting Started

```bash
npm install
npm run dev        # → http://localhost:5173
```

## Build for Production

```bash
npm run build      # outputs to dist/
npm run preview    # preview production build locally
```

## ── Adding Your Photo ────────────────────────────────

1. Copy your photo into `src/assets/`
2. Name it `profile.jpg`  (or `.png` / `.webp`)
3. Done — it will automatically appear in the About section.

If you use a different filename, edit line 6 of `src/components/About.jsx`:
```js
import profileImg from '../assets/YOUR-PHOTO-NAME.jpg'
```

A warm-toned placeholder is included by default so the layout renders
correctly until you replace it.

---

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| < 768px   | Mobile — single column, compact padding, mobile nav drawer |
| 768–1099px | Tablet — two columns where appropriate, medium padding |
| ≥ 1100px  | Desktop — full layout, custom cursor, stats panel |

---

## Deploy

Drop `dist/` on any static host:

- **Netlify** — drag & drop `dist/`
- **Vercel** — `vercel --prod` (auto-detects Vite)
- **GitHub Pages** — add `base: '/repo-name/'` to `vite.config.js`

---

## Project Structure

```
index.html                ← Vite entry (at root)
vite.config.js
src/
  main.jsx
  App.jsx
  index.css               ← CSS variables, animations, global resets
  assets/
    profile.jpg           ← ← ← REPLACE WITH YOUR PHOTO
  hooks/
    useFadeIn.js          ← Intersection Observer scroll-reveal
    useResponsive.js      ← Window width → isMobile / isTablet / isDesktop
  components/
    Cursor.jsx            ← Hidden automatically on mobile/touch
    Nav.jsx               ← Desktop links + hamburger mobile drawer
    Hero.jsx
    Marquee.jsx
    About.jsx             ← Real <img> tag — update profile.jpg
    Skills.jsx
    Experience.jsx
    Work.jsx
    MoreProjects.jsx
    Services.jsx
    Why.jsx
    Process.jsx
    Testimonials.jsx
    Contact.jsx
    CTA.jsx
    Footer.jsx
    Icons.jsx
```

## Customisation

- **Colors** — CSS variables in `src/index.css`
- **All content** — arrays / objects at the top of each component file
- **Contact form** — wire up to EmailJS or Formspree in `Contact.jsx`
