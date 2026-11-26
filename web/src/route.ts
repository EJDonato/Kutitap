import { useSyncExternalStore } from 'react';

// Hash routes keep everything inside the PWA's /app/ scope with no server rewrites.
export type Route =
  | 'today' | 'week' | 'goals' | 'summary' | 'chat' | 'focus' | 'settings'
  | 'onboarding/welcome' | 'onboarding/goals' | 'onboarding/schedule' | 'onboarding/someday' | 'onboarding/ready';

export const ROUTES: { route: Route; label: string }[] = [
  { route: 'onboarding/welcome', label: 'Onboarding 1 · Welcome' },
  { route: 'onboarding/goals', label: 'Onboarding 2 · Goals' },
  { route: 'onboarding/schedule', label: 'Onboarding 3 · Schedule' },
  { route: 'onboarding/someday', label: 'Onboarding 4 · Someday tasks' },
  { route: 'onboarding/ready', label: 'Onboarding 5 · Week is ready' },
  { route: 'today', label: 'Today' },
  { route: 'week', label: 'Week' },
  { route: 'goals', label: 'Goals' },
  { route: 'chat', label: 'Chat with Titap' },
  { route: 'focus', label: 'Focus bar + check-in' },
  { route: 'summary', label: 'Daily summary' },
  { route: 'settings', label: 'Settings' },
];

const read = (): Route => {
  const r = location.hash.replace(/^#\/?/, '') as Route;
  return ROUTES.some((x) => x.route === r) ? r : 'today';
};

const subscribe = (cb: () => void) => {
  addEventListener('hashchange', cb);
  return () => removeEventListener('hashchange', cb);
};

export const useRoute = () => useSyncExternalStore(subscribe, read);
export const go = (r: Route) => { location.hash = `/${r}`; };
export const href = (r: Route) => `#/${r}`;
