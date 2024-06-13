/**
 * Flips the keys and values of a Map instance, merging the result with the original Map.
 *
 * @param {Map} original - The Map instance to flip and merge.
 * @returns {Map} The flipped and merged Map instance with keys and values swapped.
 */
export const flipMergeMap = (original) => {
  const flipped = new Map(original);

  for (let [key, value] of original) {
    flipped.set(value, key);
  }

  return flipped;
};
