import { useState, type ReactNode } from 'react';
import { go, type Route } from '../route.ts';
import { DeadlineTag, Icon, LiveBadge, Logo, SomedayTag, Titap, Toggle, type Mood } from '../ui.tsx';

type Step = 'welcome' | 'goals' | 'schedule' | 'someday' | 'ready';
const order: Step[] = ['welcome', 'goals', 'schedule', 'someday', 'ready'];
const to = (s: Step) => go(`onboarding/${s}` as Route);
const prev = (s: Step) => to(order[order.indexOf(s) - 1]);
const next = (s: Step) => to(order[order.indexOf(s) + 1]);

export default function Onboarding({ step }: { step: Step }) {
  if (step === 'welcome') return <Welcome />;
  if (step === 'ready') return <Ready />;
  return step === 'goals' ? <Goals /> : step === 'schedule' ? <Schedule /> : <Someday />;
}

/* ── Shell for the 3 question steps: type on the left, live preview on the right ── */
function QuestionStep(p: {
  step: Step; n: 1 | 2 | 3; mood: Mood; title: string; hint: string; mobileHint: string;
  label: string; text: string; chips?: { label: string; items: string[] };
  preview: ReactNode; primary: string; extra?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Desktop top bar */}
      <header className="flex items-center justify-between px-10 pt-7 max-lg:hidden">
        <Logo />
        <p className="flex items-center gap-3 text-sm text-subtle">
          Step {p.n} of 3 <Bars n={p.n} className="w-[108px]" />
        </p>
      </header>
      {/* Mobile top bar */}
      <header className="flex items-center gap-3 px-3 pt-4 lg:hidden">
        <button onClick={() => prev(p.step)} aria-label="Back" className="flex h-11 w-11 items-center justify-center"><Icon.back className="h-5 w-5" /></button>
        <Bars n={p.n} className="flex-1" />
        <span className="text-sm text-subtle">{p.n} of 3</span>
      </header>

      <main className="mx-auto grid w-full max-w-[1440px] flex-1 gap-6 px-[18px] pt-3 pb-28 lg:grid-cols-[minmax(0,600px)_minmax(0,606px)] lg:justify-between lg:gap-8 lg:px-[100px] lg:pt-4 lg:pb-10">
        <div className="flex flex-col gap-4 lg:gap-5">
          <div className="flex items-center gap-3 lg:items-start lg:gap-4">
            <Titap mood={p.mood} className="w-16 lg:w-[84px]" />
            <div>
              <h1 className="font-heading text-[22px] leading-tight font-bold lg:text-[34px]">{p.title}</h1>
              <p className="mt-1 text-[15px] text-muted max-lg:hidden">{p.hint}</p>
            </div>
          </div>
          <label className="flex flex-col gap-2.5 lg:gap-3">
            <span className="text-sm text-subtle"><span className="lg:hidden">{p.mobileHint}</span><span className="max-lg:hidden">{p.label}</span></span>
            <textarea defaultValue={p.text} rows={4}
              className="min-h-28 resize-y rounded-2xl border border-accent bg-surface p-4 leading-relaxed focus:outline-none lg:min-h-40" />
          </label>
          {p.chips && (
            <div className="flex flex-wrap items-center gap-2 max-lg:hidden">
              <span className="text-sm text-subtle">{p.chips.label}</span>
              {p.chips.items.map((c) => <button key={c} className="chip">“{c}”</button>)}
            </div>
          )}
          <div className="flex items-center gap-3 max-lg:hidden">
            <button className="btn-primary px-6" onClick={() => next(p.step)}>{p.primary}</button>
            <button className="btn-ghost" onClick={() => prev(p.step)}>Back</button>
            {p.extra}
          </div>
        </div>

        <section className="flex flex-col gap-3 lg:card lg:self-start lg:p-[22px]">{p.preview}</section>
      </main>

      {/* Mobile pinned action */}
      <div className="fixed inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-gradient-to-t from-bg via-bg to-transparent px-[18px] pt-6 pb-5 lg:hidden">
        <button className="btn-primary min-h-[52px] w-full text-[17px]" onClick={() => next(p.step)}>{p.primary}</button>
        {p.extra}
      </div>
    </div>
  );
}

const Bars = ({ n, className = '' }: { n: number; className?: string }) => (
  <span className={`flex gap-1.5 ${className}`} aria-hidden="true">
    {[1, 2, 3].map((i) => <span key={i} className={`h-1 flex-1 rounded-full ${i <= n ? 'bg-accent' : 'bg-border-strong'}`} />)}
  </span>
);

const PreviewHead = ({ title, mobileTitle = title }: { title: string; mobileTitle?: string }) => (
  <div className="flex items-center justify-between">
    <h2 className="font-heading font-semibold lg:text-lg"><span className="lg:hidden">{mobileTitle}</span><span className="max-lg:hidden">{title}</span></h2>
    <LiveBadge><span className="lg:hidden">live</span><span className="max-lg:hidden">updating as you type</span></LiveBadge>
  </div>
);

function Question({ children, options, initial }: { children: ReactNode; options: string[]; initial?: string }) {
  const [pick, setPick] = useState(initial);
  return (
    <div className="flex flex-col gap-3 rounded-[14px] bg-checkin p-3.5 text-[15px] text-checkin-text">
      <p>{children}</p>
      <div className="flex flex-wrap gap-2 max-lg:grid max-lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        {options.map((o) => (
          <button key={o} onClick={() => setPick(o)} aria-pressed={pick === o} className={`${pick === o ? 'btn-dark' : 'btn-light'} px-3.5`}>{o}</button>
        ))}
      </div>
    </div>
  );
}

/* ── 1. Welcome ── */
function Welcome() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 pt-10 lg:px-10 lg:pt-7"><Logo /></header>
      <main className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-8 px-6 pb-6 lg:flex-row lg:items-center lg:gap-[86px] lg:px-[160px]">
        <Titap mood="happy" alt="Titap waving hello" className="mx-auto w-[170px] lg:w-[300px] lg:border-r lg:border-border lg:pr-12" />
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          <p className="font-semibold text-accent">Hi, I’m Titap.</p>
          <h1 className="font-heading text-[30px] leading-[1.15] font-bold lg:text-[52px] lg:leading-[1.1]">Let’s finally get your “someday” tasks done.</h1>
          <p className="text-[15px] text-muted lg:max-w-[520px] lg:text-lg">
            Three quick questions and I’ll plan your whole week.<span className="max-lg:hidden"> No setup screens, no templates.</span> You just type.
          </p>
          <ol className="flex flex-col gap-3 max-lg:hidden">
            {['What you want this year (up to 3 goals)', 'What a normal week looks like', 'What you’ve been putting off'].map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-raised-2 text-sm font-semibold text-accent">{i + 1}</span>{t}
              </li>
            ))}
          </ol>
          <div className="mt-auto flex flex-col items-center gap-3 lg:mt-2 lg:flex-row lg:gap-4">
            <button className="btn-primary min-h-[52px] w-full px-7 text-[17px] lg:w-auto" onClick={() => to('goals')}>Let’s start</button>
            <span className="text-sm text-subtle">About 3 minutes · 14-day free trial, no card</span>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── 2. Goals ── */
function Goals() {
  return (
    <QuestionStep
      step="goals" n={1} mood="focused" title="What do you want to make happen this year?"
      hint="Up to 3 goals. Big or small. I’ll make time for them every week." mobileHint="Up to 3 goals, in your words"
      label="Your goals, in your words"
      text="Get 3 new clients for my freelance work. Get good at Figma so I can do UI work too. Maybe start a blog?"
      chips={{ label: 'Ideas:', items: ['Save ₱50k', 'Finish my thesis', 'Launch my side project'] }}
      primary="Continue"
      preview={<>
        <PreviewHead title="Your goals" mobileTitle="Here’s what I got" />
        {[['Land 3 new clients', '3', 'update portfolio, reach out to 5 past clients'], ['Get good at Figma', '2', 'one 30-min lesson at a time']].map(([g, n, s]) => (
          <div key={g} className="rounded-xl bg-surface-raised px-3.5 py-3">
            <p className="flex justify-between gap-2 font-semibold">{g}<span className="text-[13px] font-normal text-subtle"><span className="lg:hidden">{n}× / week</span><span className="max-lg:hidden">{n} blocks / week</span></span></p>
            <p className="mt-1 text-[13px] text-muted max-lg:hidden">First steps: {s}</p>
          </div>
        ))}
        <Question options={['Someday list', 'Make it goal #3']} initial="Someday list">
          <b>“Maybe start a blog”</b> sounds like a someday task, not a goal yet. Where should it go?
        </Question>
        <p className="text-[13px] text-subtle max-lg:hidden">You can change goals anytime from the Goals tab.</p>
      </>}
    />
  );
}

/* ── 3. Schedule ── */
function Schedule() {
  const rows = [
    ['Mon–Fri', 'Client work', '', '9:00–12:00'],
    ['Every day', 'Lunch', '', '12:00–1:00'],
    ['Tue, Thu', 'Client calls', '', '3:00–4:00'],
    ['4× a week', 'Gym', 'habit', '6:30 PM'],
    ['Mornings', 'Walk', 'habit', '7:00 AM'],
    ['Sunday', 'Keep light', '', 'max 1 task'],
  ];
  return (
    <QuestionStep
      step="schedule" n={2} mood="happy" title="What does a normal week look like?"
      hint="Just type it. Work hours, classes, gym, anything fixed. I’ll plan around it." mobileHint="Work, classes, gym, anything fixed"
      label="Your week, in your words"
      text="I do client work weekdays 9 to 12. Lunch at 12. Client calls Tue and Thu 3–4pm. Gym 4x a week, usually 6:30pm. I like a walk in the morning. Weekends are mostly free but keep Sunday light."
      chips={{ label: 'Try:', items: ['I sleep at 11', 'Classes MWF 8–10', 'School pickup 3pm'] }}
      primary="Looks right, continue"
      preview={<>
        <PreviewHead title="Here’s what I understood" mobileTitle="Here’s what I got" />
        {rows.map(([when, what, tag, time]) => (
          <p key={what} className="grid grid-cols-[96px_1fr_auto] items-center rounded-[10px] bg-surface-raised px-3 py-2.5 text-sm lg:grid-cols-[132px_1fr_auto]">
            <span className="text-subtle">{when}</span>
            <span className="font-medium">{what}{tag && <span className="font-normal text-subtle"> · {tag}</span>}</span>
            <span className="text-muted">{time}</span>
          </p>
        ))}
        <Question options={['5 PM', '6 PM', 'It varies']} initial="6 PM">
          <b>One question:</b> what time do you usually stop working for the day?
        </Question>
        <p className="text-[13px] text-subtle max-lg:hidden">Free time found: about 22 hours a week for your goals and tasks.</p>
      </>}
    />
  );
}

/* ── 4. Someday ── */
function Someday() {
  const found: [string, string, boolean?][] = [
    ['Organize finances', 'Split into 4 steps · 30 min each'],
    ['Start a blog', 'First step: pick a name · 20 min'],
    ['Fix the leaky faucet', 'Quick task · 45 min'],
    ['Sort Google Drive', 'Split into 3 steps · 20 min each'],
    ['Renew passport', 'Soft deadline: before March', true],
  ];
  return (
    <QuestionStep
      step="someday" n={3} mood="sleepy" title="What have you been putting off?"
      hint="The no-deadline stuff. Dump it all here. I’ll give each one a real slot." mobileHint="Dump it all. No deadline needed."
      label="Brain dump, one per line or all in one go"
      text="organize my finances, start a blog, fix the leaky faucet, sort my google drive, renew passport before march"
      primary="Plan my week"
      extra={<button onClick={() => to('ready')} className="min-h-11 px-3 text-sm text-muted underline">Skip for now</button>}
      preview={<>
        <PreviewHead title={`${found.length} tasks found`} />
        {found.map(([t, s, deadline]) => (
          <div key={t} className="flex items-center justify-between gap-3 rounded-xl bg-surface-raised px-3.5 py-3">
            <div><p className="font-semibold">{t}</p><p className="text-[13px] text-muted">{s}</p></div>
            {deadline ? <DeadlineTag /> : <SomedayTag />}
          </div>
        ))}
        <p className="text-[13px] text-subtle">At least one someday task gets a slot every day, oldest first.</p>
      </>}
    />
  );
}

/* ── 5. Ready ── */
function Ready() {
  const days: [string, [string, boolean?][]][] = [
    ['THU · today', [['Update portfolio'], ['Fix faucet', true], ['Gym']]],
    ['FRI', [['Figma lesson 1'], ['Blog: pick a name', true]]],
    ['SAT', [['Finances: step 1', true], ['Gym']]],
    ['SUN', []],
    ['MON', [['Outreach: 5 clients'], ['Drive: step 1', true], ['Gym']]],
    ['TUE', [['Figma lesson 2'], ['Passport forms', true]]],
    ['WED', [['Case study draft'], ['Gym']]],
  ];
  const Dot = () => <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-someday align-middle" aria-label="someday task" />;
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-10 pt-7 max-lg:hidden"><Logo /></header>
      <main className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col gap-5 px-[18px] pt-6 pb-36 lg:gap-6 lg:px-0 lg:pt-4 lg:pb-10">
        <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:gap-6 lg:text-left">
          <Titap mood="celebrate" className="w-32 lg:w-[130px]" alt="Titap celebrating" />
          <div>
            <h1 className="font-heading text-[28px] font-bold lg:text-[38px]">Your week is ready.</h1>
            <p className="text-[15px] text-muted lg:text-lg">
              <span className="lg:hidden">24 blocks planned: 5 for goals, 6 someday tasks, and room to breathe.</span>
              <span className="max-lg:hidden">I planned 24 blocks around your schedule: 5 for your goals, 6 for someday tasks, and room to breathe.</span>
            </p>
          </div>
        </div>

        {/* Desktop: the whole week */}
        <div className="grid grid-cols-7 gap-4 max-lg:hidden">
          {days.map(([d, items], i) => (
            <section key={d} className={`flex flex-col gap-2 ${i === 0 ? 'rounded-xl border border-accent p-2' : 'pt-2'}`}>
              <h2 className={`text-[13px] ${i === 0 ? 'font-semibold text-accent' : 'text-subtle'}`}>{d}</h2>
              {items.length
                ? items.map(([t, s]) => <p key={t} className="rounded-lg bg-surface-raised px-2 py-2 text-[13px] font-medium">{t}{s && <Dot />}</p>)
                : <p className="rounded-lg border border-dashed border-border-strong px-2 py-2 text-[13px] text-subtle">Light day</p>}
            </section>
          ))}
        </div>
        <p className="text-[13px] text-subtle max-lg:hidden"><Dot /> someday task · fixed blocks like client work and lunch are hidden here</p>

        {/* Mobile: just today */}
        <section className="card flex flex-col gap-3 p-4 lg:hidden">
          <h2 className="text-[13px] font-semibold text-accent">TODAY · THU</h2>
          {[['8:00', 'Update portfolio'], ['1:00', 'Fix the faucet', true], ['6:30', 'Gym']].map(([t, n, s]) => (
            <p key={String(n)} className="flex items-center gap-4"><span className="w-10 text-sm text-subtle">{t}</span><span className="flex-1">{n}</span>{s && <SomedayTag />}</p>
          ))}
          <p className="text-[13px] text-subtle">+ client work, lunch and calls as usual</p>
        </section>

        <div className="grid gap-3 lg:grid-cols-3 lg:gap-3.5">
          <Setting title="Every morning at 4 AM" desc="Your day is ready when you wake up." className="max-lg:hidden" />
          <Setting title="After each block" desc="I’ll ask “Did you finish?” and fix the plan." className="max-lg:hidden" />
          <Setting title="Open on startup" desc="So the focus bar is always there." className="max-lg:hidden"><Toggle label="Open on startup" /></Setting>
          <Setting title="Morning plan alert" desc="A nudge when your day is ready" className="lg:hidden"><Toggle label="Morning plan alert" /></Setting>
          <Setting title="Add to Home Screen" desc="Open Kutitap like an app" className="lg:hidden"><button className="btn-ghost px-4">How?</button></Setting>
        </div>

        <div className="flex gap-3 max-lg:hidden">
          <button className="btn-primary min-h-[52px] px-7 text-[17px]" onClick={() => go('today')}>Start my day</button>
          <button className="btn-ghost min-h-[52px] px-5" onClick={() => go('week')}>Tweak the week first</button>
        </div>
      </main>
      <div className="fixed inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-gradient-to-t from-bg via-bg to-transparent px-[18px] pt-6 pb-5 lg:hidden">
        <button className="btn-primary min-h-[52px] w-full text-[17px]" onClick={() => go('today')}>Start my day</button>
        <button onClick={() => go('week')} className="min-h-11 px-3 text-sm text-muted underline">Tweak the week first</button>
      </div>
    </div>
  );
}

function Setting({ title, desc, children, className = '' }: { title: string; desc: string; children?: ReactNode; className?: string }) {
  return (
    <div className={`card flex items-center justify-between gap-4 p-4 ${className}`}>
      <div><p className="font-semibold">{title}</p><p className="text-sm text-muted">{desc}</p></div>
      {children}
    </div>
  );
}
