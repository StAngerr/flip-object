import { flip } from './flip.js';
import { flipMerge } from './flipMerge.js';
import { flipMap } from './flipMap.js';
import { flipMergeMap } from './flipMergeMap';
import {
  ignoreRepeatable,
  increment,
  mergeValues,
} from './strategies/strategies.js';

const STRATEGIES = {
  mergeValues,
  increment,
  ignoreRepeatable,
};

export { flip, flipMerge, flipMap, flipMergeMap, STRATEGIES };
