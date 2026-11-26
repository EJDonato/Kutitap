// shortcut: sample content from kutitap-app-screens (freelancer persona); replace with Supabase data.

export type Block = {
  time: string; // desktop label
  short?: string; // mobile label; omit to hide on mobile
  title: string;
  mobileTitle?: string;
  sub?: string;
  right?: string;
  mobileRight?: string;
  kind?: 'done' | 'current' | 'fixed' | 'passive' | 'buffer';
  someday?: number; // days waited
  due?: string;
  tall?: boolean;
};

export const today = {
  date: 'Thursday, November 26',
  shortDate: 'Thu, Nov 26',
  done: 2,
  total: 8,
  now: '9:05',
  nowAfter: 1, // now-line sits after this block index
  checkIn: 'Update portfolio',
  blocks: [
    { time: '7:00 AM', short: '7:00', title: 'Morning walk', kind: 'done', right: 'Habit · done' },
    { time: '8:00 AM', title: 'Update portfolio', kind: 'current', sub: 'Goal: Land 3 new clients · 60 min', right: 'Waiting for check-in' },
    { time: '9:00 AM', short: '9:00', title: 'Client work', kind: 'fixed', sub: 'Fixed · until 12:00', mobileRight: 'until 12', tall: true },
    { time: '12:00 PM', short: '12:00', title: 'Lunch', kind: 'passive' },
    { time: '1:00 PM', title: 'Learn Figma: finish lesson 2', someday: 41, right: '30 min' },
    { time: '1:30 PM', short: '1:30', title: 'Send invoice to client', mobileTitle: 'Send invoice', due: 'Due today 5 PM', mobileRight: 'due 5 PM' },
    { time: '3:00 PM', short: '3:00', title: 'Client calls', right: 'Fixed · 60 min', mobileRight: 'fixed' },
    { time: '4:15 PM', title: 'Buffer · 30 min free for catch-up', kind: 'buffer' },
    { time: '6:30 PM', short: '6:30', title: 'Gym', right: 'Habit · 3 of 4 this week', mobileRight: '3 of 4' },
  ] as Block[],
  upNext: { when: '1:00 PM', mins: 30, title: 'Learn Figma: finish lesson 2', mobileTitle: 'Learn Figma: lesson 2', firstStep: 'First step: open lesson 2 and watch the first 10 minutes.' },
  someday: [
    ['Learn Figma', '41 days'],
    ['Organize finances', '23 days · Sat'],
    ['Write first blog post', '12 days · Mon'],
  ],
};

export type WeekItem = { t: string; s?: 'done' | 'skipped' | 'passive' | 'someday' | 'light' };
export const week = {
  range: 'Nov 23 – 29 · drafted Sunday night',
  stats: [['14', 'of 31 blocks done', 'text'], ['3', 'someday tasks moved', 'someday'], ['6.5 h', 'toward goals', 'accent']],
  days: [
    { d: 'MON 23', items: [{ t: 'Client work · 9–12', s: 'passive' }, { t: 'Portfolio: pick 3 projects', s: 'done' }, { t: 'Learn Figma · lesson 1', s: 'done' }, { t: 'Gym ✓', s: 'passive' }] },
    { d: 'TUE 24', items: [{ t: 'Client work · 9–12', s: 'passive' }, { t: 'Reply to leads', s: 'done' }, { t: 'Write case study · skipped', s: 'skipped' }] },
    { d: 'WED 25', items: [{ t: 'Client work · 9–12', s: 'passive' }, { t: 'Write case study (moved)', s: 'done' }, { t: 'Gym ✓', s: 'passive' }] },
    { d: 'THU 26 · TODAY', today: true, items: [{ t: 'Update portfolio' }, { t: 'Client work · 9–12' }, { t: 'Learn Figma · lesson 2', s: 'someday' }, { t: 'Send invoice · due 5 PM' }, { t: 'Client calls · 3–4' }, { t: 'Gym · 6:30' }] },
    { d: 'FRI 27', items: [{ t: 'Client work · 9–12' }, { t: 'Outreach: 5 past clients' }, { t: 'Weekly review · 15 min' }] },
    { d: 'SAT 28', items: [{ t: 'Organize finances · step 1', s: 'someday' }, { t: 'Gym · 9 AM' }] },
    { d: 'SUN 29', items: [{ t: 'Rest day · nothing planned', s: 'light' }, { t: 'Next week drafts tonight', s: 'light' }] },
  ] as { d: string; today?: boolean; items: WeekItem[] }[],
  habits: [['Gym', '2 of 4'], ['Morning walk', '4 of 5']],
};

export const goals = [
  {
    title: 'Land 3 new clients', count: '1 of 3', pct: 33, time: '4.5 h this week · 3 blocks a week',
    steps: [['Pick 3 best projects', true], ['Update portfolio · today 8 AM', false], ['Outreach: 5 past clients · Fri', false], ['Write a case study', false]] as [string, boolean][],
  },
  {
    title: 'Get good at Figma', count: '2 of 8 lessons', pct: 25, time: '1 h this week · 2 blocks a week', fromSomeday: true,
    steps: [['Lesson 1: frames and layers', true], ['Lesson 2: auto layout · today 1 PM', false], ['Redo one old design in Figma', false]] as [string, boolean][],
  },
];
export const somedayTasks: [string, string, boolean?][] = [
  ['Organize finances', 'Sat'],
  ['Write first blog post', 'Mon'],
  ['Fix the leaky faucet', 'skipped 2×', true],
];

export const summary = {
  when: 'Thursday wrap-up · 9:30 PM',
  rows: [
    ['Update portfolio', 'Done'],
    ['Learn Figma · lesson 2', 'Done'],
    ['Send invoice', 'Done · 4:40 PM'],
    ['Gym', 'Done'],
    ['Reply to 2 leads', 'Partly'],
    ['Read 20 pages', 'Skipped'],
  ],
  moved: [['Reply to the last lead', 'Fri 8:30 AM'], ['Read 20 pages', 'Fri 8 PM']],
};
