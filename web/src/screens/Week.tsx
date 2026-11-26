import { week, type WeekItem } from '../mock.ts';
import { ChatBox, SomedayTag, Titap } from '../ui.tsx';

const statColor = { text: 'text-text', someday: 'text-someday', accent: 'text-accent' } as Record<string, string>;

// Mobile Week isn't in the mockups: the same columns stack into a day-by-day list.
export default function Week() {
  return (
    <main className="flex min-h-screen flex-col gap-6 px-[18px] pt-5 pb-4 lg:px-8 lg:pt-7 lg:pb-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-subtle">{week.range}</p>
          <h1 className="mt-1 font-heading text-[26px] font-bold lg:text-[30px]">This week</h1>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          {week.stats.map(([n, l, c]) => (
            <span key={l}><b className={`font-heading text-lg ${statColor[c]}`}>{n}</b> {l}</span>
          ))}
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-7 lg:gap-2.5">
        {week.days.map((day) => (
          <section key={day.d} className={`flex flex-col gap-2 ${day.today ? 'rounded-xl border border-accent p-2 lg:-mt-2' : ''}`}>
            <h2 className={`text-[13px] font-medium ${day.today ? 'font-semibold text-accent' : 'text-subtle'}`}>{day.d}</h2>
            {day.items.map((it) => <Item key={it.t} it={it} today={day.today} />)}
          </section>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card flex items-center gap-4 p-5">
          <Titap mood="base" className="w-14" />
          <p className="text-sm text-muted lg:text-[15px] lg:text-text">
            The week is a draft. Want to change it? Tell Titap in the chat box, like “Move gym to Sunday” or “I’m off Friday.”
          </p>
        </section>
        <section className="card flex flex-col gap-2.5 p-5">
          <p className="font-heading font-semibold">Habits this week</p>
          {week.habits.map(([h, c]) => (
            <p key={h} className="flex justify-between text-sm"><span>{h}</span><span className="text-subtle">{c}</span></p>
          ))}
        </section>
      </div>

      <div className="mt-auto max-lg:sticky max-lg:bottom-[84px]">
        <ChatBox placeholder="Change your week… e.g. “I’m off Friday”" />
      </div>
    </main>
  );
}

function Item({ it, today }: { it: WeekItem; today?: boolean }) {
  const base = 'rounded-[10px] px-2.5 py-2 text-[13px] leading-snug';
  if (it.s === 'light') return <p className={`${base} border border-dashed border-border-strong text-subtle`}>{it.t}</p>;
  if (it.s === 'done') return <p className={`${base} bg-block-done text-subtle line-through`}>{it.t}</p>;
  if (it.s === 'skipped') return <p className={`${base} bg-block-done text-deadline`}>{it.t}</p>;
  if (it.s === 'passive') return <p className={`${base} bg-block-done text-muted`}>{it.t}</p>;
  return (
    <p className={`${base} flex flex-col gap-1 ${today ? 'bg-raised-2 font-medium' : 'bg-block'}`}>
      {it.t}
      {it.s === 'someday' && <SomedayTag />}
    </p>
  );
}
