const hasOwn = Object.prototype.hasOwnProperty;
export default function deepEquals(equals, deepObjects) {
  function deep(a, b) {
    if (equals(a, b)) {
      return true;
    }

    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (!deep(a[i], b[i])) {
          return false;
        }
      }
      // could not find unequal items
      return true;
    }

    if (Array.isArray(b)) {
      return false;
    }

    if (typeof a === 'object') {
      if (typeof b !== 'object') {
        return false;
      }

      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);

      if (aKeys.length !== bKeys.length) {
        return false;
      }

      for (let i = 0; i < aKeys.length; i++) {
        const key = aKeys[i];
        if (hasOwn.call(a, key) && (!hasOwn.call(b, key) || !(deepObjects ? deep : equals)(a[key], b[key]))) {
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
