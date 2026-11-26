import type { ReactNode } from 'react';
import { href, type Route, useRoute } from './route.ts';
import { Icon, Logo, Titap } from './ui.tsx';
import { today } from './mock.ts';

const tabs = [
  { route: 'today', label: 'Today', icon: Icon.today },
  { route: 'week', label: 'Week', icon: Icon.week },
  { route: 'goals', label: 'Goals', icon: Icon.goals },
] as const;

// Summary is reached from Today, so Today stays highlighted there (as in the mockups).
const activeTab = (r: Route) => (r === 'summary' ? 'today' : r);

/** Desktop: sidebar + main. Mobile: main + bottom tab bar. */
export default function AppShell({ children }: { children: ReactNode }) {
  const active = activeTab(useRoute());
  return (
    <div className="min-h-screen lg:flex">
      <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col gap-7 border-r border-border bg-bg-alt px-4 py-6 lg:flex">
        <a href={href('today')} className="px-2"><Logo /></a>
        <nav aria-label="Main" className="flex flex-col gap-1">
          {tabs.map((t) => (
            <a key={t.route} href={href(t.route)} aria-current={active === t.route ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-[10px] p-3 ${active === t.route ? 'bg-raised-2 font-semibold text-text' : 'text-muted hover:bg-surface'}`}>
              <t.icon className={`h-[18px] w-[18px] ${active === t.route ? 'text-accent' : ''}`} />
              {t.label}
            </a>
          ))}
        </nav>
        <a href={href('summary')} className="card mt-auto flex flex-col items-center gap-2 p-4 text-center hover:border-border-strong">
          <Titap mood="base" className="w-24" alt="Titap glowing" />
          <span className="font-heading font-semibold">Titap is glowing</span>
          <span className="text-[13px] text-subtle">{today.done} of {today.total} blocks done today</span>
          <span className="h-1.5 w-full rounded-full bg-border">
            <span className="block h-1.5 rounded-full bg-accent" style={{ width: `${(today.done / today.total) * 100}%` }} />
          </span>
        </a>
        <a href={href('settings')} className="flex items-center gap-3 p-3 text-sm text-subtle hover:text-text">
          <Icon.settings className="h-[18px] w-[18px]" />
          Settings
        </a>
      </aside>

      <div className="min-w-0 flex-1 pb-[76px] lg:pb-0">{children}</div>

      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 flex h-[76px] items-start justify-around border-t border-border bg-bg-alt pt-2.5 lg:hidden">
        {tabs.map((t) => (
          <a key={t.route} href={href(t.route)} aria-current={active === t.route ? 'page' : undefined}
            className={`flex min-w-16 flex-col items-center gap-1 text-[13px] ${active === t.route ? 'font-semibold text-accent' : 'text-subtle'}`}>
            <t.icon className="h-[22px] w-[22px]" />
            {t.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
