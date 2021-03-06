import { descendingComparator } from './descendingComparator';

class StringItem {
  prop: string;
  prop2: string;

  constructor(prop: string) {
    this.prop = prop;
    this.prop2 = 'asdad';
  }
}

class NumberItem {
  prop: number;
  prop2: number;

  constructor(prop: number) {
    this.prop = prop;
    this.prop2 = 44;
  }
}

test('number 1, 2', () => {
  const result = descendingComparator(
    new NumberItem(1),
    new NumberItem(2),
    'prop'
  );
  expect(result).toBe(1);
});

test('number 2, 1', () => {
  const result = descendingComparator(
    new NumberItem(2),
    new NumberItem(1),
    'prop'
  );
  expect(result).toBe(-1);
});

test('number 2, 2', () => {
  const result = descendingComparator(
    new NumberItem(2),
    new NumberItem(2),
    'prop'
  );
  expect(result).toBe(0);
});

test('string b, c', () => {
  const result = descendingComparator(
    new StringItem('b'),
    new StringItem('c'),
    'prop'
  );
  expect(result).toBe(1);
});

test('string c, b', () => {
  const result = descendingComparator(
    new StringItem('c'),
    new StringItem('b'),
    'prop'
  );
  expect(result).toBe(-1);
});

test('string c, c', () => {
  const result = descendingComparator(
    new StringItem('c'),
    new StringItem('c'),
    'prop'
  );
  expect(result).toBe(0);
});
