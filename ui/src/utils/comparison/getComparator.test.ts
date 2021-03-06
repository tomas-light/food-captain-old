import { getComparator } from './getComparator';

jest.mock('./ascendingComparator');
import { ascendingComparator } from './ascendingComparator';

jest.mock('./descendingComparator');
import { descendingComparator } from './descendingComparator';

class NumberItem {
  prop: number;
  prop2: number;

  constructor(prop: number) {
    this.prop = prop;
    this.prop2 = 44;
  }
}

test('asc', () => {
  const comparatorFn = getComparator<NumberItem>('asc', 'prop');
  const mockedFn = ascendingComparator as jest.MockedFunction<typeof ascendingComparator>;

  expect(mockedFn).toHaveBeenCalledTimes(0);

  comparatorFn(
    new NumberItem(1),
    new NumberItem(2),
  );

  expect(mockedFn).toHaveBeenCalledTimes(1);
});

test('desc', () => {
  const comparatorFn = getComparator<NumberItem>('desc', 'prop');
  const mockedFn = descendingComparator as jest.MockedFunction<typeof descendingComparator>;

  expect(mockedFn).toHaveBeenCalledTimes(0);

  comparatorFn(
    new NumberItem(1),
    new NumberItem(2),
  );

  expect(mockedFn).toHaveBeenCalledTimes(1);
});
