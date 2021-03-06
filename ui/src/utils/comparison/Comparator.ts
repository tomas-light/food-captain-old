import { ComparisonResult } from '@utils/comparison/ComparisonResult';

export type Comparator<TItem> = (left: TItem, right: TItem) => ComparisonResult;
