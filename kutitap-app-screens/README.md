# Kutitap app screens: design reference

Static HTML mockups of the Kutitap PWA (desktop and mobile). They are a **visual reference** to build the real app from, not production code. Open `index.html` in a browser to see every screen. Buttons and nav link between screens.

Product context lives in `docs/PRD.md` (features, data model, planning logic) and `docs/VALIDATION.md`.

## Screens

`screens.json` lists every screen with its frame size. Desktop screens are 1440×900 and fluid (they wrap at narrow widths). Mobile screens are fixed 390×844. The focus bar is 440×600.

| Area | Files |
|---|---|
| Core app (desktop) | `desktop-today`, `desktop-week`, `desktop-goals`, `desktop-summary` |
| Floating focus bar (Document Picture-in-Picture window) | `focus-bar` (running state + check-in state) |
| Core app (mobile) | `mobile-today`, `mobile-chat`, `mobile-summary` |
| Onboarding (desktop), in order | `onb-welcome` → `onb-goals` → `desktop-onboarding` (schedule) → `onb-someday` → `onb-ready` |
| Onboarding (mobile), in order | `m-onb-welcome` → `m-onb-goals` → `m-onb-schedule` → `m-onb-someday` → `m-onb-ready` |

The mobile Week and Goals tabs aren't drawn yet. Base them on the desktop versions.

## Design tokens

```css
:root {
  /* surfaces */
  --bg: #0E1A2B;          /* app background */
  --bg-alt: #0A1422;      /* sidebar, mobile tab bar */
  --surface: #162438;     /* cards, inputs */
  --raised: #1A2A40;      /* items inside cards */
  --raised-2: #1E3049;    /* active nav, current block */
  --block: #182A42;       /* timeline blocks */
  --block-done: #142236;  /* finished / passive blocks */
  --border: #24364F;
  --border-strong: #33496A;

  /* text */
  --text: #F5F1E6;
  --text-muted: #C9D2E0;
  --text-subtle: #AEB9CB;

  /* accents */
  --accent: #FFD966;      /* Titap glow: primary buttons, progress, focus */
  --on-accent: #1A1405;
  --someday: #B8E986;     /* "Someday" tag = no-deadline task */
  --deadline: #FFB86B;    /* due soon, partly done, skipped warnings */
  --now-line: #FF8A65;    /* current-time line on the timeline */

  /* check-in card (light card that stands out on dark) */
  --checkin-bg: #F5F1E6;
  --checkin-text: #14213A;
  --checkin-muted: #4A5670;
  --checkin-border: #9AA6B8;
}
```

**Type:** Outfit 600/700 for headings and numbers, Inter 400/500/600 for everything else (Google Fonts).
**Radii:** 8–10px buttons and small items, 12–14px blocks, 16–18px cards, 99px pills.
**Touch targets:** at least 44px tall.

## Key UI patterns

- **Check-in card** ("Did you finish X?"): always the light card. Options are Done / +15 / +30 / +60 / Partly done / Skipped (see PRD 9.x).
- **Someday tag:** green pill on any task with no deadline. It also shows how long the task has waited ("waited 41 days").
- **Type-and-preview onboarding:** a free-text box on the left, and on the right an "Here's what I understood" panel that updates live and asks at most one follow-up question.
- **Chat box:** pinned at the bottom of Today and Week (desktop) and of the mobile Today screen. It's the only way to add or change tasks.
- **Titap mood images** (`assets/`): base = glowing/idle, happy = welcome/schedule, focused = timer/goals, calm = check-in/suggestions, sleepy = someday prompt, sleeping = empty states, celebrate = daily summary/week ready.

## Notes for implementation

- The mockups use inline styles so they open with no build step. In the real app, turn the tokens above into Tailwind theme values and build components (Sidebar, TimelineBlock, CheckInCard, ChatBox, SomedayTag, OnboardingStep) instead of copying the markup.
- All copy and data in the mockups are sample content (a freelancer persona).
- The mascot PNGs are raster cutouts from the concept art. A vector redraw is still on the to-do list.
