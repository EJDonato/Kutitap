// Deterministic day planner (docs/SYSTEM_DESIGN.md §8, PRD §11).
// Pure: no I/O, no Deno/browser APIs, so Edge Functions and the Vite app share it.
// Times are minutes after local midnight; values > 1440 mean after midnight (late sleep, night shifts).

export type Period = 'morning' | 'afternoon' | 'evening';

export interface Profile {
  wake: number;
  sleep: number; // <= wake means after midnight
  deepWorkPref: Period;
  somedayBlockMinutes: number;
  breakMinutes?: number; // default 5
  bufferRatio?: number; // default 0.15 (PRD: 10-15%)
}

export interface FixedBlock { id: string; days: number[]; start: number; end: number }
export interface BlockException { fixedBlockId: string; type: 'skip' | 'change'; start?: number; end?: number }
export interface Recurrence { daily?: boolean; perWeek?: number; days?: number[]; at?: number }

export interface Task {
  id: string;
  type: 'deadline' | 'someday' | 'recurring';
  estMinutes?: number;
  energy?: 'deep' | 'light';
  preferredPeriod?: Period;
  goalId?: string | null;
  dueAt?: Date;
  softDueAt?: Date;
  createdAt: Date;
  lastProgressAt?: Date;
  recurrence?: Recurrence;
}

export interface DayInput {
  profile: Profile;
  weekday: number; // 0 = Sunday
  fixedBlocks: FixedBlock[];
  exceptions?: BlockException[];
  tasks: Task[];
  now: Date;
  dayEnd: Date; // instant of today's sleep time: deadlines before it are "due today"
  from?: number; // plan from this minute (replans); default wake
  estimateFactor?: number; // user's median actual/estimated (F9.4); default 1
  habitDoneThisWeek?: Record<string, number>;
}

export interface PlannedBlock {
  kind: 'fixed' | 'task' | 'break';
  start: number;
  end: number;
  taskId?: string;
  fixedBlockId?: string;
}

export interface DayPlan {
  blocks: PlannedBlock[];
  unplaced: { taskId: string; minutes: number }[];
}

// shortcut: PRD leaves these unset; tune from concierge-test data (VALIDATION.md).
const SIZE_WEIGHT = 1;
const GOAL_BONUS = 5;
const SOFT_DUE_HORIZON_DAYS = 14;
const MIN_CHUNK = 15;
const DEFAULT_EST = 30;
const NOON = 720;
const FIVE_PM = 1020;
const DAY_MS = 86_400_000;

type Gap = [number, number];

/** PRD §11: days_waiting x size_weight + soft_deadline_proximity + goal_link_bonus */
export function somedayScore(t: Task, now: Date): number {
  const waiting = (now.getTime() - (t.lastProgressAt ?? t.createdAt).getTime()) / DAY_MS;
  const daysToSoft = t.softDueAt ? (t.softDueAt.getTime() - now.getTime()) / DAY_MS : Infinity;
  return waiting * SIZE_WEIGHT + Math.max(0, SOFT_DUE_HORIZON_DAYS - daysToSoft) + (t.goalId ? GOAL_BONUS : 0);
}

/** PRD §11: estimated_minutes / minutes_until_deadline; overdue sorts first. */
export function urgency(t: Task, now: Date): number {
  const left = (t.dueAt!.getTime() - now.getTime()) / 60_000;
  return left <= 0 ? Infinity : (t.estMinutes ?? DEFAULT_EST) / left;
}

export function planDay(input: DayInput): DayPlan {
  const p = input.profile;
  const brk = p.breakMinutes ?? 5;
  const wake = p.wake;
  const sleep = p.sleep <= wake ? p.sleep + 1440 : p.sleep;
  const blocks: PlannedBlock[] = [];

  // 1. Fixed blocks for this weekday, with exceptions applied.
  for (const fb of input.fixedBlocks) {
    if (!fb.days.includes(input.weekday)) continue;
    const ex = input.exceptions?.find((e) => e.fixedBlockId === fb.id);
    if (ex?.type === 'skip') continue;
    const start = ex?.type === 'change' ? ex.start! : fb.start;
    let end = ex?.type === 'change' ? ex.end! : fb.end;
    if (end <= start) end += 1440;
    blocks.push({ kind: 'fixed', fixedBlockId: fb.id, start, end });
  }

  let gaps: Gap[] = [[Math.max(wake, input.from ?? wake), sleep]];
  for (const b of blocks) gaps = cut(gaps, b.start, b.end);
  // Planned time (tasks + breaks) never exceeds free time minus buffer (F5.4).
  let budget = Math.floor(total(gaps) * (1 - (p.bufferRatio ?? 0.15)));

  const periods: Record<Period, Gap> = {
    morning: [wake, NOON],
    afternoon: [NOON, FIVE_PM],
    evening: [FIVE_PM, sleep],
  };
  const est = (t: Task) => Math.ceil(((t.estMinutes ?? DEFAULT_EST) * (input.estimateFactor ?? 1)) / 5) * 5;
  const remaining = new Map<string, number>();

  const take = (start: number, len: number, taskId: string) => {
    blocks.push({ kind: 'task', taskId, start, end: start + len });
    gaps = cut(gaps, start, start + len);
    budget -= len;
    // Break right after, if the gap continues and budget allows.
    const g = gaps.find(([s]) => s === start + len);
    const b = g ? Math.min(brk, g[1] - g[0], budget) : 0;
    if (b > 0) {
      blocks.push({ kind: 'break', start: start + len, end: start + len + b });
      gaps = cut(gaps, start + len, start + len + b);
      budget -= b;
    }
  };

  /** Earliest gap that fits, preferred period first; splits across gaps if needed. */
  const place = (t: Task, minutes: number, prefer?: Period, at?: number) => {
    let left = minutes;
    if (at !== undefined && budget >= left && gaps.some(([s, e]) => s <= at && at + left <= e)) {
      take(at, left, t.id);
      left = 0;
    }
    while (left > 0 && budget > 0) {
      const segs = prefer ? [...clip(gaps, periods[prefer]), ...gaps] : gaps;
      const want = Math.min(left, budget);
      const seg = segs.find(([s, e]) => e - s >= Math.min(want, MIN_CHUNK));
      if (!seg) break;
      const len = Math.min(want, seg[1] - seg[0]);
      take(seg[0], len, t.id);
      left -= len;
    }
    if (left > 0) remaining.set(t.id, (remaining.get(t.id) ?? 0) + left);
  };

  const now = input.now;
  const active = input.tasks;
  const habits = active.filter((t) => t.type === 'recurring' && dueToday(t, input));
  const deadlines = active
    .filter((t) => t.type === 'deadline')
    .sort((a, b) => urgency(b, now) - urgency(a, now));
  const dueTodayDeadlines = deadlines.filter((t) => t.dueAt! <= input.dayEnd);
  const laterDeadlines = deadlines.filter((t) => t.dueAt! > input.dayEnd);
  const somedays = active
    .filter((t) => t.type === 'someday')
    .sort((a, b) => somedayScore(b, now) - somedayScore(a, now));
  const deepOr = (t: Task) => (t.energy === 'deep' ? p.deepWorkPref : t.preferredPeriod);

  // 2. Fixed-time habits.
  for (const t of habits.filter((h) => h.recurrence?.at !== undefined)) {
    place(t, est(t), t.preferredPeriod, t.recurrence!.at);
  }
  // 3. Deadlines due today (never moved, F11.2 rule 1).
  for (const t of dueTodayDeadlines) place(t, est(t), deepOr(t));
  // 4. Big Rock: guaranteed someday/goal slot in the deep-work period (F6.3, F5.3).
  const [bigRock, ...otherSomedays] = somedays;
  if (bigRock) place(bigRock, Math.min(est(bigRock), p.somedayBlockMinutes), p.deepWorkPref);
  // 5. Later deadlines by urgency.
  for (const t of laterDeadlines) place(t, est(t), deepOr(t));
  // 6. Flexible habits.
  for (const t of habits.filter((h) => h.recurrence?.at === undefined)) place(t, est(t), t.preferredPeriod);
  // 7. Remaining someday tasks, one chunk each, while budget lasts.
  for (const t of otherSomedays) {
    if (budget < MIN_CHUNK) break;
    place(t, Math.min(est(t), p.somedayBlockMinutes), deepOr(t));
  }

  blocks.sort((a, b) => a.start - b.start);
  return { blocks, unplaced: [...remaining].map(([taskId, minutes]) => ({ taskId, minutes })) };
}

function dueToday(t: Task, input: DayInput): boolean {
  const r = t.recurrence ?? {};
  if (r.daily || r.days?.includes(input.weekday)) return true;
  // Forgiving weekly count (F8.3/F8.4): keep offering until the week's target is met.
  return r.perWeek !== undefined && (input.habitDoneThisWeek?.[t.id] ?? 0) < r.perWeek;
}

function cut(gaps: Gap[], s: number, e: number): Gap[] {
  return gaps.flatMap(([gs, ge]): Gap[] =>
    e <= gs || s >= ge ? [[gs, ge]] : ([[gs, s], [e, ge]] as Gap[]).filter(([a, b]) => b > a),
  );
}

function clip(gaps: Gap[], [ps, pe]: Gap): Gap[] {
  return gaps.map(([s, e]): Gap => [Math.max(s, ps), Math.min(e, pe)]).filter(([s, e]) => e > s);
}

function total(gaps: Gap[]): number {
  return gaps.reduce((n, [s, e]) => n + e - s, 0);
}
