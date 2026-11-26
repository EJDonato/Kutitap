// Interactive "Today" card on the landing page. Scripted on the PRD catch-up rules (F10.1, F11.2):
// fixed blocks never move, skipped work goes to the next free slot, partial work becomes a follow-up.
// shortcut: hard-coded free slots instead of the real scheduler; switch once catch-up mode exists in plan.ts.

type Item = {
  id: string;
  min: number; // minutes after today's midnight; >= 1440 is tomorrow
  title: string;
  meta?: string;
  someday?: boolean;
  fixed?: boolean;
  status?: 'done' | 'partly' | 'moved';
};

const initial = (): Item[] => [
  { id: 'resume', min: 480, title: 'Update résumé', meta: 'Someday task · waited 41 days', someday: true },
  { id: 'work', min: 540, title: 'Work block', fixed: true },
  { id: 'apply', min: 780, title: 'Apply to 3 jobs', meta: 'Goal: Get a remote job' },
  { id: 'gym', min: 1110, title: 'Gym', meta: 'Habit · 3 of 4 this week' },
];
const initialSlots = () => [1170, 1230, 1440 + 480, 1440 + 540, 1440 + 600]; // 7:30, 8:30 tonight; then tomorrow

let items = initial();
let slots = initialSlots();
let selected: string | undefined = 'resume';
let note = '';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const list = document.getElementById('demo-list');
const checkin = document.getElementById('demo-checkin');
const bubble = document.getElementById('demo-bubble');
const card = document.getElementById('demo-phone');

const clock = (m: number) => {
  const h = Math.floor(m / 60) % 24;
  return `${h % 12 || 12}:${String(m % 60).padStart(2, '0')}`;
};
const when = (m: number) => (m >= 1440 ? `tomorrow at ${clock(m)}` : `${clock(m)} tonight`);
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const byTime = () => [...items].sort((a, b) => a.min - b.min);
const nextSlot = () => slots.shift() ?? 1440 + 660;

function nextPending(after?: Item) {
  return byTime().find((i) => !i.fixed && i.status !== 'done' && i.status !== 'partly' && i !== after);
}

function act(answer: 'done' | 'more' | 'partly' | 'skip') {
  const item = items.find((i) => i.id === selected)!;
  if (answer === 'done') {
    item.status = 'done';
    note = item.someday
      ? 'Someday task done! Titap is sparkling.'
      : item.meta?.startsWith('Goal') ? 'Goal progress! Titap glows brighter.' : 'Nice, one more block done.';
    selected = nextPending()?.id;
  } else if (answer === 'skip') {
    item.min = nextSlot();
    item.status = 'moved';
    note = `Okay lang. I moved “${item.title}” to ${when(item.min)}. Your day still fits.`;
    selected = nextPending(item)?.id ?? item.id;
  } else if (answer === 'partly') {
    item.status = 'partly';
    const follow: Item = { id: `${item.id}-rest`, min: nextSlot(), title: `Finish: ${item.title}`, meta: 'Follow-up · 30 min', someday: item.someday };
    items.push(follow);
    note = `Nice progress. The rest is now “${follow.title}” at ${when(follow.min)}.`;
    selected = nextPending()?.id;
  } else {
    const next = byTime().find((i) => i.min > item.min && i.min < 1440);
    if (next && !next.fixed) {
      next.min += 15;
      note = `Got it, 15 more minutes. I pushed “${next.title}” to ${clock(next.min)}.`;
    } else {
      note = `Got it, 15 more minutes from your buffer. ${next ? `“${next.title}” stays at ${clock(next.min)}.` : ''}`;
    }
  }
  render();
}

function render() {
  if (!list || !checkin) return;

  list.innerHTML = byTime()
    .map((i) => {
      const day = i.min >= 1440 ? '<span class="d-day">Tmrw</span>' : '';
      const badge =
        i.status === 'moved' ? '<span class="d-badge">Moved</span>'
        : i.status === 'partly' ? '<span class="d-badge d-badge-muted">Partly done</span>'
        : '';
      const meta = i.meta ? `<span class="${i.someday ? 'd-tag' : 'd-meta'}">${esc(i.meta)}</span>` : '';
      return `<button type="button" class="d-row" data-id="${i.id}" style="view-transition-name: d-${i.id}"
          aria-pressed="${i.id === selected}" ${i.status === 'done' || i.status === 'partly' ? 'disabled' : ''}>
        <span class="d-time">${day}${clock(i.min)}</span>
        <span class="d-body"><span class="d-title${i.status === 'done' ? ' d-done' : ''}">${i.status === 'done' ? '✓ ' : ''}${esc(i.title)}</span>${meta}${badge}</span>
      </button>`;
    })
    .join('');

  const item = items.find((i) => i.id === selected);
  let body: string;
  if (!item) {
    body = '<span class="d-q">That\'s everything for today. Titap is glowing.</span>';
  } else if (item.fixed) {
    body = `<span class="d-q">“${esc(item.title)}” is a fixed block. Kutitap plans everything else around it.</span>`;
  } else {
    body = `<span class="d-q">Did you finish “${esc(item.title)}”?</span>
      <span class="d-btns">
        <button type="button" class="d-btn d-btn-primary" data-act="done">Done</button>
        <button type="button" class="d-btn" data-act="more">+15 min</button>
        <button type="button" class="d-btn" data-act="partly">Partly</button>
        <button type="button" class="d-btn" data-act="skip">Skip</button>
      </span>`;
  }
  checkin.innerHTML = body;
  const idle = !item ? 'That’s everything for today. I’m glowing!'
    : item.fixed ? `“${item.title}” stays put. I plan around it.`
    : `Up next: “${item.title}”. You got this.`;
  if (bubble) bubble.innerHTML = `<b>Titap</b>${esc(note || idle)}`;
}

function update(fn: () => void) {
  const vt = (document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition;
  if (vt && !reducedMotion) vt.call(document, fn);
  else fn();
}

function reset() {
  items = initial();
  slots = initialSlots();
  selected = 'resume';
  note = '';
  render();
}

list?.addEventListener('click', (e) => {
  const row = (e.target as HTMLElement).closest<HTMLButtonElement>('.d-row');
  if (!row || row.disabled) return;
  selected = row.dataset.id;
  note = '';
  render();
});

checkin?.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-act]')?.dataset.act;
  if (a) update(() => act(a as 'done' | 'more' | 'partly' | 'skip'));
});

const date = document.querySelector('.app-date');
if (date) date.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
render();

// ── Autoplay: a fake cursor clicks through a loop; stops for good once the visitor interacts. ──
let stopped = reducedMotion || !card;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const cursor = document.createElement('span');
cursor.className = 'd-cursor';
cursor.setAttribute('aria-hidden', 'true');
cursor.innerHTML =
  '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 2l15 11-6.5 1.2L16 21l-3 1.4-3.4-6.9L4 20z" fill="#fff" stroke="#14213A" stroke-width="1.6" stroke-linejoin="round"/></svg>';

const stopAutoplay = (e: Event) => {
  if (!e.isTrusted || stopped) return;
  stopped = true;
  cursor.remove();
};
card?.addEventListener('pointerdown', stopAutoplay);
card?.addEventListener('keydown', stopAutoplay);

async function clickOn(selector: string) {
  const el = card!.querySelector<HTMLElement>(selector);
  if (!el || stopped) return;
  // Scroll the phone's list (never the page) so the target is visible.
  if (list && list.contains(el)) {
    list.scrollTo({ top: el.offsetTop - list.offsetTop - 8, behavior: 'smooth' });
    await sleep(350);
  }
  const c = card!.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  cursor.style.transform = `translate(${r.left - c.left + r.width * 0.55}px, ${r.top - c.top + r.height * 0.5}px)`;
  await sleep(900);
  if (stopped) return;
  cursor.classList.add('d-press');
  await sleep(180);
  cursor.classList.remove('d-press');
  if (!stopped) el.click();
}

async function autoplay() {
  card!.append(cursor);
  const c = card!.getBoundingClientRect();
  cursor.style.transform = `translate(${c.width - 60}px, ${c.height - 40}px)`;
  await sleep(1500);
  while (!stopped) {
    cursor.style.opacity = '1';
    await clickOn('[data-act=skip]'); // Update résumé -> moved to tonight
    await sleep(2600);
    await clickOn('[data-act=done]'); // Apply to 3 jobs -> goal progress
    await sleep(2600);
    await clickOn('.d-row[data-id=gym]');
    await sleep(500);
    await clickOn('[data-act=partly]'); // Gym -> follow-up later
    await sleep(3200);
    if (stopped) break;
    cursor.style.opacity = '0';
    await sleep(400);
    update(reset);
    list?.scrollTo({ top: 0 });
    await sleep(1800);
  }
}
if (!stopped) autoplay();
