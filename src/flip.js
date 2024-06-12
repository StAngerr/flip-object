import { flipAsMap, hasNonPrimitiveValues, isNil } from './utils/utils.js';
import { defaultStrategy } from './strategies/strategies.js';

export const flip = (original, strategy = defaultStrategy) => {
  const flipped = {};
  const st = strategy();

  if (isNil(original)) return original;

  if (hasNonPrimitiveValues(original)) return flipAsMap(original);

  Object.keys(original).reduce((acc, key) => {
    return st(acc, original[key], key);
  }, flipped);

  return flipped;
};
