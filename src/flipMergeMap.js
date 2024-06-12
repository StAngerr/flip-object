export const flipMergeMap = (original) => {
  const flipped = new Map(original);

  for (let [key, value] of original) {
    flipped.set(value, key);
  }

  return flipped;
};
