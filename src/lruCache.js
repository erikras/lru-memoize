// @flow
import type { Entry, Equals } from ".";

const findIndex = (arr: any[], fn: any => any) => {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      return i;
    }
  }

  return -1;
};

export default function lruCache(limit: number, equals: Equals) {
  const entries: Entry[] = [];

  function get(key: any) {
    const cacheIndex = findIndex(entries, entry => equals(key, entry.key));

    // We found a cached entry
    if (cacheIndex > -1) {
      const entry = entries[cacheIndex];

      // Cached entry not at top of cache, move it to the top
      if (cacheIndex > 0) {
        entries.splice(cacheIndex, 1);
        entries.unshift(entry);
      }

      return entry.value;
    }

    // No entry found in cache, return null
    return undefined;
  }

  function put(key: any, value: any) {
    if (!get(key)) {
      entries.unshift({ key, value });
      if (entries.length > limit) {
        entries.pop();
      }
    }
  }

  return { get, put };
}
