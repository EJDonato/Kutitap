import { useState, type ReactNode } from 'react';
import { go, href, ROUTES, useRoute } from './route.ts';

/* ── Titap ── moods per kutitap-app-screens/README.md */
export type Mood = 'base' | 'happy' | 'focused' | 'calm' | 'sleepy' | 'sleeping' | 'celebrate';
export const Titap = ({ mood = 'base', className = '', alt = '' }: { mood?: Mood; className?: string; alt?: string }) => (
  <img src={`/assets/titap/titap-${mood}.png`} alt={alt} className={`h-auto ${className}`} />
);

export const Logo = ({ className = '' }: { className?: string }) => (
  <span className={`flex items-center gap-2.5 ${className}`}>
    <img src="/assets/kutitap-icon.png" alt="" className="h-9 w-9 rounded-[9px]" />
    <span className="font-heading text-[21px] font-bold">Kutitap</span>
  </span>
);

/* ── Icons (stroke icons from the mockups) ── */
const Svg = ({ children, className = 'h-[18px] w-[18px]', fill = 'none' }: { children: ReactNode; className?: string; fill?: string }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    {children}
  </svg>
);
export const Icon = {
  today: (p: { className?: string }) => <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" /></Svg>,
  week: (p: { className?: string }) => <Svg {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Svg>,
  goals: (p: { className?: string }) => <Svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></Svg>,
  settings: (p: { className?: string }) => <Svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></Svg>,
  lock: (p: { className?: string }) => <Svg {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Svg>,
  play: (p: { className?: string }) => <Svg {...p} fill="currentColor"><path d="M7 4v16l13-8z" stroke="none" /></Svg>,
  arrow: (p: { className?: string }) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>,
  back: (p: { className?: string }) => <Svg {...p}><path d="M15 6l-6 6 6 6" /></Svg>,
  plus: (p: { className?: string }) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>,
  image: (p: { className?: string }) => <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M21 17l-5-5-8 7" /></Svg>,
  popout: (p: { className?: string }) => <Svg {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Svg>,
};

/* ── Tags ── */
export const SomedayTag = ({ children = 'Someday' }: { children?: ReactNode }) => (
  <span className="self-start rounded-full bg-someday px-2.5 py-0.5 text-xs font-semibold text-on-accent">{children}</span>
);
export const DeadlineTag = ({ children = 'Has a deadline' }: { children?: ReactNode }) => (
  <span className="self-start rounded-full bg-deadline px-2.5 py-0.5 text-xs font-semibold text-on-accent">{children}</span>
);
export const LiveBadge = ({ children = 'updating as you type' }: { children?: ReactNode }) => (
  <span className="flex items-center gap-1.5 text-xs text-someday">
    <span className="h-2 w-2 rounded-full bg-someday" />
    {children}
  </span>
);

/* ── Check-in card ── always the light card (README "Key UI patterns") */
const replies: Record<string, string> = {
  Done: 'Nice! Titap glows a little brighter.',
  'More time': 'Okay, +15 min. I shifted the rest of your morning.',
  Partly: 'Good progress. The rest is a small follow-up this afternoon.',
  Skipped: 'Okay lang. I moved it to tomorrow at 8:00.',
};
export function CheckInCard({ task, compact = false }: { task: string; compact?: boolean }) {
  const [answer, setAnswer] = useState<string>();
  const opts = ['Done', 'More time', 'Partly', 'Skipped'];
  return (
    <section className={`flex flex-col rounded-[18px] bg-checkin text-checkin-text ${compact ? 'gap-3 p-4' : 'gap-3.5 p-5'}`}>
      <div className="flex items-center gap-3">
        <Titap mood="calm" className={compact ? 'hidden' : 'w-14'} />
        <div>
          {!compact && <p className="text-[13px] text-checkin-muted">Check-in</p>}
          <p className="font-semibold">Did you finish “{task}”?</p>
        </div>
      </div>
      {answer ? (
        <p className="flex items-center justify-between gap-3 text-sm" aria-live="polite">
          {replies[answer]}
          <button className="text-sm underline" onClick={() => setAnswer(undefined)}>Undo</button>
        </p>
      ) : (
        <div className={`grid gap-2 ${compact ? 'grid-cols-4' : 'grid-cols-2'}`}>
          {opts.map((o, i) => (
            <button key={o} onClick={() => setAnswer(o)} className={`${i === 0 ? 'btn-dark' : 'btn-light'} px-1 ${compact ? 'text-[13px]' : ''}`}>
              {compact ? o : { 'More time': 'Need more time', Partly: 'Partly done' }[o] ?? o}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

/* ── Chat box ── the one way to add or change things; sending opens the chat */
export function ChatBox({ placeholder, attach = false }: { placeholder: string; attach?: boolean }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); go('chat'); }}
      className="flex items-center gap-2.5 rounded-2xl border border-border-strong bg-surface py-2.5 pr-2.5 pl-[18px]"
    >
      <label htmlFor="chat" className="sr-only">Add a task or ask Titap</label>
      <input id="chat" placeholder={placeholder} onFocus={() => matchMedia('(max-width: 1023px)').matches && go('chat')}
        className="h-11 min-w-0 flex-1 bg-transparent text-[15px] placeholder:text-subtle focus:outline-none" />
      {attach && (
        <button type="button" aria-label="Attach screenshot" className="hidden h-11 w-11 items-center justify-center rounded-[10px] text-subtle hover:bg-surface-raised lg:flex">
          <Icon.image className="h-5 w-5" />
        </button>
      )}
      <button type="submit" aria-label="Send" className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-accent text-on-accent">
        <Icon.arrow className="h-[18px] w-[18px] max-lg:hidden" />
        <Icon.plus className="h-5 w-5 lg:hidden" />
      </button>
    </form>
  );
}

export function Toggle({ label, defaultOn = true }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={() => setOn(!on)}
      className={`flex h-[26px] w-11 shrink-0 items-center rounded-full p-[3px] transition-colors ${on ? 'bg-accent' : 'bg-border-strong'}`}>
      <span className={`h-5 w-5 rounded-full bg-on-accent transition-transform ${on ? 'translate-x-[18px]' : ''}`} />
    </button>
  );
}

/* ── Demo-only screen switcher ── */
// shortcut: lets testers reach every screen while features aren't wired; remove before beta.
export function ScreensMenu() {
  const [open, setOpen] = useState(false);
  const route = useRoute();
  return (
    <div className="fixed top-0 left-1/2 z-50 -translate-x-1/2 lg:top-auto lg:right-5 lg:bottom-[104px] lg:left-auto lg:translate-x-0">
      {open && (
        <nav aria-label="All screens" className="absolute top-10 left-1/2 max-h-[80vh] w-64 -translate-x-1/2 overflow-y-auto rounded-2xl lg:top-auto lg:right-0 lg:bottom-12 lg:left-auto lg:translate-x-0 border border-border-strong bg-bg-alt p-2 shadow-2xl">
          {ROUTES.map((r) => (
            <a key={r.route} href={href(r.route)} onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm ${r.route === route ? 'bg-raised-2 text-accent' : 'text-muted hover:bg-surface'}`}>
              {r.label}
            </a>
          ))}
        </nav>
      )}
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="min-h-8 rounded-b-xl border border-t-0 border-border-strong bg-bg-alt/90 px-4 text-xs text-muted shadow-lg backdrop-blur hover:text-text lg:min-h-10 lg:rounded-full lg:border-t lg:text-sm">
        Screens
      </button>
    </div>
  );
}
