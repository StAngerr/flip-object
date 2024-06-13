import { isNil } from './utils/utils';

/**
 * Flips the keys and values of a Map instance, merging the result with the original Map.
 *
 * @param {Map} original - The Map instance to flip and merge.
 * @returns {Map} The flipped and merged Map instance with keys and values swapped.
 */
export const flipMergeMap = <T, V>(
  original: Map<T, V> | null | undefined,
): Map<T | V, V | T> | typeof original => {
  const flipped: Map<T | V, V | T> = new Map(original);

  if (isNil(original)) return original as null | undefined;

  for (let [key, value] of original!) {
    flipped.set(value, key);
  }

  return flipped;
};

export default flipMergeMap;
