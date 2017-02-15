const hasOwn = Object.prototype.hasOwnProperty;
export default function deepEquals(equals, deepObjects) {
  function deep(valueA, valueB) {
    if (equals(valueA, valueB)) {
      return true;
    }

    if (Array.isArray(valueA)) {
      if (!Array.isArray(valueB) || valueA.length !== valueB.length) {
        return false;
      }
      for (let index = 0; index < valueA.length; index += 1) {
        if (!deep(valueA[index], valueB[index])) {
          return false;
        }
      }
      // could not find unequal items
      return true;
    }

    if (Array.isArray(valueB)) {
      return false;
    }

    if (typeof valueA === 'object') {
      if (typeof valueB !== 'object') {
        return false;
      }

      const isANull = valueA === null;
      const isBNull = valueB === null;
      if (isANull || isBNull) {
        return isANull === isBNull;
      }

      const aKeys = Object.keys(valueA);
      const bKeys = Object.keys(valueB);

      if (aKeys.length !== bKeys.length) {
        return false;
      }

      for (let index = 0; index < aKeys.length; index += 1) {
        const key = aKeys[index];
        if (
          hasOwn.call(valueA, key) &&
          (!hasOwn.call(valueB, key) || !(deepObjects ? deep : equals)(valueA[key], valueB[key]))) {
          return false;
        }
      }
      // could not find unequal keys or values
      return true;
    }
    return false;
  }

  return deep;
}
