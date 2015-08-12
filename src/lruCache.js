export default function lruCache(limit, equals) {
  const entries = [];

  function get(key) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (equals(key, entry.key)) {
        if (i > 0) {
          // move this entry to the top of the cache
          entries.splice(i, 1);
          entries.unshift(entry);
        }
        return entry.value;
      }
    }
  }

  function put(key, value) {
    if (!get(key)) {
      entries.unshift({key, value});
      if (entries.length > limit) {
        entries.pop();
      }
    }
  }

  return {get, put};
}
