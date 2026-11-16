export interface TimezoneOption {
  value: string;
  label: string;
  offsetMinutes: number;
}

export const BEST_TIME_SLOTS = [
  { id: 'Weekday mornings', label: 'Weekday mornings', startHour: 9, endHour: 12 },
  { id: 'Weekday afternoons', label: 'Weekday afternoons', startHour: 13, endHour: 17 },
  { id: 'Weekday evenings', label: 'Weekday evenings', startHour: 18, endHour: 21 },
  { id: 'Weekends', label: 'Weekends', startHour: 10, endHour: 18 },
] as const;

export const LEVEL_OPTIONS = [
  'Beginner (A1–A2)',
  'Intermediate (B1–B2)',
  'Advanced (C1+)',
  "I'm not sure",
] as const;

const COMMON_TIMEZONES = [
  'America/Toronto',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Vancouver',
  'America/Mexico_City',
  'America/Bogota',
  'America/Lima',
  'America/Buenos_Aires',
  'America/Sao_Paulo',
  'Europe/London',
  'Europe/Dublin',
  'Europe/Madrid',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Rome',
  'Europe/Amsterdam',
  'Europe/Zurich',
  'Europe/Istanbul',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Australia/Sydney',
  'Pacific/Auckland',
];

export function detectUserTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && typeof tz === 'string') return tz;
  } catch {
    // ignore
  }
  return 'America/Toronto';
}

export function getOffsetMinutes(timeZone: string, date = new Date()): number {
  try {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
    return Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
  } catch {
    return -300; // default EST fallback
  }
}

export function formatUtcOffset(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const hrs = String(Math.floor(abs / 60)).padStart(2, '0');
  const mins = String(abs % 60).padStart(2, '0');
  return `UTC${sign}${hrs}:${mins}`;
}

export function formatHour12(hourFloat: number): { label: string; dayShift: number } {
  let dayShift = 0;
  let normalized = hourFloat;
  while (normalized < 0) {
    normalized += 24;
    dayShift -= 1;
  }
  while (normalized >= 24) {
    normalized -= 24;
    dayShift += 1;
  }

  const totalMinutes = Math.round(normalized * 60);
  const hrs24 = Math.floor(totalMinutes / 60) % 24;
  const mins = totalMinutes % 60;
  const period = hrs24 >= 12 ? 'PM' : 'AM';
  const hrs12 = hrs24 % 12 === 0 ? 12 : hrs24 % 12;
  const minStr = mins === 0 ? '' : `:${String(mins).padStart(2, '0')}`;
  return { label: `${hrs12}${minStr} ${period}`, dayShift };
}

export function getTimezoneOptions(detectedTz?: string): TimezoneOption[] {
  const now = new Date();
  const zones = new Set<string>(COMMON_TIMEZONES);
  if (detectedTz) {
    zones.add(detectedTz);
  }

  return Array.from(zones)
    .map((tz) => {
      const offsetMinutes = getOffsetMinutes(tz, now);
      const city = tz.replace(/_/g, ' ');
      return {
        value: tz,
        label: `${city} (${formatUtcOffset(offsetMinutes)})`,
        offsetMinutes,
      };
    })
    .sort((a, b) => a.offsetMinutes - b.offsetMinutes || a.value.localeCompare(b.value));
}

export function convertBestTimesToToronto(
  studentTimezone: string,
  selectedSlots: string[],
  referenceDate = new Date()
): string {
  if (!selectedSlots.length) return '';

  const studentOffset = getOffsetMinutes(studentTimezone, referenceDate);
  const torontoOffset = getOffsetMinutes('America/Toronto', referenceDate);
  const diffHours = (torontoOffset - studentOffset) / 60;

  return selectedSlots
    .map((slotName) => {
      const slot = BEST_TIME_SLOTS.find((s) => s.id === slotName);
      if (!slot) return slotName;

      const start = formatHour12(slot.startHour + diffHours);
      const end = formatHour12(slot.endHour + diffHours);
      const shiftNote =
        start.dayShift > 0
          ? ' (next day in Toronto)'
          : start.dayShift < 0
            ? ' (prev day in Toronto)'
            : '';

      return `${slot.label}: ${start.label}–${end.label} Toronto${shiftNote}`;
    })
    .join(' | ');
}

export function formatTorontoTimestamp(date = new Date()): string {
  try {
    return (
      date.toLocaleString('en-CA', {
        timeZone: 'America/Toronto',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }) + ' (Toronto)'
    );
  } catch {
    return date.toISOString();
  }
}
