import { expect } from 'chai';
import { flipMerge } from '../src/flipMerge.js';

describe('flipMerge function tests', () => {
  it('should return null/undefined if argument is null or undefined', () => {
    expect(flipMerge(null)).to.equal(null);
    expect(flipMerge(undefined)).to.equal(undefined);
  });

  it('should return an empty object if argument is an empty object', () => {
    const obj = {};
    const expectedObj = {};
    expect(flipMerge(obj)).to.deep.equal(expectedObj);
  });

  it('should properly invert and merge properties and keys in an object', () => {
    const obj = {
      name: 'John',
      age: 999,
      id: 1,
      active: false,
    };
    const expectedObj = {
      name: 'John',
      age: 999,
      id: 1,
      active: false,
      John: 'name',
      999: 'age',
      1: 'id',
      false: 'active',
    };
    expect(flipMerge(obj)).to.deep.equal(expectedObj);
  });

  it('should handle primitive strings properly', () => {
    const expectedObj = {
      0: 't',
      1: 'e',
      2: 'm',
      3: 'p',
      t: '0',
      e: '1',
      m: '2',
      p: '3',
    };
    expect(flipMerge('temp')).to.deep.equal(expectedObj);
  });

  it('should return a Map if the object has non-primitive values', () => {
    const obj = {
      name: 'John',
      age: { years: 30 },
      id: [1, 2, 3],
      active: false,
    };
    const result = flipMerge(obj);

    expect(result).to.be.an.instanceof(Map);
    expect(result.size).to.be.equal(8);
    expect(result.get('John')).to.equal('name');
    expect(result.get(false)).to.equal('active');
    expect(result.get(obj.age)).to.equal('age');
    expect(result.get(obj.id)).to.equal('id');
  });

  it('should handle objects with mixed primitive and non-primitive values', () => {
    const obj = {
      name: 'John',
      age: 30,
      id: [1, 2, 3],
      active: false,
    };
    const result = flipMerge(obj);

    // Since we cannot import flipAsMap, we check for instance of Map
    expect(result).to.be.an.instanceof(Map);

    // Check that the Map has the correct values
    expect(result.get('John')).to.equal('name');
    expect(result.get(30)).to.equal('age');
    expect(result.get(false)).to.equal('active');
    expect(result.get(obj.id)).to.equal('id');
  });
});
