import { flipMergeAsMap, hasNonPrimitiveValues, isNil } from './utils/utils';

/**
 * Flips the keys and values of an object, merging the result with the original object.
 *
 * @param {Object} original - The object to flip.
 * @returns {Object} The flipped and merged object.
 */
export const flipMerge = (
  original: Record<string, any>,
): object | typeof original => {
  const flipped = Object.assign({}, original);

  if (isNil(original)) return original;

  if (hasNonPrimitiveValues(flipped)) return flipMergeAsMap(original);

  Object.keys(original).reduce((acc, key) => {
    acc[original[key]] = key;
    return acc;
  }, flipped);

  return flipped;
};

export default flipMerge;
