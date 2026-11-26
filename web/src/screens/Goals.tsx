import { goals, somedayTasks } from '../mock.ts';
import { SomedayTag, Titap } from '../ui.tsx';

export default function Goals() {
  return (
    <main className="flex flex-col gap-6 px-[18px] pt-5 pb-8 lg:px-8 lg:pt-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-subtle">Up to 3 goals · Titap plans time for them every week</p>
          <h1 className="mt-1 font-heading text-[26px] font-bold lg:text-[30px]">Your goals for {new Date().getFullYear()}</h1>
        </div>
        <button className="btn-ghost">+ Add goal (1 slot left)</button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((g) => (
          <section key={g.title} className="card flex flex-col gap-4 p-[22px]">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-heading text-xl font-semibold">{g.title}</h2>
              <span className="text-[13px] font-semibold whitespace-nowrap text-accent">{g.count}</span>
            </div>
            <div className="h-1.5 rounded-full bg-border" role="progressbar" aria-valuenow={g.pct} aria-label={`${g.title} progress`}>
              <div className="h-1.5 rounded-full bg-accent" style={{ width: `${g.pct}%` }} />
            </div>
            <p className="text-sm text-subtle">{g.time}</p>
            <ul className="flex flex-col gap-1">
              {g.steps.map(([s, done]) => (
                <li key={s}>
                  <label className="flex min-h-8 cursor-pointer items-center gap-2.5 text-sm">
                    <input type="checkbox" defaultChecked={done} className="peer h-[18px] w-[18px] accent-accent" />
                    <span className="peer-checked:text-subtle peer-checked:line-through">{s}</span>
                  </label>
                </li>
              ))}
            </ul>
            {g.fromSomeday && <SomedayTag>Started as a someday task</SomedayTag>}
          </section>
        ))}
        <section className="flex flex-col items-center justify-center gap-2 rounded-[18px] border border-dashed border-border-strong p-6 text-center">
          <Titap mood="sleeping" className="w-24" alt="Titap sleeping" />
          <h2 className="font-heading text-lg font-semibold">One more slot</h2>
          <p className="max-w-64 text-sm text-subtle">Fewer goals means each one gets real time. Add a third only if it matters this year.</p>
        </section>
      </div>

      <section className="card flex flex-col gap-4 p-[22px]">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-heading text-lg font-semibold">Someday tasks</h2>
          <p className="text-[13px] text-subtle">No deadline, but each gets a slot. After 3 skips, Titap asks to split or drop it.</p>
        </div>
        <div className="grid gap-2.5 md:grid-cols-3">
          {somedayTasks.map(([t, when, warn]) => (
            <p key={t} className="flex justify-between rounded-xl bg-surface-raised px-3.5 py-3 text-sm">
              <span className="font-medium">{t}</span>
              <span className={warn ? 'font-medium text-deadline' : 'text-subtle'}>{when}</span>
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
