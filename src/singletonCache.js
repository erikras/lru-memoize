// @flow
import type { Entry, Equals } from ".";

export default function singletonCache(equals: Equals) {
  let entry: Entry;
  return {
    get(key: any) {
      if (entry && equals(key, entry.key)) {
        return entry.value;
      }
    },

    put(key: any, value: any) {
      entry = { key, value };
    }
  };
}
