import { href } from '../route.ts';
import { Toggle } from '../ui.tsx';

// Not in the mockups yet: a plain list of what PRD 9.x makes configurable.
export default function Settings({ onLogout }: { onLogout: () => void }) {
  const rows: [string, string][] = [
    ['Fixed schedule', 'Client work Mon–Fri 9–12, lunch, calls Tue/Thu'],
    ['Wake & sleep', '7:00 AM – 11:00 PM'],
    ['Best focus time', 'Morning'],
    ['Someday block length', '45 min'],
    ['Focus timer', '25 / 5, long break after 4'],
  ];
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-[18px] pt-5 pb-8 lg:pt-7">
      <h1 className="font-heading text-[26px] font-bold lg:text-[30px]">Settings</h1>
      <section className="card divide-y divide-border">
        {rows.map(([k, v]) => (
          <a key={k} href={href('chat')} className="flex min-h-14 items-center justify-between gap-4 px-5 hover:bg-surface-raised">
            <span className="font-medium">{k}</span><span className="text-right text-sm text-subtle">{v}</span>
          </a>
        ))}
        <div className="flex min-h-14 items-center justify-between gap-4 px-5">
          <span className="font-medium">Morning plan alert</span><Toggle label="Morning plan alert" />
        </div>
      </section>
      <section className="card divide-y divide-border">
        <p className="flex min-h-14 items-center justify-between px-5"><span className="font-medium">Plan</span><span className="text-sm text-accent">Pro trial · 12 days left</span></p>
        <button className="flex min-h-14 w-full items-center px-5 text-left font-medium hover:bg-surface-raised">Export my data</button>
        <button onClick={onLogout} className="flex min-h-14 w-full items-center px-5 text-left font-medium hover:bg-surface-raised">Log out</button>
      </section>
    </main>
  );
}
