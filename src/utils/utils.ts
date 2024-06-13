export const isNil = (value: any): boolean => value == null;

export const hasNonPrimitiveValues = (checkObj: Record<string, any>) =>
  Object.values(checkObj).some(
    (i) => typeof i === 'object' || i instanceof Object,
  );

export const flipAsMap = (original: Record<string, any>) => {
  const flipped = new Map();

  Object.keys(original).forEach((key) => flipped.set(original[key], key));

  return flipped;
};

export const flipMergeAsMap = (original: Record<string, any>) => {
  const flipped = new Map(Object.entries(original));

  Object.keys(original).forEach((key) => flipped.set(original[key], key));

  return flipped;
};
