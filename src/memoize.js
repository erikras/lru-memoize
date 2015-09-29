import singletonCache from './singletonCache';
import lruCache from './lruCache';
import deepEquals from './deepEquals';

function createCache(limit, equals) {
  return limit === 1 ? singletonCache(equals) : lruCache(limit, equals);
}

export default function memoize(...config) {
  let limit = 1;
  let equals = (valueA, valueB) => valueA === valueB;
  let deepObjects = false;
  if (typeof config[0] === 'number') {
    limit = config.shift();
  }
  if (typeof config[0] === 'function') {
    equals = config.shift();
  }
  if (typeof config[0] === 'boolean') {
    deepObjects = config[0];
  }

  const cache = createCache(limit, deepEquals(equals, deepObjects));

  return (fn) => (...args) => {
    let value = cache.get(args);
    if (value === undefined) {
      value = fn.apply(fn, args);
      cache.put(args, value);
    }
    return value;
  };
}
