import { useState } from 'react';
import { type Block, today } from '../mock.ts';
import { href, go } from '../route.ts';
import { ChatBox, CheckInCard, Icon, SomedayTag, Titap } from '../ui.tsx';

export default function Today() {
  const [view, setView] = useState<'timeline' | 'checklist'>('timeline');
  const u = today.upNext;

  return (
    <main className="flex min-h-screen flex-col gap-4 px-[18px] pt-5 pb-4 lg:gap-6 lg:px-8 lg:pt-7 lg:pb-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-subtle"><span className="lg:hidden">{today.shortDate}</span><span className="max-lg:hidden">{today.date}</span></p>
          <h1 className="mt-1 font-heading text-[26px] font-bold lg:text-[30px]">
            <span className="lg:hidden">Today</span><span className="max-lg:hidden">Good morning. Your day is ready.</span>
          </h1>
        </div>
        {/* Mobile: glow badge opens the daily summary */}
        <a href={href('summary')} className="flex items-center gap-1 rounded-full border border-border-strong bg-surface py-1 pr-3.5 pl-1 font-heading font-semibold lg:hidden">
          <Titap mood="base" className="w-10" alt="" /> {today.done} / {today.total}
        </a>
        <div className="flex flex-wrap gap-2 max-lg:hidden">
          <div role="group" aria-label="View" className="flex rounded-[10px] border border-border bg-surface p-[3px]">
            {(['timeline', 'checklist'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} aria-pressed={view === v}
                className={`min-h-[38px] rounded-lg px-3.5 capitalize ${view === v ? 'bg-border font-semibold' : 'text-subtle'}`}>
                {v}
              </button>
            ))}
          </div>
          <button className="btn-ghost" onClick={() => go('chat')}>Replan my day</button>
        </div>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        {/* Right panel (first on mobile: check-in, then up next) */}
        <div className="flex min-w-0 flex-col gap-4 lg:order-2 lg:flex-[1_1_300px]">
          <div className="lg:hidden"><CheckInCard task={today.checkIn} compact /></div>
          <div className="max-lg:hidden"><CheckInCard task={today.checkIn} /></div>

          {/* Up next: full card on desktop, compact strip on mobile */}
          <section className="card flex flex-col gap-3 p-5 max-lg:hidden">
            <p className="text-[13px] text-subtle">Up next · {u.when}</p>
            <p className="font-heading text-[19px] font-semibold">{u.title}</p>
            <p className="text-sm text-muted">{u.firstStep}</p>
            <a href={href('focus')} className="btn-primary"><Icon.play className="h-4 w-4" />Start focus · 25 min</a>
          </section>
          <section className="flex items-center justify-between gap-3 rounded-[18px] border border-accent bg-raised-2 p-4 lg:hidden">
            <div className="flex flex-col gap-1">
              <p className="text-[13px] font-semibold text-accent">Up next · {u.when} · {u.mins} min</p>
              <p className="font-semibold">{u.mobileTitle}</p>
              <SomedayTag>Someday · 41 days</SomedayTag>
            </div>
            <a href={href('focus')} aria-label="Start focus" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
              <Icon.play className="h-5 w-5" />
            </a>
          </section>

          <section className="card flex flex-col gap-2.5 p-5 max-lg:hidden">
            <p className="font-heading font-semibold">Someday tasks this week</p>
            {today.someday.map(([t, d]) => (
              <p key={t} className="flex justify-between text-sm"><span>{t}</span><span className="text-subtle">{d}</span></p>
            ))}
          </section>
        </div>

        {/* Schedule */}
        <section aria-label="Today's schedule" className="flex min-w-0 flex-col gap-2 lg:flex-[2_1_480px]">
          {view === 'timeline'
            ? today.blocks.map((b, i) => (
                <div key={b.title} className="contents">
                  <Row b={b} />
                  {i === today.nowAfter && (
                    <div className="flex items-center gap-2 pl-16 max-lg:hidden" aria-label={`Now, ${today.now}`}>
                      <span className="h-2.5 w-2.5 rounded-full bg-now" />
                      <span className="h-0.5 flex-1 bg-now" />
                      <span className="text-xs font-semibold text-now">{today.now}</span>
                    </div>
                  )}
                </div>
              ))
            : <Checklist />}
        </section>
      </div>

      <div className="mt-auto max-lg:sticky max-lg:bottom-[84px]">
        <ChatBox attach placeholder="Add a task or change your plan… e.g. “Dentist Thursday 2pm”" />
      </div>
    </main>
  );
}

function Row({ b }: { b: Block }) {
  const bg =
    b.kind === 'current' ? 'border border-accent bg-raised-2'
    : b.kind === 'done' || b.kind === 'passive' ? 'bg-block-done'
    : b.kind === 'buffer' ? 'border border-dashed border-border-strong'
    : 'bg-block';
  // Blocks without a mobile label live elsewhere on mobile (check-in, up next) or are desktop-only.
  const mobile = b.short ? 'flex' : 'hidden lg:flex';

  if (b.kind === 'buffer') {
    return (
      <div className={`${mobile} items-stretch gap-4`}>
        <span className="w-16 shrink-0 pt-3 text-[13px] text-subtle">{b.time}</span>
        <div className={`flex-1 rounded-xl px-4 py-2.5 text-sm text-subtle ${bg}`}>{b.title}</div>
      </div>
    );
  }
  return (
    <div className={`${mobile} items-stretch gap-4`}>
      <span className="w-12 shrink-0 pt-3 text-[13px] text-subtle lg:w-16">
        <span className="lg:hidden">{b.short}</span><span className="max-lg:hidden">{b.time}</span>
      </span>
      <div className={`flex flex-1 justify-between gap-3 rounded-xl px-4 py-3 ${bg} ${b.tall ? 'lg:min-h-24' : ''} ${b.kind === 'done' || b.kind === 'passive' ? 'text-muted' : ''}`}>
        <div className="flex flex-col gap-1">
          <span className={`${b.kind === 'done' ? 'text-subtle line-through' : ''} ${b.kind === 'passive' ? '' : 'lg:font-semibold'}`}>
            {b.mobileTitle ? <><span className="lg:hidden">{b.mobileTitle}</span><span className="max-lg:hidden">{b.title}</span></> : b.title}
          </span>
          {b.sub && <span className="text-[13px] text-muted max-lg:hidden">{b.sub}</span>}
          {b.someday && <span className="max-lg:hidden"><SomedayTag>Someday task · waited {b.someday} days</SomedayTag></span>}
        </div>
        {b.kind === 'fixed' && <Icon.lock className="h-4 w-4 shrink-0 text-subtle max-lg:hidden" />}
        {(b.right || b.due) && (
          <span className={`text-[13px] max-lg:hidden ${b.due ? 'font-semibold text-deadline' : b.kind === 'current' ? 'self-center text-accent' : 'text-subtle'}`}>
            {b.due ?? b.right}
          </span>
        )}
        {b.mobileRight && (
          <span className={`self-center text-[13px] lg:hidden ${b.due ? 'font-semibold text-deadline' : 'text-subtle'}`}>{b.mobileRight}</span>
        )}
      </div>
    </div>
  );
}

function Checklist() {
  const tasks = today.blocks.filter((b) => b.kind !== 'buffer' && b.kind !== 'passive');
  return (
    <ul className="card divide-y divide-border">
      {tasks.map((b) => (
        <li key={b.title}>
          <label className="flex min-h-12 cursor-pointer items-center gap-3 px-4">
            <input type="checkbox" defaultChecked={b.kind === 'done'} className="h-[18px] w-[18px] accent-accent" />
            <span className="flex-1">{b.title}</span>
            <span className="text-[13px] text-subtle">{b.time}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
