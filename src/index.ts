import { flip } from './flip';
import { flipMerge } from './flipMerge';
import { flipMap } from './flipMap';
import { flipMergeMap } from './flipMergeMap.js';
import {
  ignoreRepeatable,
  increment,
  mergeValues,
} from './strategies/strategies';

type Strategies = {
  mergeValues: typeof mergeValues;
  increment: typeof increment;
  ignoreRepeatable: typeof ignoreRepeatable;
};

const STRATEGIES: Strategies = {
  mergeValues,
  increment,
  ignoreRepeatable,
};

export { flip, flipMerge, flipMap, flipMergeMap, STRATEGIES };
