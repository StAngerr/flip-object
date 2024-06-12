// increments suffix for repeatable keys
export const increment = () => {
  let lastIndex = 0;

  return function (obj, futureKey, futureValue) {
    if (obj[futureKey]) {
      obj[`${futureKey}_${lastIndex}`] = futureValue;
      lastIndex++;
    } else {
      obj[futureKey] = futureValue;
    }
    return obj;
  };
};

// merges all values for repeatable key in array
export const mergeValues = () => {
  return function (obj, futureKey, futureValue) {
    if (obj[futureKey]) {
      if (Array.isArray(obj[futureKey])) {
        obj[futureKey].push(futureValue);
      } else {
        obj[futureKey] = [obj[futureKey], futureValue];
      }
    } else {
      obj[futureKey] = futureValue;
    }
    return obj;
  };
};

// skips flipping repeatable properties
export const ignoreRepeatable = () => {
  const repeatableKeys = new Set();
  return function (obj, futureKey, futureValue) {
    if (obj[futureKey] || repeatableKeys.has(futureKey)) {
      delete obj[futureKey];
      repeatableKeys.add(futureKey);
    } else {
      obj[futureKey] = futureValue;
    }
    return obj;
  };
};

export const defaultStrategy = () => (obj, futureKey, futureValue) => {
  obj[futureKey] = futureValue;
  return obj;
};
