import { flipAsMap, hasNonPrimitiveValues, isNil } from './utils/utils.js';

export const flipMerge = (original) => {
  const flipped = Object.assign({}, original);

  if (isNil(original)) return original;

  if (hasNonPrimitiveValues(flipped)) return flipAsMap(original);

  Object.keys(original).reduce((acc, key) => {
    acc[original[key]] = key;
    return acc;
  }, flipped);

  return flipped;
};
