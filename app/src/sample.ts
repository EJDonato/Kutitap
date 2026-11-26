// shortcut: hard-coded demo data, replaced by Supabase queries once the backend is running.
import type { FixedBlock, Profile, Task } from '@scheduler/plan.ts';

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000);
const h = (hh: number) => hh * 60;

export const profile: Profile = { wake: h(6), sleep: h(23), deepWorkPref: 'evening', somedayBlockMinutes: 60 };

export const goals: Record<string, string> = { g1: 'Get a remote job' };

export const fixedBlocks: (FixedBlock & { title: string })[] = [
  { id: 'commute', title: 'Commute', days: [1, 2, 3, 4, 5], start: h(6), end: h(8) },
  { id: 'work', title: 'Work', days: [1, 2, 3, 4, 5], start: h(8), end: h(17) },
];

export const tasks: (Task & { title: string })[] = [
  { id: 'gym', title: 'Gym', type: 'recurring', estMinutes: 60, createdAt: daysAgo(30), recurrence: { daily: true, at: h(17) } },
  { id: 'resume', title: 'Update résumé', type: 'someday', estMinutes: 60, goalId: 'g1', energy: 'deep', createdAt: daysAgo(12) },
  { id: 'exam', title: 'Study for exam', type: 'deadline', estMinutes: 90, dueAt: new Date(Date.now() + 2 * 86_400_000), createdAt: daysAgo(2) },
  { id: 'emails', title: 'Reply to client emails', type: 'someday', estMinutes: 45, createdAt: daysAgo(1) },
  { id: 'read', title: 'Read 20 pages', type: 'recurring', estMinutes: 20, preferredPeriod: 'evening', createdAt: daysAgo(9), recurrence: { perWeek: 3 } },
  { id: 'figma', title: 'Learn Figma', type: 'someday', estMinutes: 30, createdAt: daysAgo(20) },
];
