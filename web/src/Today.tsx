import { useMemo, useState } from 'react';
import { planDay, type PlannedBlock } from '@scheduler/plan.ts';
import { fixedBlocks, goals, profile, tasks } from './sample.ts';

type Status = 'done' | 'skipped';

const fmt = (m: number) => {
  const hh = Math.floor(m / 60) % 24;
  return `${hh % 12 || 12}:${String(m % 60).padStart(2, '0')} ${hh < 12 ? 'AM' : 'PM'}`;
};
const dur = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ''}` : `${m} min`);

export default function Today({ onLogout }: { onLogout: () => void }) {
  const now = new Date();
  const minute = now.getHours() * 60 + now.getMinutes();

  const plan = useMemo(() => {
    const dayEnd = new Date();
    dayEnd.setHours(Math.floor(profile.sleep / 60), profile.sleep % 60, 0, 0);
    return planDay({ profile, weekday: new Date().getDay(), fixedBlocks, tasks, now: new Date(), dayEnd });
  }, []);
  const [status, setStatus] = useState<Record<number, Status>>({});

  const taskBlocks = plan.blocks.filter((b) => b.kind === 'task');
  const done = taskBlocks.filter((b) => status[plan.blocks.indexOf(b)] === 'done').length;

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <header className="mb-8 flex items-center gap-4">
        <img src="/assets/kutitap-icon.png" alt="" className="h-12 w-12 rounded-xl" />
        <div className="flex-1">
          <h1 className="font-heading text-3xl font-semibold">Today</h1>
          <p className="text-subtle">
            {now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} · {done} of{' '}
            {taskBlocks.length} blocks done
          </p>
        </div>
        <button onClick={onLogout} className="min-h-11 rounded-xl px-3 text-sm text-subtle hover:text-text">
          Log out
        </button>
      </header>

      <p className="mb-6 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-subtle">
        Demo data, planned live by the scheduler. Nothing is saved yet.
      </p>

      <ol className="space-y-2">
        {plan.blocks.map((b, i) => (
          <Row
            key={i}
            block={b}
            isNow={b.start <= minute && minute < b.end}
            status={status[i]}
            onStatus={(s) => setStatus((prev) => ({ ...prev, [i]: s }))}
          />
        ))}
      </ol>

      {plan.unplaced.length > 0 && (
        <p className="mt-6 text-sm text-subtle">
          Okay lang, moved to tomorrow: {plan.unplaced.map((u) => tasks.find((t) => t.id === u.taskId)?.title).join(', ')}
        </p>
      )}
    </main>
  );
}

function Row({ block: b, isNow, status, onStatus }: {
  block: PlannedBlock;
  isNow: boolean;
  status?: Status;
  onStatus: (s: Status) => void;
}) {
  const time = <span className="w-20 shrink-0 pt-0.5 text-sm text-subtle tabular-nums">{fmt(b.start)}</span>;

  if (b.kind === 'break') {
    return (
      <li className="flex items-center gap-4">
        {time}
        <span className="text-sm text-subtle">Break · {dur(b.end - b.start)}</span>
      </li>
    );
  }

  if (b.kind === 'fixed') {
    const title = fixedBlocks.find((f) => f.id === b.fixedBlockId)?.title;
    return (
      <li className="flex gap-4">
        {time}
        <div className="flex-1 rounded-xl border border-border px-4 py-3 text-subtle">
          {title} · {dur(b.end - b.start)}
        </div>
      </li>
    );
  }

  const task = tasks.find((t) => t.id === b.taskId)!;
  const tag =
    task.type === 'deadline' ? { text: `Due ${task.dueAt!.toLocaleDateString(undefined, { weekday: 'short' })}`, cls: 'bg-surface-raised text-muted' }
    : task.type === 'recurring' ? { text: 'Habit', cls: 'bg-surface-raised text-muted' }
    : { text: 'Someday task', cls: 'bg-someday text-on-accent' };

  return (
    <li className="flex gap-4">
      {time}
      <div
        className={`flex-1 rounded-2xl border bg-surface px-4 py-3 ${isNow ? 'border-accent' : 'border-border-strong'} ${status ? 'opacity-60' : ''}`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-medium ${status === 'done' ? 'line-through' : ''}`}>{task.title}</span>
          <span className="text-sm text-subtle">{dur(b.end - b.start)}</span>
          {isNow && <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-on-accent">Now</span>}
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tag.cls}`}>{tag.text}</span>
          {task.goalId && (
            <span className="rounded-full border border-accent px-2 py-0.5 text-xs text-accent">{goals[task.goalId]}</span>
          )}
        </div>
        {status ? (
          <p className="mt-2 text-sm text-subtle">{status === 'done' ? 'Done. Nice!' : 'Skipped'}</p>
        ) : (
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onStatus('done')}
              className="min-h-11 rounded-xl bg-accent px-4 font-semibold text-on-accent hover:brightness-105"
            >
              Done
            </button>
            <button
              onClick={() => onStatus('skipped')}
              className="min-h-11 rounded-xl border border-border-strong px-4 text-muted hover:bg-surface-raised"
            >
              Skip
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
