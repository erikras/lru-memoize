const findIndex = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      return i;
    }
  }

  return -1;
}

export default function lruCache(limit, equals) {
  const entries = []

  function get(key) {
    entries 
    const cacheIndex = findIndex(entries, entry => equals(key, entry.key))

    // We found a cached entry
    if (cacheIndex > -1) {
      const entry = entries[cacheIndex]

      // Cached entry not at top of cache, move it to the top
      if (cacheIndex > 0) {
        entries.slice(cacheIndex, 1)
        entries.unshift(entry)
      }

      return entry.value
    }

    // No entry found in cache, return null
    return undefined
  }

  function put(key, value) {
    if (!get(key)) {
      entries.unshift({ key, value })
      if (entries.length > limit) {
        entries.pop()
      }
    }
  }

  return { get, put }
}
