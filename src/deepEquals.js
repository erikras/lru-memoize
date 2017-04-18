const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
export default function deepEquals(equals, deepObjects) {
  function deep(valueA, valueB) {
    if (equals(valueA, valueB)) {
      return true;
    }

    if (Array.isArray(valueA)) {
      if (!Array.isArray(valueB) || valueA.length !== valueB.length) {
        return false;
      }

      // Check deep equality of each value in A against the same indexed value in B
      if (!valueA.every((value, index) => deep(value, valueB[index]))) {
        return false;
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

      // Should we compare with shallow equivalence or deep equivalence?
      const equalityChecker = deepObjects ? deep : equals;

      // Check if objects share same keys, and each of those keys are equal
      if (!aKeys.every(
        aKey => (
          hasOwn(valueA, aKey) && (
            hasOwn(valueB, aKey) || equalityChecker(valueA[aKey], valueB[aKey])
          )
        )
      )) { return false; }

      // could not find unequal keys or values
      return true;
    }
    return false;
  }

  return deep;
}
