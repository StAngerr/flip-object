import { flipAsMap, hasNonPrimitiveValues, isNil } from './utils/utils';
import { defaultStrategy } from './strategies/strategies';

/**
 * Flips the keys and values of an object based on a provided strategy.
 *
 * @param {Object} original - The object to flip.
 * @param {Function} [strategy=defaultStrategy] - A function that returns a function to handle the flipping strategy.
 * The strategy function takes three arguments: the accumulator object, a value from the original object, and the key from the original object.
 * @returns {Object} The flipped object.
 */
export const flip = <T extends string | number | symbol>(
  original: Record<string, T>,
  strategy: Function = defaultStrategy,
): Record<T, string> | typeof original | Map<T, string> => {
  const flipped = {};
  const st = strategy();

  if (isNil(original)) return original;

  if (hasNonPrimitiveValues(original)) return flipAsMap(original);

  Object.keys(original).reduce((acc, key) => {
    return st(acc, original[key], key);
  }, flipped);

  return flipped;
};
