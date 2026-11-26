export default function Login({ onDemo }: { onDemo: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-8 px-6 py-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <img src="/assets/titap-hero.png" alt="Titap, the Kutitap firefly, glowing" className="w-36" />
        <h1 className="font-heading text-3xl font-semibold">Welcome to Kutitap</h1>
        <p className="text-muted">Hindi na ningas cogon. Your plan for today is waiting.</p>
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
        <button
          type="submit"
          disabled
          className="h-13 rounded-xl bg-accent font-semibold text-on-accent disabled:opacity-50"
        >
          Send me a sign-in link
        </button>
        <p className="text-sm text-subtle">
          Sign-in opens with the beta. <a href="/#waitlist" className="text-accent underline">Join the waitlist</a>
        </p>
      </form>

      <button
        onClick={onDemo}
        className="min-h-11 rounded-xl border border-border-strong px-4 font-medium text-text hover:bg-surface-raised"
      >
        Try the demo
      </button>
    </main>
  );
}
