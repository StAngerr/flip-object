import { expect } from 'chai';
import { flipMergeMap } from '../src/flipMergeMap.js';

describe('flipMergeMap', () => {
  it('should return a new Map with flipped key-value pairs', () => {
    const original = new Map([
      ['key1', 'value1'],
      ['key2', 'value2'],
    ]);
    const flipped = flipMergeMap(original);
    expect(flipped.get('value1')).to.equal('key1');
    expect(flipped.get('value2')).to.equal('key2');
  });

  it('should merge values in case of duplicate values', () => {
    const original = new Map([
      ['key1', 'value1'],
      ['key2', 'value1'],
    ]);
    const flipped = flipMergeMap(original);
    expect(flipped.get('value1')).to.equal('key2'); // key2 is the last one to map to value1
    expect(flipped.get('key1')).to.equal('value1');
  });

  it('should handle empty Map', () => {
    const original = new Map();
    const flipped = flipMergeMap(original);
    expect(flipped.size).to.equal(0);
  });

  it('should handle Map with non-string values', () => {
    const original = new Map([
      [1, 'value1'],
      ['key2', 2],
      [true, false],
    ]);
    const flipped = flipMergeMap(original);
    expect(flipped.get('value1')).to.equal(1);
    expect(flipped.get(2)).to.equal('key2');
    expect(flipped.get(false)).to.equal(true);
  });

  it('should handle Map with objects as values', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const original = new Map([
      ['key1', obj1],
      ['key2', obj2],
    ]);
    const flipped = flipMergeMap(original);
    expect(flipped.get(obj1)).to.equal('key1');
    expect(flipped.get(obj2)).to.equal('key2');
  });
});
