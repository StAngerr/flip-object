export const isNil = (value) => value == null;

export const hasNonPrimitiveValues = (checkObj) =>
  Object.values(checkObj).some(
    (i) => typeof i === 'object' || i instanceof Object,
  );

export const flipAsMap = (original) => {
  const flipped = new Map();

  Object.keys(original).forEach((key) => flipped.set(original[key], key));

  return flipped;
};

export const flipMergeAsMap = (original) => {
  const flipped = new Map(Object.entries(original));

  Object.keys(original).forEach((key) => flipped.set(original[key], key));

  return flipped;
};
