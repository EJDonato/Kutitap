# PRD: Kutitap: AI Day & Week Planner for "Someday" Goals

**Name:** Kutitap (domain: getkutitap.com)
**Status:** Draft v3, Phase 1 MVP scope locked
**Last updated:** 2026-11-25 (v3.3: mascot Titap)

---

## 1. Summary

> **A to-do list app, but it actually gets your "someday" tasks done.**

Kutitap is a planner for people who open their laptop to work, study or build something of their own, then drift to Facebook, TikTok, YouTube, games or email instead.

It plans **from your goals down to the next 25 minutes**:

```
Year goals  →  Weekly plan  →  Daily schedule  →  Focus session
(why)          (what this week)  (when today)       (now)
```

**The MVP core loop:**
1. **Set up** your recurring schedule by typing it ("I work 8-5 Mon-Fri, leave home at 6am"), plus 1-3 goals.
2. **Add tasks** anytime through one chat box.
3. **AI plans** your week in the background and your day every morning. Someday and goal tasks are guaranteed a slot.
4. **Work** with a floating always-on-top focus bar and Pomodoro timer.
5. **Check in** after each block ("Did you finish?"); the app **catches up** automatically when you fall behind.
6. **Daily summary** before bed celebrates what got done.

**Positioning:** *A planner that plans your week around your goals, so the important stuff actually gets done.*

---

## 1b. Brand

**Name:** **Kutitap** (Filipino: the twinkle or flicker of a small light, like Christmas lights). Pronounced koo-too-TAHP.

**Core idea:** most motivation is *ningas cogon*: a cogon grass fire that flares up fast and dies quickly. Kutitap is the opposite: a small light that keeps twinkling, one task at a time.
- Tagline options: *"Hindi na ningas cogon."* / *"Most motivation is ningas cogon. Kutitap keeps your light on."*
- Founder story: "As a Filipino, I've always been ningas cogon with my goals, so I built Kutitap."

**Mascot:** **Titap**, a cute **alitaptap** (firefly): chubby indigo body (#6C74C0), star-sparkle eyes, rosy cheeks, hair tuft, translucent blue wings, and a **glowing golden orb (#FFD966) on the lower belly**. Front-facing base design locked (Nov 2026, AI-generated concepts; to be redrawn as a layered vector before launch: body and glowing orb on separate layers so the glow can be animated in code).

**Glow mechanic (progress, never shame):**
- Each finished block adds glow; **someday and goal tasks add extra glow**; habits done this week keep it steadily lit.
- The daily summary shows how bright it got today.
- **It never goes out.** It dims slowly over days of inactivity (not hours) and brightens quickly on restart (fits catch-up).

**Mascot states (5-8):**
| State | When |
|---|---|
| Sleepy, dim glow | Morning, before starting |
| Focused, steady glow | During a focus session |
| Bright and happy | Block done |
| Sparkling, celebrating | Someday task or goal progress done |
| Calm, reassuring | Catch-up ("Okay lang, I moved it to tomorrow") |
| Cozy, sleepy | Evening summary |

**Where it appears:** onboarding guide, focus bar, check-ins, catch-up notices, daily summary, empty states, social content.

**Sounds** (real fireflies are silent, so sounds are inspired by firefly moments):
| Sound | Used for |
|---|---|
| Soft "blink" pop | Check-ins (short, not annoying) |
| Twinkle chime | Signature sound; block start |
| Rising sparkle | Wins: someday task or goal progress |
| Kuliglig (crickets) ambience | Evening summary |

**Tone:** supportive buddy, never guilt-tripping (survey respondents fear guilt and overwhelm). Taglish is fine in Filipino-facing copy.

**Future idea (not MVP):** "Focus together": friends start focus sessions at the same time and their fireflies blink in sync, inspired by synchronized fireflies in Southeast Asian mangroves (e.g. Iwahig River, Palawan). Ties to *bayanihan*.

**Brand assets checklist:**
- [x] Domain: getkutitap.com (kutitap.com unavailable)
- [ ] Optional: kutitap.app / kutitap.ph
- [ ] Check what's on kutitap.com (parked vs active brand)
- [ ] Social handles: @kutitap or @getkutitap (TikTok, Instagram, Threads, X)
- [ ] Trademark search: IPOPHL + USPTO (software/apps)
- [ ] Email: hello@getkutitap.com
- [x] Mascot name and design: Titap (base, expressions, glow levels done)
- [ ] Redo app icon (full character, original colors, navy background, glow visible)
- [ ] Redo 2 expressions: Focused (looked angry), Cozy sleeping (glow moved to back)
- [ ] Vector redraw with layers (designer)

---

## 2. Problem

- People lose large amounts of time before starting work. In our early survey, 4 of 5 usable respondents lose **1+ hour on a bad day**.
- Tasks **without deadlines** (learning a skill, growing a side project, updating a résumé, planning finances) never get done. Most long-term goals are made of exactly these tasks.
- Existing planners fail for three repeated reasons (survey Q15):
  1. **Too much effort to set up and plan every day**
  2. **Forgot to open the app**
  3. **Too easy to turn off or bypass**
- Users fear **bloated, overwhelming software** and **heavy manual setup**.
- Plans break as soon as the day goes off track, and nothing reschedules them.

---

## 3. Evidence so far

**Validation survey** (Google Form, 9 responses, 5 fully usable, Nov 2026):

| Signal | Result (5 usable) |
|---|---|
| Lose 1+ hour on a bad day | 4 of 5 |
| "Special handling for no-deadline tasks" = Must have | **3 of 5 (strongest feature)** |
| "AI plans my day" = Must have | 0 of 5 |
| Blocking = Must have | 2 of 5 |
| Phone app sync = Must have | 2 of 5 |
| "Very disappointed" without the app | 0 of 5 (2 "somewhat") |
| Would pay $6+/month | 0 of 5 (3 "free only") |
| Prefer one-time lifetime payment | 3 of 5 |

**Implications:**
- Lead with the **someday tasks / goals** outcome. AI is the engine, not the headline.
- **Zero-effort setup** answers the #1 reason people quit planners.
- Keep the product **small and focused**. This drove the v3 scope cut (Section 9).
- Pricing is **unproven**; test payment during the beta (Founding Member offer).
- Schedule view, goals, check-ins, catch-up and summary are **not yet validated**. Test them in the beta.

---

## 4. Target users

| Segment | Why they fit | Priority |
|---|---|---|
| Freelancers and founders | No boss, most important work has no deadline, procrastination costs income | Primary (to validate) |
| Remote / hybrid employees | Laptop all day, fixed work hours to plan around, distracted by email/Slack | Primary |
| Students | High pain, fixed class schedules, low willingness to pay | Secondary (beta users); screenshot import in v1.1 targets them |

**Geography:** Start in the Philippines (Windows + Android majority), open globally from day one. Prices in USD.

---

## 5. Competitive landscape

| App | What it does well | Gap we target |
|---|---|---|
| Sunsama | Guided daily/weekly planning, focus mode | 10-15 min manual ritual; ~$20/mo; no goal breakdown |
| Motion | Automatic AI scheduling | Deadline-driven, rigid, expensive (~$29/mo), bloated |
| Akiflow | Fast capture, time blocking | Manual planning |
| Reclaim | Auto-schedules habits on calendar | Calendar-only, no goals or focus tools |
| Structured / Tiimo | Visual day timeline, AI day drafts | Mostly Apple/mobile; day-focused, no goal → week planning |
| Blitzit | Floating task panel + timer | No AI planning or schedule |
| Freedom / Opal | Blocking | No planning |

**Our wedge:** goals → week → day → focus in one simple app; someday tasks guaranteed a slot; setup from one sentence; automatic catch-up when the day goes wrong; cheaper than Sunsama/Motion.

---

## 6. Planning methods the app is built on

Applied automatically, not shown as jargon in the UI. Can be mentioned on the website ("Built on proven planning methods").

| Method | What it is | How the app uses it |
|---|---|---|
| **Time blocking** | Assign tasks to specific time slots | Today schedule |
| **Big Rocks** (Covey) | Schedule what matters most first | Goal and someday blocks placed before small tasks |
| **Weekly planning** (from GTD's weekly review) | Plan the week, not just the day | Background weekly draft (review screen in v1.1) |
| **Eat the frog** | Do the hardest important task first | Deep / goal work placed in the morning by default |
| **Implementation intentions** | "When X, I'll do Y," well supported by research | Tasks tied to a time and trigger ("After lunch, apply to 1 job") |
| **Pomodoro** | Focus intervals with breaks | Focus timer |

---

## 7. Goals and non-goals

### Goals (Phase 1 MVP)
1. Setup takes **under 5 minutes**: schedule by text, 1-3 goals, a brain dump in chat.
2. Every morning, a realistic **time-blocked schedule** exists before the user opens the app.
3. Someday and goal tasks get scheduled every week and stop rotting.
4. When the day goes off track, the plan **recovers automatically**.
5. Users end the day seeing what they accomplished.
6. The founder uses it daily for 2+ weeks; 5-10 testers use it 3+ days/week.

### Non-goals (Phase 1 MVP)
- Screenshot / image schedule import (v1.1)
- Weekly review screen (v1.1)
- Goal milestones and goal analytics (v1.1+)
- Week view editing / drag and drop (v1.1)
- Separate habit system (habits are recurring tasks in the MVP)
- Push notifications when the app is closed (v1.1)
- Offline mode (later)
- In-app checkout (beta uses a payment link)
- App/website blocking and usage tracking (Phase 2+)
- Two-way calendar sync, teams, native mobile apps

---

## 8. Phases

| Phase | Platform | Scope | Exit criteria |
|---|---|---|---|
| **1. MVP (PWA beta)** | Installable PWA (Chrome/Edge on Mac and Windows, Android, iPhone) | Core loop (Section 9) | Traction targets (Section 16) |
| **1.1 Beta improvements** | PWA | Screenshot import, weekly review screen, editable week view, goal milestones, push when closed, habit progress view | Driven by tester feedback |
| **2. Desktop app** | Tauri 2 (macOS + Windows) | Menu bar / tray, auto-start at login, website + app blocking, Pro subscription | Paying users; retention targets |
| **3. Analytics + mobile** | Tauri + mobile | Usage tracking, block suggestions, goal analytics, 12-week cycles, native mobile with phone blocking | Revenue targets |

---

## 9. Phase 1 MVP features

### Scope decisions (v3 review)

| Feature | Decision |
|---|---|
| Someday tasks | ✅ Keep (core differentiator) |
| Today schedule (timeline + checklist) | ✅ Keep |
| AI setup from text | ✅ Keep |
| AI setup from screenshot | ⏸️ v1.1 |
| Goals | ✂️ Simplified: goals → weekly tasks directly, no milestones |
| Weekly auto-draft | ✅ Keep (runs in the background) |
| Weekly review screen | ⏸️ v1.1 |
| Week view | ✂️ Simplified: view only; changes through chat |
| Task capture + AI chat | 🔀 Merged into one chat box |
| Habits | ✂️ Simplified: recurring tasks with a weekly count |
| Floating focus bar + Pomodoro | ✅ Keep |
| Block check-ins | ✅ Keep |
| Catch-up rescheduling | ✅ Keep |
| Daily summary | ✅ Keep |
| Launch at startup guide | ✅ Keep |
| Accounts + sync | ✅ Keep login + sync; offline later |
| Push when app is closed | ⏸️ v1.1 (in-app alerts only) |
| Founding Member checkout | ✂️ Simplified: external payment link |

### 9.1 Onboarding (target: under 5 minutes)
1. Sign in.
2. **Goals:** "What are 1-3 things you want to achieve this year?" (skippable).
3. **Fixed schedule by text:** e.g. "I work 8am-5pm Mon-Fri and leave the house by 6am on workdays."
4. **Preferences:** wake/sleep time, preferred deep-work time.
5. **Brain dump in chat:** type everything on your mind; AI sorts it into tasks.
6. **Install + startup:** install the PWA and enable "start when you sign in."
7. See today's schedule.

### 9.2 AI schedule setup (text)
- **F2.1** Plain-language input → recurring fixed blocks (e.g. Commute 6:00-8:00, Work 8:00-17:00, Mon-Fri).
- **F2.2 Preview and confirm** in a week preview before saving. Never save without confirmation.
- **F2.3** Unclear parts are highlighted for the user to check.
- **F2.4** Fixed blocks can be added or changed anytime through chat or Settings.
- **F2.5** One-off exceptions ("No work on Dec 8," "Half day Friday").
- **Acceptance:** typical descriptions are parsed correctly (after at most minor edits) in 90%+ of internal tests.

### 9.3 Goals (simplified)
- **F3.1** 1-3 active yearly goals (free text).
- **F3.2** AI suggests **weekly tasks** for each goal (no milestones in MVP); user approves or edits in chat.
- **F3.3** Goal-linked tasks show their goal (tag/color).
- **F3.4** Goal tasks are treated as someday tasks (9.6).
- **Example:** "Get a remote job" → this week: "Update résumé (60 min)," "Apply to 3 jobs (3 x 30 min)."

### 9.4 Weekly plan (background)
- **F4.1** Every Sunday evening (configurable), the AI drafts next week: fixed blocks, deadlines, goal tasks, someday tasks, recurring tasks/habits.
- **F4.2 Big Rocks first:** goal and someday blocks placed before low-priority tasks.
- **F4.3** The draft applies automatically; no review needed.
- **F4.4 Week view (read-only):** seven columns to see the week; changes are made through chat ("Move portfolio work to Thursday").

### 9.5 Today schedule
- **F5.1** A **time-blocked timeline** for today: fixed blocks, tasks, recurring tasks, breaks, buffer time.
- **F5.2** Generated from the weekly plan and ready before the first open (scheduled job, default 4:00 AM local).
- **F5.3** Deep / goal work placed in the user's best focus time (morning by default).
- **F5.4** Planned time never exceeds free time; 10-15% buffer kept.
- **F5.5** Compact **checklist mode** of the same plan.
- **F5.6** One-tap actions on each block: **Start**, **Done**, **Skip**.
- **F5.7** Trigger lines when useful ("After lunch: apply to 1 job").

### 9.6 Someday (no-deadline) tasks (core differentiator)
- **F6.1 Aging:** track "days waiting" since creation or last progress.
- **F6.2 Soft deadlines:** auto-assigned target dates based on size and age; visible and adjustable.
- **F6.3 Guaranteed slot:** at least one someday/goal block per weekday (default 30-60 min, configurable).
- **F6.4 Chunking:** large tasks split into small first steps.
- **F6.5 Rotation:** if skipped 3 times, ask: shrink, reschedule or drop. No guilt language.
- **Acceptance:** every active someday task gets at least one scheduled block per week.

### 9.7 AI chat (single input for everything)
- **F7.1** One chat box on every screen for adding and changing things:
  - Tasks: "Study for exam Friday, about 3 hours"
  - Fixed events: "Dentist Thursday 2pm"
  - Changes: "Move gym to tomorrow," "Replan my day"
  - Questions: "What's left today?", "When am I free this week?"
- **F7.2** AI parses title, duration, deadline, type (deadline / someday / recurring), linked goal, energy (deep / light).
- **F7.3** Shows a **preview of changes** before applying ("I put 'Study' in 3 x 1-hour blocks, Tue-Thu mornings. OK?").
- **F7.4** Short and action-focused (not open-ended conversation) to control AI cost.

### 9.8 Habits (as recurring tasks)
- **F8.1** A habit is a recurring task with frequency (daily / X per week / specific days) and an optional fixed time or preferred time of day.
- **F8.2** Shown in the schedule; checked off like any block.
- **F8.3** Forgiving weekly count ("4 of 5 this week"), shown in the daily summary.
- **F8.4** Missed habits don't stack up.

### 9.9 Focus bar and Pomodoro
- **F9.1** "Start" on any block opens a **floating always-on-top window** (Document Picture-in-Picture API): current block, countdown, Done, Skip, Next.
- **F9.2** Timer stores the **end time**, not a running count, so it stays accurate when minimized or asleep.
- **F9.3** Pomodoro defaults 25/5, long break after 4; configurable.
- **F9.4** Actual time per task recorded to improve future estimates.
- **F9.5** Fallback for Safari/unsupported browsers: in-app focus view.
- **F9.6** Alerts via in-app sound and browser notification while the app is open or minimized.
- **Note:** the floating window opens only on a user click and usually closes if the main window is closed.

### 9.10 Block check-ins
- **F10.1** When a block ends, ask **"Did you finish [task]?"** with tap buttons:
  - **Done:** mark complete; next block starts.
  - **Need more time (+15 / +30 / +60 min):** extend and shift the day.
  - **Partly done:** remaining work becomes a smaller follow-up task.
  - **Skipped:** move to a later slot or another day.
- **F10.2** Shown in the floating focus bar first; browser notification if the app isn't in front.
- **F10.3** If ignored, ask once at the next natural break; no nagging.
- **F10.4** Answers improve future duration estimates.

### 9.11 Catch-up rescheduling
- **F11.1** Triggered by check-ins, by falling behind, or by "Replan my day" in chat.
- **F11.2** Rules, in order:
  1. Keep fixed blocks and deadline tasks due today in place.
  2. Use buffer time first.
  3. Move lower-priority tasks to later today or tomorrow.
  4. Shrink before dropping (60 min goal block becomes 30 min).
  5. Never cram: no skipped breaks, nothing past sleep time.
- **F11.3** Small changes apply automatically with a short notice; big changes ask first ("You're 2 hours behind. Move 'Write blog post' and 'Gym' to tomorrow?").

### 9.12 Daily summary
- **F12.1** Shown when the last block ends or at a set evening time.
- **F12.2** Leads with wins: blocks done, focused time, goal progress, someday tasks moved forward, habits.
- **F12.3** Missed items are quietly rescheduled, not listed as failures.
- **F12.4** No harsh scores; comparisons only against the user's own history.
- **F12.5** Preview of tomorrow's first block.
- **F12.6** Optional: "Anything on your mind for tomorrow?" (goes into chat as a brain dump).
- **Example:**
  > **Nice work today** · 6 of 8 blocks done · 4h 20m focused
  > Goal "Get a remote job": résumé updated
  > Someday task moved forward: "Learn Figma," 30 min
  > Tomorrow starts with: "Apply to 3 jobs" at 9:00

### 9.13 Launch at startup
- **F13.1** Onboarding guides users to enable "Start app when you sign in" (Chrome/Edge: `about://apps` → right-click app → "Start app when you sign in").
- **F13.2** App opens directly to Today.

### 9.14 Accounts and sync
- Email/Google sign-in; data syncs across devices (laptop + phone PWA).

---

## 10. Information architecture

| Screen | Purpose |
|---|---|
| **Today** | Timeline + checklist toggle; Start focus; check-ins |
| **Week** | Read-only seven-day view |
| **Goals** | 1-3 goals and their linked tasks |

Plus: **chat box** on every screen; **daily summary** (evening); Settings (fixed schedule, preferences, account).

---

## 11. Planning logic (v1, rule-based + AI)

Scheduling is **deterministic**; AI is used for parsing, estimating, goal → weekly tasks, chunking and summary text.

**Weekly draft:**
1. Lay down **fixed blocks** (work, classes, commute, sleep window).
2. Place **fixed-time recurring tasks/habits**.
3. Place **deadline tasks** by urgency: `urgency = estimated_minutes / minutes_until_deadline`.
4. Place **Big Rocks**: goal tasks and someday blocks, spread across days, in deep-work slots.
5. Place **flexible recurring tasks/habits** in matching time-of-day slots.
6. Fill remaining time with lower-priority tasks; leave 10-15% buffer; never overfill.

**Daily schedule:** today's slice of the weekly plan + carry-overs, re-checked for load, with breaks and buffers.

**Catch-up:** rules in 9.11.

**Someday selection:** `someday_score = days_waiting x size_weight + soft_deadline_proximity + goal_link_bonus`.

---

## 12. Technical approach

### Phase 1 (PWA)
| Layer | Choice | Notes |
|---|---|---|
| Frontend | React + TypeScript + Tailwind | Same code moves into Tauri in Phase 2 |
| Schedule UI | Timeline component (custom or e.g. FullCalendar) | Day timeline + read-only week view |
| PWA | Web App Manifest + Service Worker | Installable |
| Floating focus bar | Document Picture-in-Picture API | Chrome/Edge 116+, Firefox 151+; not Safari, fallback required |
| Backend / auth / DB | Supabase (Postgres, Auth, Realtime) | |
| AI | Server-side functions calling an LLM API | Text parsing, goal → tasks, chunking, summaries. **API key never shipped to the client**; per-user rate limits |
| Scheduled jobs | Cron per user timezone | Weekly draft (Sunday) + daily schedule (early morning) |
| Notifications | Browser Notification API while app is open/minimized | Server Web Push in v1.1 |
| Payments (beta) | External payment link (Lemon Squeezy or Paddle) | Founding Member one-time purchase; in-app checkout later |
| Hosting | Vercel / Netlify / Cloudflare Pages | |
| Analytics | Privacy-friendly product analytics (e.g. PostHog) | Activation and retention only |

### Phase 2 (Desktop)
- **Tauri 2** wrapping the same frontend.
- Native: menu bar (macOS) / tray + always-on-top mini window (Windows), auto-start, website and app blocking, global shortcut.
- Distribution: Microsoft Store (free signing) and notarized macOS build (Apple Developer Program, $99/yr, organization account to show brand name).

### Data model (MVP)
- `users` (id, timezone, wake_time, sleep_time, deep_work_pref, settings)
- `goals` (id, user_id, title, year, status, color)
- `fixed_blocks` (id, user_id, title, days_of_week, start_time, end_time, location, source[text|manual], valid_from, valid_to)
- `block_exceptions` (id, fixed_block_id, date, type[skip|change], new_start, new_end)
- `tasks` (id, user_id, goal_id, title, type[deadline|someday|recurring], recurrence_rule, preferred_period, est_minutes, due_at, soft_due_at, days_waiting, energy, status, parent_task_id, trigger_text)
- `week_plans` (id, user_id, week_start, drafted_at)
- `plan_blocks` (id, week_plan_id, date, ref_type[task|fixed], ref_id, start_at, end_at, status[pending|done|partial|skipped|moved])
- `check_ins` (id, plan_block_id, answer[done|more_time|partial|skipped], extra_minutes, answered_at)
- `focus_sessions` (id, user_id, plan_block_id, started_at, ends_at, ended_at, completed)
- `daily_summaries` (id, user_id, date, stats_json, note)
- `chat_messages` (id, user_id, role, content, applied_changes_json, created_at)

(v1.1 adds `milestones`, `schedule_imports` for images, `week_reviews`.)

---

## 13. AI model choice and cost

**Principle:** scheduling is rule-based; AI is used only for parsing, estimating, goal → tasks, chunking and short summaries. Use the cheapest model that does each job well.

**Model routing (OpenAI, prices per 1M tokens; from third-party trackers, Oct-Nov 2026; confirm on OpenAI's pricing page before building):**

| Job | Model | Input | Output |
|---|---|---|---|
| Chat task parsing, daily summaries, chunking | GPT-6 Luna (cheapest) | $0.10 | $0.50 |
| Weekly drafts, goal → weekly tasks | GPT-5.4 mini | $0.75 | $4.50 |
| Screenshot parsing (v1.1, vision) | GPT-6.1 Terra or another vision-capable model | $1.00 | $5.00 |

**Estimated usage per active user per month:**

| Job | Approx. tokens (input / output) |
|---|---|
| Chat parsing (~10 messages/day) | ~240K / 45K |
| Daily schedule text, chunking, summaries | ~60K / 15K |
| Weekly drafts + goal tasks (4x) | ~16K / 6K |
| Catch-up replans and regenerations | ~60K / 16K |
| **Total** | **~0.4M / ~0.1M** |

**Estimated cost per active user per month:**
- All Luna: ~$0.09
- **Mixed routing (target): ~$0.20-0.30**
- All mini: ~$0.75
- Heavy users may cost 2-3x more.

**Runway on $50 of existing OpenAI credits:**

| Scenario | Luna (~$0.09/user) | Mixed (~$0.25/user) | Mini (~$0.75/user) |
|---|---|---|---|
| Founder only | Years | ~16 years | ~5 years |
| Founder while developing (heavy testing) | Many months | Several months to a year | A few months |
| 20 beta testers | ~2 years | ~10 months | ~3 months |
| 100 active users | ~5 months | ~2 months | ~3 weeks |
| 500 active users | ~1 month | ~2 weeks | ~4 days |

**Cost controls:**
- Use the **lowest reasoning setting** for simple jobs; hidden reasoning tokens are billed as output.
- Catch-up rescheduling is **rule-based** (no AI call needed for most replans).
- Keep system prompts short and stable to benefit from **cached input** pricing.
- Set a **monthly spending cap** in the OpenAI dashboard.
- **Per-user limits** in the app (free tier: capped chat messages/regenerations per day).
- Log token usage per user and per job.
- Check the **expiry date** of existing credits; spend them on development and beta first.

**Unit economics check:** at ~$0.25/user/month in AI cost, a $5/month Pro plan keeps a healthy margin after payment fees (~5-8%) and hosting.

---

## 14. Privacy and trust
- Collect only what's needed: schedule, tasks, goals, plans, check-ins, focus sessions.
- No selling or sharing of data; clear privacy page.
- AI requests send only the text needed for the task.
- Phase 2+ blocking and usage tracking processed **on-device** by default, with a clear explanation of why it's safe.
- Account deletion and data export from day one.

---

## 15. Launch and monetization

**Strategy:** landing page with demo → **14-day free trial** of Pro → buy (Founding Member or subscription) or continue on the free plan → paid desktop app later.

### 15.1 Landing page
1. Headline: "Your someday tasks, finally done." Supporting line: "Hindi na ningas cogon." Mascot shown glowing.
2. Short demo video/GIF: onboarding, today's schedule, a check-in, the daily summary.
3. 3 screenshots with one-line captions.
4. How it works: set up your schedule → AI plans your week → check in and catch up.
5. Call to action: **"Start your 14-day free trial, no card needed."**
6. Founding Member offer, visible but not pushy: "Early supporters: lifetime access for $29."
7. Short FAQ: privacy, devices, what happens after the trial, refund/shutdown policy.

### 15.2 Free trial
- **Length: 14 days** of full Pro. Covers two weekly cycles (two weekly drafts, ~10 workdays of check-ins and summaries). 7 days is too short to see a weekly cycle; 30 days delays payment signals and trials get forgotten.
- **No card required** at sign-up (more trial users = more learning during validation; revisit later).
- **Trial timeline:**

| Day | User sees | We learn |
|---|---|---|
| 1 | Onboarding: schedule, goals, first plan | Setup time, drop-off |
| 1-7 | Daily plans, check-ins, summaries | Do they follow the plan? |
| 7 | One question: "How would you feel if you could no longer use this?" | "Very disappointed" score |
| 10 | "4 days left" with their own wins ("You finished 3 someday tasks this week") | |
| 12-14 | Choice screen: Founding Member / Pro subscription / continue free, leading with their wins | Trial-to-paid conversion |
| After | Free plan; one follow-up email to non-buyers: "What would have made it worth paying for?" | Why people don't buy |

- **After the trial,** users are never locked out: they drop to the free plan, so retention can still be measured.
- AI cost per trial user: roughly $0.10-0.30 for two weeks (Section 13).

### 15.3 Plans (hypothesis)
| Plan | Price | Includes |
|---|---|---|
| **Free** | $0 | 1 goal, schedule setup, daily/weekly plan, someday tasks (limited), check-ins, daily summary, capped AI |
| **Pro** | ~$5-8/month or yearly | Up to 3 goals, unlimited AI chat and replans, focus bar, sync; later blocking and analytics |
| **Founding Member** | One-time ~$29-49 | Lifetime Pro, including the desktop app when it launches |

### 15.4 Founding Member terms and safeguards
- **Definition:** "Lifetime access to Pro for as long as Kutitap is running." Stated plainly on the offer and in the terms.
- **Shutdown promise:** full refund if we shut down within 12 months of purchase; after that, at least 60 days' notice and data export.
- **Fair use:** AI usage limited to normal personal use.
- **Seat cap:** first 100 Founding Members.
- **Timing:** sell after Checkpoint 2 (testers using it for at least a week), so the offer is backed by evidence.
- **Money:** keep Founding Member revenue in a separate account, unspent, until Checkpoint 3 passes or for the first 12 months.
- **If it fails** (best option first): maintenance mode (low running cost for a small group) → refunds → hand over or release the code → shut down with notice and data export.
- Check local consumer rules for advance payments before selling (not legal advice).

### 15.5 Payments
- Sold directly on our site (no app store cut) via an **external payment link** in the beta (Lemon Squeezy / Paddle as merchant of record: global tax and easy refunds); Pro unlocked by webhook or manually.
- Local provider (PayMongo / HitPay / Xendit) for GCash/Maya later.
- Register the business locally before charging.

---

## 16. Success metrics

**Phase 1 beta (4-6 weeks)**
| Metric | Target |
|---|---|
| Onboarding completed in under 5 min | 70%+ of sign-ups |
| Text schedule setup accepted with minor or no edits | 90%+ |
| Founder daily use | 14 of 14 days |
| Weekly active users | 100+ |
| Still active after 4 weeks | 25-30%+ |
| Someday/goal blocks completed per active user per week | 2+ |
| Check-ins answered (of blocks ended) | 60%+ |
| Daily summary viewed (of active days) | 50%+ |
| Median time from open to first block started | < 2 min |
| "Very disappointed" if it disappeared | 40%+ |
| Founding Member purchases | 20+ |
| Trial to paid (any plan), no card required | 5-10%+ |
| Still active on free plan 4 weeks after trial | Track (lasting value without payment) |

**Go to Phase 2** when most targets are met and users repeatedly ask for desktop features (menu bar, auto-start, blocking).

---

## 17. Risks and mitigations
| Risk | Mitigation |
|---|---|
| Low willingness to pay | Founding Member offer during beta; target freelancers/founders; keep AI costs low |
| Scope creep / bloat | v3 MVP cut; three screens + one chat box; deferred list in Section 7 |
| AI plans feel wrong | Rule-based scheduler; preview before changes; learn from check-ins and actual durations |
| Check-ins feel naggy | Tap buttons, shown in focus bar, ask once if ignored |
| Catch-up moves too much | Small changes auto, big changes ask first; never cram |
| Users forget to open the app | Startup launch, morning notification, floating bar |
| PWA limits (no tray, Safari PiP, no push when closed) | Fallbacks; push in v1.1; move to Tauri in Phase 2 |
| AI cost per user | Model routing + caps (Section 13); rule-based catch-up; spending cap |
| Competitors copy features | Move fast; own the "someday goals" message; build community early |

---

## 18. Open questions
2. Default someday/goal block length (30 vs 60 min)?
3. Weekly draft timing: Sunday evening or Monday morning?
4. Calendar import (Google Calendar read-only): v1.1 or later?
5. How many goals in the free plan (1 vs 3)?
6. Founding Member price ($29 vs $49)?
7. Which segment to focus marketing on: freelancers, founders or remote employees?

---

## 19. Milestones (Phase 1 MVP)
| Week | Deliverable |
|---|---|
| 1 | Auth, data model, PWA install; fixed blocks + **AI setup from text**; Today timeline |
| 2 | **AI chat** (tasks, events, changes) with preview; someday logic; recurring tasks/habits |
| 3 | Goals → weekly tasks; rule-based weekly draft + daily schedule (scheduled jobs); read-only Week view |
| 4 | Floating focus bar + Pomodoro; **check-ins**; **catch-up rescheduling** |
| 5 | **Daily summary**; onboarding with startup setup; 14-day trial logic + free plan limits; landing page; payment link; polish; beta launch |
| 6+ | Founder daily use + testers; measure Section 16; plan v1.1 from feedback |

**Deferred to v1.1 (in priority order, adjust from feedback):** screenshot import, push when closed, weekly review screen, editable Week view, goal milestones, habit progress view.
