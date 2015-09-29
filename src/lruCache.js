export default function lruCache(limit, equals) {
  const entries = [];

  function get(key) {
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      if (equals(key, entry.key)) {
        if (index > 0) {
          // move this entry to the top of the cache
          entries.splice(index, 1);
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
