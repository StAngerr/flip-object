import { isNil } from './utils/utils.js';

/**
 * Flips the keys and values of a Map instance.
 *
 * @param {Map} original - The Map instance to flip.
 * @returns {Map} The flipped Map instance with keys and values swapped.
 */
export const flipMap = (original) => {
  const flipped = new Map();

  if (isNil(original)) return original;

  for (let [key, value] of original) {
    flipped.set(value, key);
  }

  return flipped;
};
