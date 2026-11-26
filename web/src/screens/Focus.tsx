import { useEffect, useState } from 'react';
import { href } from '../route.ts';
import { Icon, Titap } from '../ui.tsx';

const FOCUS_MS = 25 * 60_000;

// The real focus bar opens in a Document Picture-in-Picture window (PRD F9.1); this page shows both states.
export default function Focus() {
  // Timer keeps an end time, not a counter, so it stays right when the tab sleeps (F9.2).
  const [endsAt, setEndsAt] = useState(() => Date.now() + FOCUS_MS - 6 * 60_000 - 18_000);
  const [pausedLeft, setPausedLeft] = useState<number>();
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const left = Math.max(0, pausedLeft ?? endsAt - Date.now());
  const mmss = `${Math.floor(left / 60_000)}:${String(Math.floor((left % 60_000) / 1000)).padStart(2, '0')}`;
  const togglePause = () => {
    if (pausedLeft === undefined) setPausedLeft(left);
    else { setEndsAt(Date.now() + pausedLeft); setPausedLeft(undefined); }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#262F3F] px-5 py-10">
      <p className="w-full max-w-[400px] text-sm text-muted">Pop-out window that floats above other apps · 2 states</p>

      <section className="flex w-full max-w-[400px] flex-col gap-3.5 rounded-[18px] border border-border-strong bg-bg-alt p-4">
        <div className="flex items-center gap-3">
          <Titap mood="focused" className="w-12" />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] text-subtle">Focusing on</p>
            <p className="truncate font-semibold">Learn Figma: finish lesson 2</p>
          </div>
          <p className="font-heading text-[32px] font-bold text-accent tabular-nums" aria-live="off">{mmss}</p>
        </div>
        <div className="h-1.5 rounded-full bg-border">
          <div className="h-1.5 rounded-full bg-accent transition-[width]" style={{ width: `${100 - (left / FOCUS_MS) * 100}%` }} />
        </div>
        <div className="flex gap-2">
          <button className="btn flex-1 bg-surface-raised hover:bg-raised-2" onClick={togglePause}>{pausedLeft === undefined ? 'Pause' : 'Resume'}</button>
          <button className="btn flex-1 bg-surface-raised hover:bg-raised-2">Done early</button>
          <button className="btn bg-surface-raised px-3 hover:bg-raised-2" aria-label="Pop out"><Icon.popout className="h-[18px] w-[18px]" /></button>
        </div>
        <p className="text-[13px] text-subtle">Next: Send invoice · 1:30 PM</p>
      </section>

      <section className="flex w-full max-w-[400px] flex-col gap-3 rounded-[18px] bg-checkin p-4 text-checkin-text">
        <div className="flex items-center gap-3">
          <Titap mood="calm" className="w-12" />
          <div>
            <p className="text-[13px] text-checkin-muted">Time’s up · *kutitap*</p>
            <p className="font-semibold">Did you finish lesson 2?</p>
          </div>
        </div>
        <button className="btn-dark">Done</button>
        <div className="grid grid-cols-3 gap-2">
          {['+15 min', '+30 min', '+60 min'].map((t) => <button key={t} className="btn-light px-2">{t}</button>)}
        </div>
        <div className="flex justify-around text-sm">
          <button className="min-h-11 underline">Partly done</button>
          <button className="min-h-11 underline">Skipped</button>
        </div>
      </section>

      <a href={href('today')} className="text-sm text-subtle underline hover:text-text">Back to Today</a>
    </main>
  );
}
