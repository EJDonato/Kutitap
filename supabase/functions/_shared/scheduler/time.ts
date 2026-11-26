// Local wall-clock (date + minutes after midnight) in an IANA zone -> instant. Uses Intl only.
// Minutes may exceed 1440 (after midnight). Non-existent DST times shift forward by the gap.

export function toInstant(date: string, minutes: number, timeZone: string): Date {
  const [y, m, d] = date.split('-').map(Number);
  const wall = Date.UTC(y, m - 1, d, 0, minutes);
  const t1 = wall - offsetMs(new Date(wall), timeZone);
  const t2 = wall - offsetMs(new Date(t1), timeZone);
  const valid = (t: number) => t + offsetMs(new Date(t), timeZone) === wall;
  // In a DST gap neither candidate is valid; the later one is the time shifted forward.
  return new Date(valid(t2) ? t2 : valid(t1) ? t1 : Math.max(t1, t2));
}

function offsetMs(at: Date, timeZone: string): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).formatToParts(at).map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return asUtc - Math.floor(at.getTime() / 1000) * 1000;
}
