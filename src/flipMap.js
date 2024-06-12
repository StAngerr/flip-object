import { isNil } from './utils/utils.js';

export const flipMap = (original) => {
  const flipped = new Map();

  if (isNil(original)) return original;

  for (let [key, value] of original) {
    flipped.set(value, key);
  }

  return flipped;
};
