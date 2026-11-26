import { summary } from '../mock.ts';
import { go } from '../route.ts';
import { Titap } from '../ui.tsx';

const statusColor = (s: string) => (s.startsWith('Done') ? 'text-someday' : s === 'Partly' ? 'text-deadline' : 'text-subtle');

export default function Summary() {
  return (
    <main className="mx-auto flex w-full max-w-[880px] flex-col gap-4 px-[18px] pt-6 pb-8 lg:gap-5 lg:pt-10">
      <section className="flex flex-col items-center gap-2 text-center lg:card lg:flex-row lg:gap-7 lg:p-7 lg:text-left">
        <Titap mood="celebrate" className="w-36 lg:w-40" alt="Titap celebrating" />
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-subtle"><span className="lg:hidden">Thursday wrap-up</span><span className="max-lg:hidden">{summary.when}</span></p>
          <h1 className="font-heading text-[26px] leading-tight font-bold lg:text-[34px]">
            <span className="lg:hidden">6 of 8 done. Titap is glowing bright.</span>
            <span className="max-lg:hidden">You finished 6 of 8. Titap is glowing bright.</span>
          </h1>
          <p className="text-sm text-muted lg:text-[15px]">And you did 30 minutes of Figma, a task that had waited 41 days.</p>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-2.5 lg:grid-cols-4 lg:gap-3">
        <Stat label="Blocks done" value="6 / 8" className="max-lg:hidden" />
        <Stat label="Focus time" value="3 h 10 m" />
        <Stat label="Toward goals" value="1 h 30 m" accent />
        <Stat label="Glow streak" value="4 days" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card flex flex-col gap-2.5 p-5">
          <h2 className="font-heading font-semibold max-lg:hidden">Today</h2>
          {summary.rows.map(([t, s]) => (
            <p key={t} className="flex justify-between text-sm"><span>{t}</span><span className={statusColor(s)}>{s}</span></p>
          ))}
        </section>
        <section className="card flex flex-col gap-3 p-5">
          <h2 className="font-heading font-semibold">Moved to tomorrow</h2>
          {summary.moved.map(([t, w]) => (
            <p key={t} className="flex justify-between rounded-[10px] bg-surface-raised px-3 py-2.5 text-sm"><span>{t}</span><span className="text-subtle">{w}</span></p>
          ))}
          <p className="text-sm text-subtle">Tomorrow’s plan will be ready at 4 AM.</p>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <button className="btn-primary" onClick={() => go('today')}>Good night, Titap</button>
            <button className="btn-ghost" onClick={() => go('chat')}>Change tomorrow</button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value, accent, className = '' }: { label: string; value: string; accent?: boolean; className?: string }) {
  return (
    <div className={`card flex flex-col-reverse items-center gap-1 p-3.5 lg:flex-col lg:items-start lg:gap-2 lg:p-5 ${className}`}>
      <span className="text-xs text-subtle lg:text-[13px]">{label}</span>
      <span className={`font-heading text-xl font-bold lg:text-[28px] ${accent ? 'text-accent' : ''}`}>{value}</span>
    </div>
  );
}
