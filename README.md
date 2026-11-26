# Kutitap: landing page (getkutitap.com)

Static export of the Kutitap waitlist landing page, designed in Claude Design. Plain HTML + inline CSS, no build step, no JavaScript. Open `index.html` in a browser to view it.

## Run the app (demo)

```
cd app && npm install && npm run dev   # http://localhost:5173
npm test                               # scheduler tests, from the repo root
```

The Today screen plans a sample day with the real scheduler (`supabase/functions/_shared/scheduler`). No backend yet: nothing is saved.

## Files

```
index.html                       The landing page (single file, inline styles)
assets/
  kutitap-icon.png               Nav logo + favicon (128x128, transparent corners)
  titap-hero.png                 Titap mascot in the hero (soft-faded edges for dark bg)
  titap-glow-levels.png          "Meet Titap" section: 4 glow levels
  *-original.jpg                 Original AI-generated mascot art (source files)
docs/
  PRD.md                         Product requirements (v3.3)
  VALIDATION.md                  Validation plan and checkpoints
```

## Design tokens

| Token | Value | Use |
|---|---|---|
| Background | `#0E1A2B` | Page |
| Background, alt sections | `#0A1422` | Story, Features |
| Surface | `#162438` | Cards |
| Surface, raised | `#1A2A40` / `#1E3049` | Schedule rows |
| Border | `#24364F` / `#33496A` | Cards, inputs |
| Text | `#F5F1E6` | Headings, body |
| Text, muted | `#C9D2E0` / `#AEB9CB` | Paragraphs, labels |
| Accent (glow) | `#FFD966` (`--accent`) | CTAs, eyebrows, highlights |
| Text on accent | `#1A1405` | Button labels |
| Someday tag | `#B8E986` | "Someday task" pill |
| Mascot body | `#6C74C0` | Titap |

- **Fonts:** Outfit 500/600/700 (headings), Inter 400/500/600 (body), from Google Fonts.
- **Radii:** 12px inputs/buttons, 14-24px cards, 999px pills.
- **Layout:** max-width 1160px containers, 24px side padding, 96px section padding. Flex-wrap and `auto-fit` grids, so it works down to phone width.

## Page sections (in order)

1. Nav: icon + wordmark, links (How it works, Features, FAQ), "Join the waitlist" button
2. Hero: "Hindi na ningas cogon." / "Your someday tasks, finally done." + email form; Today schedule preview with a check-in card; Titap mascot
3. Story: the ningas cogon explanation
4. How it works: 3 steps
5. Features: 4 items
6. Meet Titap: glow levels image
7. Founding Member offer ($29 lifetime, first 100)
8. FAQ: 4 questions
9. Footer: email + privacy link

## To do before going live

- [ ] **Hook up the waitlist form** (`<form id="waitlist">`). It currently submits nowhere. Options: Supabase table insert, a form service, or the email tool you'll use for the beta. Add success and error states.
- [ ] **Privacy page:** footer link points to `#privacy` (placeholder).
- [ ] **Mascot assets:** replace the soft-faded JPG-based PNGs with transparent PNG/SVG once the vector redraw is done. The app icon is a temporary version (see PRD Brand checklist).
- [ ] **Founding Member price:** $29 is the test price from the PRD; confirm before launch.
- [ ] Analytics (privacy-friendly, e.g. PostHog) to measure waitlist conversion for VALIDATION.md Checkpoint 1.
- [ ] Optional: split into components if moving to React/Next.js (the PRD's app stack is React + TypeScript + Tailwind; tokens above map directly to a Tailwind theme).
- [ ] Optional: A/B test the headline ("Your someday tasks, finally done." vs "An AI that plans your day.") per VALIDATION.md.

## Notes for a coding agent

- Keep the copy and tone: supportive, never guilt-tripping; Taglish lines are intentional.
- Keep accessibility as-is: real `<label>` on the email input, `<button>`/`<a>` for actions, alt text on images, 44px+ touch targets.
- All styles are inline for portability; when porting, move them to classes or Tailwind but keep the values.
