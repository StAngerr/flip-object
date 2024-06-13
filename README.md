# flip-object

`flip-object` is a utility package that provides functions to invert objects by swapping their keys and values.

## Installation

```bash
npm install flip-object --save
```

### API Reference

#### Methods

##### flip

- **flip(original, strategy?)**
  Flips the keys and values of an object based on a provided strategy.

##### flipMap

- **flipMap(original)**
  Flips the keys and values of a Map instance.

##### flipMerge

- **flipMerge(original)**
  Flips the keys and values of an object, merging the result with the original object.

##### flipMergeMap

- **flipMergeMap(original)**
  Flips the keys and values of a Map instance, merging the result with the original Map.

#### Default Strategies

##### increment

- **increment()**
  Returns a function that increments keys with "_i" suffixes for repeatable keys.

##### mergeValues

- **mergeValues()**
  Returns a function that merges values into arrays for repeatable keys.

##### ignoreRepeatable

- **ignoreRepeatable()**
  Returns a function that skips flipping repeatable keys.


## Usage

### Basic Usage

```javascript
import { flip } from 'flip-object';

const obj = { prop1: 'value1', prop2: 'value2' };
console.log(flip(obj)); // OUTPUT: { value1: 'prop1', value2: 'prop2' }
```
### Working with Maps

When working with `Map` objects, you can use the following functions provided by `flip-object`:

#### flipMap

The `flipMap` function inverts a `Map`, swapping keys and values:

```javascript
import { flipMap } from 'flip-object';

const test = new Map([
  ['user', { name: 'user' }],
  ['getName', console.log],
  ['prop1', 100],
]);

console.log(flipMap(test));
/*
 Map(3) {
  { name: 'user' } => 'user',
  [Function: log] => 'getName',
  100 => 'prop1'
}
*/
```

#### flipMergeMap

The `flipMergeMap` function not only inverts a `Map` but also merges its previous key-value pairs with the inverted ones:

```javascript
import { flipMergeMap } from 'flip-object';

const test = new Map([
  ['user', { name: 'user' }],
  ['getName', console.log],
  ['prop1', 100],
]);

console.log(flipMergeMap(test));
/*
Map(6) {
  'user' => { name: 'user' },
  'getName' => [Function: log],
  'prop1' => 100,
  { name: 'user' } => 'user',
  [Function: log] => 'getName',
  100 => 'prop1'
}
*/
```

**Note:** Currently, `Map` invert functions (`flipMap` and `flipMergeMap`) do not support merge strategies; all repeatable keys will be overwritten.

Feel free to contribute or report issues to make this package even better!


### Handling Repetitions

In case an object has repeating values, you can apply strategies to handle these repetitions. For example, to merge all repeatable values into an array, use the `mergeValues` strategy:

```javascript
import { flip, STRATEGIES } from 'flip-object';

const obj = {
    prop1: 'repeat1',
    prop2: 'repeat1',
    prop3: 'repeat1',
    prop4: 'repeat2',
};

console.log(flip(obj, STRATEGIES.mergeValues));
// OUTPUT: { repeat1: ['prop1', 'prop2', 'prop3'], repeat2: 'prop4' }
```

By default, if no strategy is provided, the last repeatable value will be set as the key in the object.

### Handling Non-Primitive Values

When your object contains non-primitive values, they will be automatically transformed into a `Map`.

```javascript
import { flip } from 'flip-object';

const obj = {
    test: [],
    user: { name: 'test' },
};

console.log(flip(obj));
// OUTPUT: Map(2) { [] => 'test', { name: 'test' } => 'user' }
```

## Merge Strategies

This package comes with a set of built-in strategies to handle different cases of value repetition. You can import and use these strategies as needed:

- `STRATEGIES.mergeValues`: Merges all repeatable values into an array.
- `STRATEGIES.increment`: Adds an "_i" suffix, where i is an incremental sequence of numbers (1, 2, 3, 4, 5, ...n), to repeatable keys.
- `STRATEGIES.ignoreRepeatable`: Skips all repeatable keys (keeps only the original one).

Feel free to contribute or report issues to make this package even better!

It is also possible to pass a custom implementation of a merge strategy as the second argument. This should be a function that returns another function, which will receive three arguments: the target object, the future key (flipped value), and the future value (flipped key). The inner function should return the modified object.

```javascript
export const customStrategy = () => {
  // you can use this closure to handle some state or memoization
  return (obj, futureKey, futureValue) => {
    // your implementation here
    return obj;
  };
};

flip(obj, customStrategy)


```

Here is an example:
```javascript

export const customStrategy = () => {
  return (obj, futureKey, futureValue) => {
    if (obj[futureKey]) {
      if (!obj.repeatableEntries) {
        obj.repeatableEntries = [[futureKey, futureValue]];
      } else {
        obj.repeatableEntries.push([futureKey, futureValue]);
      }
    } else {
      obj[futureKey] = futureValue;
    }

    return obj;
  };
};

const obj = {
  prop1: 'v1',
  prop2: 'v1',
  prop3: 'v1',
  prop4: 'v2',
};

console.log(flip(obj, customStrategy));
/*{
  v1: 'prop1',
  repeatableEntries: [ [ 'v1', 'prop2' ], [ 'v1', 'prop3' ] ],
  v2: 'prop4'
}
*/
```

Feel free to contribute or report issues to make this package even better!

## License

This project is licensed under the MIT License.
