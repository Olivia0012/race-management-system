import { isValidPlacements } from './helper';

test('helper test true', () => {
  expect(isValidPlacements([1, 1, 3, 4])).toBe(true);
});

test('helper test false', () => {
  expect(isValidPlacements([1, 1, 2, 4])).toBe(false);
});

test('return false when passed in empty array', () => {
  expect(isValidPlacements([])).toBe(false);
});

test('return false when smallest place is greater than 1', () => {
  expect(isValidPlacements([2, 4])).toBe(false);
});
