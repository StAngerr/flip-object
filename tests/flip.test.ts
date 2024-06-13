import { expect } from 'chai';
import { flip } from '../src/flip';

describe('flip function tests', () => {
  it('should return null if argument null', () => {
    expect(flip(null)).to.equal(null);
  });

  it('should return undefined if argument is undefined', () => {
    expect(flip(undefined)).to.equal(undefined);
  });

  it('should return same same empty  object if argument is empty object', () => {
    expect(flip({})).to.be.empty;
  });

  it('should should properly invert properties and key in object ', () => {
    const obj = {
      name: 'John',
      age: 999,
      id: 1,
      active: false,
    };
    const expectedObj = {
      John: 'name',
      999: 'age',
      1: 'id',
      false: 'active',
    };

    expect(flip(obj)).to.deep.equal(expectedObj);
  });

  it('should invert primitive string propertly', () => {
    expect(flip('temp')).to.be.deep.equal({ t: '0', e: '1', m: '2', p: '3' });
  });

  it('should handle objects with non-primitive values correctly', () => {
    const obj = {
      name: 'John',
      age: { years: 30 },
      id: [1, 2, 3],
      active: false,
    };

    const result = flip(obj);

    expect(result).to.be.an.instanceof(Map);
    expect(result.size).to.be.equal(4);
  });
});
