/**
 * Returns a function that increments the key if it already exists in the object,
 * appending a unique index to the key name.
 *
 * @returns {Function} A function that accepts an object, a future key, and a future value,
 * and returns the updated object with the key-value pair.
 */
export const increment = () => {
  let lastIndex = 0;

  /**
   * Function that increments the key if it already exists in the object,
   * appending a unique index to the key name if needed.
   *
   * @param {Object} obj - The object to modify.
   * @param {string} futureKey - The key to potentially add or modify.
   * @param {*} futureValue - The value to set for the futureKey.
   * @returns {Object} The updated object with the key-value pair.
   */
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

/**
 * Returns a function that merges values into an array for repeatable keys.
 *
 * @returns {Function} A function that accepts an object, a future key, and a future value,
 * and merges the value into an array if the key already exists, otherwise sets the value as is.
 */ export const mergeValues = () => {
  /**
   * Function that merges values into an array for repeatable keys.
   *
   * @param {Object} obj - The object to modify.
   * @param {string} futureKey - The key to potentially add or modify.
   * @param {*} futureValue - The value to merge or set for the futureKey.
   * @returns {Object} The updated object with the merged or set key-value pair.
   */
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

/**
 * Returns a function that skips flipping repeatable properties.
 *
 * @returns {Function} A function that accepts an object, a future key, and a future value,
 * and skips flipping the key if it already exists or has been encountered before.
 */
export const ignoreRepeatable = () => {
  const repeatableKeys = new Set();
  /**
   * Function that skips flipping repeatable properties.
   *
   * @param {Object} obj - The object to modify.
   * @param {string} futureKey - The key to potentially add or modify.
   * @param {*} futureValue - The value to set for the futureKey.
   * @returns {Object} The updated object with the key-value pair, or the same object if the key is skipped.
   */
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

/**
 * Returns a default strategy function for flipping keys and values.
 *
 * @returns {Function} A function that accepts an object, a future key, and a future value,
 * and adds the key-value pair to the object.
 */
export const defaultStrategy = () => {
  /**
   * Default strategy function for flipping keys and values.
   *
   * @param {Object} obj - The object to modify.
   * @param {string} futureKey - The key to add or modify.
   * @param {*} futureValue - The value to set for the futureKey.
   * @returns {Object} The updated object with the key-value pair added.
   */
  return (obj, futureKey, futureValue) => {
    obj[futureKey] = futureValue;
    return obj;
  };
};
