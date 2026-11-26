import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planDay, type DayInput, type DayPlan, type Task } from './plan.ts';
import { toInstant } from './time.ts';

const h = (hh: number, mm = 0) => hh * 60 + mm;
const NOW = new Date('2026-11-23T04:00:00+08:00'); // Monday 4 AM, Manila
const day = (n: number) => new Date(NOW.getTime() + n * 86_400_000);

const base = (over: Partial<DayInput> = {}): DayInput => ({
  profile: { wake: h(6), sleep: h(23), deepWorkPref: 'evening', somedayBlockMinutes: 60 },
  weekday: 1,
  fixedBlocks: [
    { id: 'commute', days: [1, 2, 3, 4, 5], start: h(6), end: h(8) },
    { id: 'work', days: [1, 2, 3, 4, 5], start: h(8), end: h(17) },
  ],
  tasks: [],
  now: NOW,
  dayEnd: new Date('2026-11-23T23:00:00+08:00'),
  ...over,
});

const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const timeline = (plan: DayPlan) =>
  plan.blocks.map((b) => `${fmt(b.start)}-${fmt(b.end)} ${b.taskId ?? b.fixedBlockId ?? b.kind}`);

// Invariants every plan must satisfy (PRD F5.4, F11.2 rule 5).
function assertSane(input: DayInput, plan: DayPlan) {
  const sorted = [...plan.blocks].sort((a, b) => a.start - b.start);
  for (let i = 1; i < sorted.length; i++) {
    assert.ok(sorted[i].start >= sorted[i - 1].end, `overlap at ${fmt(sorted[i].start)}`);
  }
  const p = input.profile;
  for (const b of plan.blocks.filter((b) => b.kind !== 'fixed')) {
    assert.ok(b.start >= p.wake && b.end <= p.sleep, `outside waking hours: ${fmt(b.start)}`);
  }
  const fixed = plan.blocks.filter((b) => b.kind === 'fixed').reduce((n, b) => n + b.end - b.start, 0);
  const free = p.sleep - p.wake - fixed;
  const planned = plan.blocks.filter((b) => b.kind !== 'fixed').reduce((n, b) => n + b.end - b.start, 0);
  assert.ok(planned <= free * 0.85, `planned ${planned} > 85% of free ${free}`);
}

const gym: Task = { id: 'gym', type: 'recurring', estMinutes: 60, createdAt: day(-30), recurrence: { days: [1, 3, 5], at: h(17) } };
const resume: Task = { id: 'resume', type: 'someday', estMinutes: 60, goalId: 'g1', energy: 'deep', createdAt: day(-12) };
const exam: Task = { id: 'exam', type: 'deadline', estMinutes: 90, dueAt: day(4), createdAt: day(-2) };
const emails: Task = { id: 'emails', type: 'someday', estMinutes: 45, createdAt: day(-1) };

test('worked example from SYSTEM_DESIGN.md §8', () => {
  const input = base({ tasks: [emails, exam, resume, gym] });
  const plan = planDay(input);
  assertSane(input, plan);
  assert.deepEqual(timeline(plan), [
    '06:00-08:00 commute',
    '08:00-17:00 work',
    '17:00-18:00 gym',
    '18:00-18:05 break',
    '18:05-19:05 resume',
    '19:05-19:10 break',
    '19:10-20:40 exam',
    '20:40-20:45 break',
    '20:45-21:30 emails',
    '21:30-21:35 break',
  ]);
  assert.deepEqual(plan.unplaced, []);
});

test('someday slot is guaranteed even when later deadlines could fill the day', () => {
  const big = (id: string): Task => ({ id, type: 'deadline', estMinutes: 240, dueAt: day(3), createdAt: day(-1) });
  const input = base({ tasks: [big('d1'), big('d2'), resume] });
  const plan = planDay(input);
  assertSane(input, plan);
  assert.ok(plan.blocks.some((b) => b.taskId === 'resume'), 'someday block placed');
  assert.ok(plan.unplaced.some((u) => u.taskId === 'd2'), 'overflow reported, not crammed');
});

test('deadline due today is placed before the someday block', () => {
  const today: Task = { id: 'today', type: 'deadline', estMinutes: 300, dueAt: day(0.7), createdAt: day(-1) };
  const plan = planDay(base({ tasks: [resume, today] }));
  assert.equal(plan.blocks.filter((b) => b.taskId === 'today').reduce((n, b) => n + b.end - b.start, 0), 300);
});

test('long task splits across gaps around a fixed block', () => {
  const input = base({
    profile: { wake: h(8), sleep: h(22), deepWorkPref: 'morning', somedayBlockMinutes: 60, bufferRatio: 0 },
    fixedBlocks: [{ id: 'class', days: [1], start: h(10), end: h(20) }],
    tasks: [{ id: 'study', type: 'deadline', estMinutes: 180, dueAt: day(2), createdAt: day(-1) }],
  });
  const plan = planDay(input);
  assertSane({ ...input, profile: { ...input.profile, bufferRatio: 0 } }, plan);
  assert.deepEqual(timeline(plan).filter((l) => l.endsWith('study')), ['08:00-10:00 study', '20:00-21:00 study']);
});

test('estimate factor stretches blocks; skipped fixed block frees time', () => {
  const plan = planDay(base({
    tasks: [{ ...exam, dueAt: day(0.5) }],
    estimateFactor: 1.4,
    exceptions: [{ fixedBlockId: 'work', type: 'skip' }],
  }));
  const examBlock = plan.blocks.find((b) => b.taskId === 'exam')!;
  assert.equal(examBlock.end - examBlock.start, 130); // 90 x 1.4 = 126, rounded up to 5
  assert.equal(examBlock.start, h(8)); // work skipped, earliest free slot
});

test('per-week habit stops once the weekly count is met', () => {
  const read: Task = { id: 'read', type: 'recurring', estMinutes: 20, createdAt: day(-9), recurrence: { perWeek: 3 } };
  assert.ok(planDay(base({ tasks: [read], habitDoneThisWeek: { read: 2 } })).blocks.some((b) => b.taskId === 'read'));
  assert.ok(!planDay(base({ tasks: [read], habitDoneThisWeek: { read: 3 } })).blocks.some((b) => b.taskId === 'read'));
});

test('toInstant handles fixed-offset and DST zones', () => {
  assert.equal(toInstant('2026-11-23', h(9), 'Asia/Manila').toISOString(), '2026-11-23T01:00:00.000Z');
  assert.equal(toInstant('2026-11-23', h(25), 'Asia/Manila').toISOString(), '2026-11-23T17:00:00.000Z');
  assert.equal(toInstant('2026-07-01', h(9), 'America/New_York').toISOString(), '2026-07-01T13:00:00.000Z');
  assert.equal(toInstant('2026-03-08', h(2, 30), 'America/New_York').toISOString(), '2026-03-08T07:30:00.000Z');
});
