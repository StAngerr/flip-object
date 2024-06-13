import { expect } from 'chai';
import {
  increment,
  mergeValues,
  ignoreRepeatable,
  defaultStrategy,
} from '../../src/strategies/strategies.ts';

describe('increment', () => {
  it('should add new key if it does not exist', () => {
    const inc = increment();
    const obj = {};
    const result = inc(obj, 'key1', 'value1');
    expect(result).to.deep.equal({ key1: 'value1' });
  });

  it('should add incremented key if key already exists', () => {
    const inc = increment();
    let obj = { key1: 'value1' };
    obj = inc(obj, 'key1', 'value2');
    obj = inc(obj, 'key1', 'value3');
    expect(obj).to.deep.equal({
      key1: 'value1',
      key1_0: 'value2',
      key1_1: 'value3',
    });
  });
});

describe('mergeValues', () => {
  it('should add new key if it does not exist', () => {
    const merge = mergeValues();
    const obj = {};
    const result = merge(obj, 'key1', 'value1');
    expect(result).to.deep.equal({ key1: 'value1' });
  });

  it('should merge values into an array if key already exists', () => {
    const merge = mergeValues();
    let obj = { key1: 'value1' };
    obj = merge(obj, 'key1', 'value2');
    obj = merge(obj, 'key1', 'value3');
    expect(obj).to.deep.equal({ key1: ['value1', 'value2', 'value3'] });
  });

  it('should add to existing array if key is already an array', () => {
    const merge = mergeValues();
    let obj = { key1: ['value1'] };
    obj = merge(obj, 'key1', 'value2');
    expect(obj).to.deep.equal({ key1: ['value1', 'value2'] });
  });
});

describe('ignoreRepeatable', () => {
  it('should add new key if it does not exist', () => {
    const ignore = ignoreRepeatable();
    const obj = {};
    const result = ignore(obj, 'key1', 'value1');
    expect(result).to.deep.equal({ key1: 'value1' });
  });

  it('should ignore repeatable key and delete it if it already exists', () => {
    const ignore = ignoreRepeatable();
    let obj = { key1: 'value1' };
    obj = ignore(obj, 'key1', 'value2');
    expect(obj).to.not.have.property('key1');
  });

  it('should not re-add a key once it has been ignored', () => {
    const ignore = ignoreRepeatable();
    let obj = { key1: 'value1' };
    obj = ignore(obj, 'key1', 'value2');
    obj = ignore(obj, 'key1', 'value3');
    expect(obj).to.not.have.property('key1');
  });
});

describe('defaultStrategy', () => {
  it('should add new key if it does not exist', () => {
    const defaultStrat = defaultStrategy();
    const obj = {};
    const result = defaultStrat(obj, 'key1', 'value1');
    expect(result).to.deep.equal({ key1: 'value1' });
  });

  it('should overwrite existing key with new value', () => {
    const defaultStrat = defaultStrategy();
    let obj = { key1: 'value1' };
    obj = defaultStrat(obj, 'key1', 'value2');
    expect(obj).to.deep.equal({ key1: 'value2' });
  });
});
