# Validation Plan: AI Day & Week Planner for "Someday" Goals

**Companion to:** PRD.md (v3)
**Last updated:** 2026-11-24
**Approach:** validate while building. Every week of the 5-week MVP build runs at least one validation experiment in parallel. Three checkpoints decide whether to **keep going**, **pivot** or **stop**.

---

## 1. Riskiest assumptions

| # | Assumption | Current evidence | Status |
|---|---|---|---|
| A | People really struggle with "someday" tasks and care enough to fix it | Survey: 4 of 5 lose 1+ hr on bad days; 3 of 5 rate someday handling "Must have" | Partly supported |
| B | **People will follow a schedule the AI made for them, day after day** | None | Untested, biggest product risk |
| C | Someday-task handling is what makes it valuable (not just another planner) | 3 of 5 "Must have" (small sample) | Early signal |
| D | People will pay | 0 of 5 chose $6+/mo; 3 of 5 prefer lifetime | Weak |
| E | We can reach target users cheaply and anonymously | Slow survey responses; Reddit/FB rules | Weak |
| F | The founder will use it every day | None | Untested |

Work on the weakest (B, D, E, F) first.

---

## 2. Experiments, week by week

| Week | Building (PRD Section 19) | Validating in parallel | Tests |
|---|---|---|---|
| 0-1 | Auth, data model, text schedule setup, Today timeline | **Waitlist landing page** with two headlines: "Your someday tasks, finally done" vs "An AI that plans your day." Compare sign-up rates | A, C, E |
| 0-1 | | **Manual test (concierge) with 3-5 people:** collect their schedule and goals, plan their days by hand in Google Calendar, check in by message after blocks ("Did you finish?"). Run for 1 week from the brand account | B, C |
| 1-2 | AI chat, someday logic, recurring tasks | **Founder daily use** of the rough version; log every skipped or ignored block and why | F, B |
| 1-2 | | **Price test** on the landing page: "Founding Member, $29 one-time" button. Real pre-orders, or "Coming soon, join the list" and count clicks | D |
| 2 | | **2-minute survey for founders and freelancers only** (pricing and lifetime vs monthly) | D |
| 3-4 | Goals, weekly/daily plans, focus bar, check-ins, catch-up | **Closed alpha with 5-10 testers** (waitlist + 3 survey emails). Track daily use, check-in rate, someday blocks done; short weekly chat feedback | B, C |
| 5-8 | Daily summary, onboarding, payment link, beta launch | **Open beta + Founding Member sales.** After 2 weeks of use, ask: "How would you feel if you could no longer use it?" | A-E |

**Why the manual test matters most:** if people won't follow a schedule you hand-made for them, they won't follow an AI-made one either. It tests the biggest risk (B) in week 1 instead of week 6, with no code.

### Concierge test script (week 0-1)
1. Recruit 3-5 people from the waitlist or survey emails ("Want a free week of personal day planning?").
2. Ask for: fixed schedule, 1-3 goals, current task list, preferred focus time.
3. Each evening, send tomorrow's time-blocked plan (Google Calendar invite or message).
4. After key blocks, message: "Did you finish [task]? Done / Need more time / Partly / Skipped."
5. When they fall behind, reschedule by hand using PRD rules (9.11).
6. Each night, send a short wins summary.
7. End of week: "Would you want this every week? Would you pay for it? What was most useful?"

**Record:** % of blocks followed, % of check-ins answered, someday tasks progressed, which part they valued most.

---

## 3. Checkpoints

### Checkpoint 1: end of week 2
| Metric | Target |
|---|---|
| Waitlist sign-ups | 50+ |
| Landing page conversion (targeted traffic) | 10%+ |
| Concierge: people who followed at least half their blocks and want to continue | 3 of 5 |
| Clear headline winner | Yes |
| Founding Member button clicks or pre-orders | Any meaningful interest (track rate) |

### Checkpoint 2: end of week 5
| Metric | Target |
|---|---|
| Founder daily use | 14 of 14 days |
| Alpha testers still using after 7 days | 40%+ |
| Someday/goal blocks completed per active tester per week | 2+ |
| Check-ins answered (of blocks ended) | 60%+ |

### Checkpoint 3: around week 8-10
| Metric | Target |
|---|---|
| Weekly active users | 100+ |
| Still active after 4 weeks | 25-30%+ |
| "Very disappointed" without it | 40%+ |
| Founding Member purchases | 20+ |

### Decision at each checkpoint
- **Keep going:** most targets met.
- **Pivot:** some parts clearly work and others clearly don't (Section 4).
- **Stop:** most targets missed, even after fixing the main complaints (Section 5).

---

## 4. Pivot signals

| What you see | What it means | Possible pivot |
|---|---|---|
| People love the focus bar and summary but ignore the plan | Value is focus, not planning | Focus tool with simple planning |
| People mostly use goals and someday tasks, not the daily schedule | Value is goal follow-through | Goal coach with lighter scheduling |
| Blocking is the most-requested feature | They want hard limits | Move blocking earlier; blocker + planner |
| Students love it but won't pay; freelancers pay | Wrong primary segment | Focus on freelancers/founders; free student tier |
| People use it but nobody pays, even lifetime | Value real but not worth money to them | Cheaper lifetime deal, B2B (schools, remote teams), sponsorship |
| "AI plans your day" headline beats "someday tasks" | Messaging off | Change positioning, keep the product |
| Check-in rate low but daily use high | Check-ins annoying | Fewer/smarter check-ins |

---

## 5. Stop rules and loss limits

**Set now, before emotions get involved.**

**Limits:**
- **Time:** about 10-12 weeks part-time to reach Checkpoint 3.
- **Money:** about $100-150 total ($50 existing AI credits, domain, small ad test). **No $99 Apple fee until Checkpoint 3 passes.**
- **Pivots:** at most 2.

**Stop if any is true:**
1. The founder stops using it for more than a week, even after fixing what bugged them.
2. After a pivot, the next checkpoint still fails.
3. Fewer than 10% are still using it after 4 weeks, after fixing the main complaints.
4. Nobody pays after it has been offered to 50+ engaged users.

**What you keep if you stop:** reusable code (React PWA, Supabase, AI parsing, scheduling engine), skills (AI integration, PWA, Tauri), a portfolio project and an email list.

---

## 6. Tracking

- **Weekly scorecard** (VALIDATION_SCORECARD.xlsx): one row per week, one column per metric, plus "What we learned" and "Decision."
- **Review every Sunday** (same time as the weekly plan draft).
- **Checkpoint decisions** written down with the evidence, so later you can see why you chose to keep going, pivot or stop.

---

## 7. Channels to test (assumption E)

All usable without showing your face:
- Waitlist page shared from the brand account
- Faceless TikTok/Reels and Threads posts ("POV: you open your laptop to work...")
- r/SampleSize (Marketing flair) and no-link discussion posts once karma allows
- Founder, freelancer, VA and remote-work Facebook groups and Discord servers
- QR flyers at coworking spaces
- Small Facebook/Instagram ads from the brand page (part of the money limit)

Track sign-ups per channel in the scorecard to find the cheapest source of the right users.
