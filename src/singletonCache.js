export default function singletonCache(equals) {
  let entry
  return {
    get(key) {
      if (entry && equals(key, entry.key)) {
        return entry.value
      }
    },

    put(key, value) {
      entry = { key, value }
    }
  }
}
