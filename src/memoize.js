// @flow
import type { Config, Equals } from ".";
import deepEquals from "./deepEquals";
import lruCache from "./lruCache";
import singletonCache from "./singletonCache";

function createCache(limit: number, equals: Equals) {
  return limit === 1 ? singletonCache(equals) : lruCache(limit, equals);
}

function createEqualsFn(basicEquals: Equals, deepObjects: boolean) {
  // Choose strategy for basic or deep object equals
  const equals = deepObjects
    ? deepEquals(basicEquals, deepObjects)
    : basicEquals;

  return (valueA, valueB) => {
    // The arguments are always the argument array-like objects

    // Different lengths means they are not the same
    if (valueA.length !== valueB.length) {
      return false;
    }

    // Compare the values
    for (let index = 0; index < valueA.length; index += 1) {
      if (!equals(valueA[index], valueB[index])) {
        return false;
      }
    }
    // Found no conflicts
    return true;
  };
}

export default function memoize(...config: Config): Function => Function {
  let limit: number = 1;
  let equals: Equals = (valueA, valueB) => valueA === valueB;
  let deepObjects: boolean = false;

  if (typeof config[0] === "number") {
    limit = ((config.shift(): any): number);
  }
  if (typeof config[0] === "function") {
    equals = ((config.shift(): any): Function);
  } else if (typeof config[0] === "undefined") {
    // Support passing undefined equal argument;
    config.shift();
  }
  if (typeof config[0] === "boolean") {
    deepObjects = config[0];
  }

  const cache = createCache(limit, createEqualsFn(equals, deepObjects));

  return fn => (...args: any[]) => {
    let value = cache.get(args);
    if (value === undefined) {
      value = fn.apply(fn, args);
      cache.put(args, value);
    }
    return value;
  };
}
