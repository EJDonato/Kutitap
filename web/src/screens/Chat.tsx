import { useState } from 'react';
import { Icon, SomedayTag, Titap } from '../ui.tsx';

// Static sample conversation (mobile-chat mockup); sending just echoes until the AI is wired.
export default function Chat() {
  const [added, setAdded] = useState(false);
  const [sent, setSent] = useState<string[]>([]);
  const [text, setText] = useState('');

  return (
    <main className="mx-auto flex h-screen w-full max-w-2xl flex-col">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button onClick={() => history.back()} aria-label="Back" className="flex h-11 w-11 items-center justify-center rounded-[10px] hover:bg-surface">
          <Icon.back className="h-5 w-5" />
        </button>
        <Titap mood="base" className="w-10" />
        <h1 className="font-heading text-lg font-semibold">Titap</h1>
      </header>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5">
        <Me>Dentist Thursday 2pm. Also I should finally fix my website someday</Me>
        <Bot>
          <p>Got it. Here’s what I’ll add:</p>
          <div className="rounded-xl bg-surface-raised p-3.5">
            <p className="font-semibold">Dentist</p>
            <p className="text-[13px] text-subtle">Thu, Dec 3 · 2:00–3:00 PM · fixed</p>
          </div>
          <div className="flex flex-col gap-1.5 rounded-xl bg-surface-raised p-3.5">
            <p className="font-semibold">Fix my website</p>
            <SomedayTag />
            <p className="text-[13px] text-subtle">First step: list 3 things that are broken · 20 min, Sat</p>
          </div>
          <p className="text-sm text-muted">Moving Thursday’s client calls to 4 PM so they don’t clash.</p>
          {added ? (
            <p className="text-sm font-semibold text-someday">Added to your plan.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button className="btn-primary" onClick={() => setAdded(true)}>Add to plan</button>
              <button className="btn-ghost">Edit</button>
            </div>
          )}
        </Bot>
        <Me>I’m tired, can we push Figma to tomorrow?</Me>
        <Bot><p>Done. Figma moved to Fri 1 PM. Rest up. You’ve already done 2 blocks today.</p></Bot>
        {sent.map((m, i) => (
          <div key={i} className="contents">
            <Me>{m}</Me>
            <Bot><p className="text-muted">I’ll be able to do this once I’m connected. For now this is a demo.</p></Bot>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2.5 px-3 pb-4">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {['I’m running late', 'Free this afternoon', 'What’s next?'].map((c) => (
            <button key={c} className="chip shrink-0 whitespace-nowrap" onClick={() => setText(c)}>{c}</button>
          ))}
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); if (text.trim()) { setSent([...sent, text.trim()]); setText(''); } }}
          className="flex items-center gap-2.5 rounded-2xl border border-accent bg-surface py-2 pr-2 pl-4"
        >
          <label htmlFor="msg" className="sr-only">Message Titap</label>
          <input id="msg" value={text} onChange={(e) => setText(e.target.value)} placeholder="Message Titap…" autoFocus
            className="h-11 min-w-0 flex-1 bg-transparent placeholder:text-subtle focus:outline-none" />
          <button type="submit" aria-label="Send" className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-accent text-on-accent">
            <Icon.arrow className="h-[18px] w-[18px]" />
          </button>
        </form>
      </div>
    </main>
  );
}

const Me = ({ children }: { children: React.ReactNode }) => (
  <p className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-[15px] text-on-accent">{children}</p>
);
const Bot = ({ children }: { children: React.ReactNode }) => (
  <div className="flex max-w-[92%] flex-col gap-3 self-start rounded-2xl rounded-bl-md border border-border bg-surface p-4 text-[15px]">{children}</div>
);
