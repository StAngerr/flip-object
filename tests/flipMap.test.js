import { flipMap } from '../src/flipMap.js';
import { expect } from 'chai';

describe('flipMap', () => {
  it('should flip keys and values of a non-empty Map', () => {
    const original = new Map([
      ['key1', 'value1'],
      ['key2', 'value2'],
    ]);

    const expected = new Map([
      ['value1', 'key1'],
      ['value2', 'key2'],
    ]);

    expect(flipMap(original)).to.deep.equal(expected);
  });

  it('should return null or undefined if the input is null or undefined', () => {
    expect(flipMap(null)).to.equal(null);
    expect(flipMap(undefined)).to.equal(undefined);
  });

  it('should return an empty Map if the input Map is empty', () => {
    const original = new Map();
    const expected = new Map();

    expect(flipMap(original)).to.deep.equal(expected);
  });

  it('should handle Maps with duplicate values by overwriting keys', () => {
    const original = new Map([
      ['key1', 'value1'],
      ['key2', 'value1'],
    ]);

    const expected = new Map([['value1', 'key2']]);

    expect(flipMap(original)).to.deep.equal(expected);
  });

  it('should handle Maps with non-string keys and values', () => {
    const original = new Map([
      [1, true],
      [false, 'test'],
    ]);

    const expected = new Map([
      [true, 1],
      ['test', false],
    ]);

    expect(flipMap(original)).to.deep.equal(expected);
  });
});
