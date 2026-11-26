// Desktop-first: brand panel + form side by side; on phones / installed PWA it collapses to one column.
const perks = [
  ['Ready before you are', "Today's plan is waiting when you open your laptop."],
  ['Someday tasks get a slot', 'The things you keep putting off finally get time.'],
  ['Catch-up without guilt', 'Fall behind and Kutitap quietly reshuffles your day.'],
];

export default function Login({ onDemo }: { onDemo: () => void }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[1.1fr_1fr]">
      {/* Brand panel (desktop) */}
      <aside className="hidden flex-col justify-between bg-bg-alt px-14 py-12 lg:flex">
        <a href="/" className="flex items-center gap-3 standalone:pointer-events-none">
          <img src="/assets/kutitap-icon.png" alt="" className="h-10 w-10 rounded-[10px]" />
          <span className="font-heading text-2xl font-bold">Kutitap</span>
        </a>

        <div className="flex max-w-lg flex-col gap-8">
          <img src="/assets/titap-hero.png" alt="Titap, the Kutitap firefly, glowing" className="w-44" />
          <div className="flex flex-col gap-3">
            <p className="font-heading font-semibold text-accent">Hindi na ningas cogon.</p>
            <h2 className="font-heading text-5xl leading-[1.05] font-bold tracking-tight">
              Your someday tasks, finally done.
            </h2>
          </div>
          <ul className="flex flex-col gap-4">
            {perks.map(([title, text]) => (
              <li key={title} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_12px_#FFD966]" />
                <span>
                  <span className="font-semibold">{title}.</span> <span className="text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-subtle">© 2026 Kutitap · Made in the Philippines</p>
      </aside>

      {/* Form */}
      <main className="flex min-h-screen flex-col justify-center px-6 py-10 lg:min-h-0 lg:px-16">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-8">
          {/* Compact brand (phones / PWA) */}
          <div className="flex flex-col items-center gap-2 text-center lg:hidden">
            <img src="/assets/titap-hero.png" alt="Titap, the Kutitap firefly, glowing" className="w-28" />
            <p className="font-heading font-semibold text-accent">Hindi na ningas cogon.</p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl font-semibold">Log in to Kutitap</h1>
            <p className="text-muted">We'll email you a link. No password needed.</p>
          </div>

          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email" className="text-sm font-medium text-muted">Email address</label>
            <input
              id="email"
              type="email"
              disabled
              placeholder="you@email.com"
              className="h-13 rounded-xl border border-border-strong bg-surface px-4 text-text disabled:opacity-60"
            />
            <button type="submit" disabled className="h-13 rounded-xl bg-accent font-semibold text-on-accent disabled:opacity-50">
              Send me a sign-in link
            </button>
            <div className="flex items-center gap-3 text-sm text-subtle">
              <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>
            <button type="button" disabled className="h-13 rounded-xl border border-border-strong font-medium text-text disabled:opacity-50">
              Continue with Google
            </button>
          </form>

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm text-muted">
              Sign-in opens with the beta.{' '}
              <a href="/#waitlist" className="text-accent underline">Join the waitlist</a> to get in first.
            </p>
            <button
              onClick={onDemo}
              className="min-h-11 rounded-xl bg-surface-raised px-4 font-medium text-text hover:bg-border"
            >
              Try the demo
            </button>
          </div>

          <a href="/" className="text-center text-sm text-subtle hover:text-text standalone:hidden">
            ← Back to getkutitap.com
          </a>
        </div>
      </main>
    </div>
  );
}
