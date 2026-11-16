import test from 'node:test';
import assert from 'node:assert/strict';
import {
  convertBestTimesToToronto,
  formatUtcOffset,
  getTimezoneOptions,
} from './timezoneConverter.ts';

test('formatUtcOffset formats positive, negative, and zero offsets', () => {
  assert.equal(formatUtcOffset(-300), 'UTC-05:00');
  assert.equal(formatUtcOffset(180), 'UTC+03:00');
  assert.equal(formatUtcOffset(0), 'UTC+00:00');
});

test('getTimezoneOptions injects custom detected timezone', () => {
  const options = getTimezoneOptions('Africa/Casablanca');
  assert.ok(options.some((o) => o.value === 'Africa/Casablanca'));
  assert.ok(options.some((o) => o.value === 'America/Toronto'));
});

test('convertBestTimesToToronto accurately shifts London evenings into Toronto afternoon', () => {
  // Winter date when London is UTC+0 and Toronto is UTC-5 (-5h difference)
  const janDate = new Date('2026-01-15T12:00:00Z');
  const converted = convertBestTimesToToronto('Europe/London', ['Weekday evenings'], janDate);
  assert.ok(converted.includes('Weekday evenings: 1 PM–4 PM Toronto'));
});

test('convertBestTimesToToronto preserves same time when student is in America/Toronto', () => {
  const janDate = new Date('2026-01-15T12:00:00Z');
  const converted = convertBestTimesToToronto('America/Toronto', ['Weekday mornings'], janDate);
  assert.equal(converted, 'Weekday mornings: 9 AM–12 PM Toronto');
});
