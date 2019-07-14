// @flow
import type { Equals } from ".";

export default function lruCache(capacity: number, equals: Equals) {
  var _keys = new Array(capacity);
  var _values = new Array(capacity);

  var _next = new Array(capacity);
  var _previous = new Array(capacity);

  var _head = 0;
  var _tail = 0;

  var _size = 0;

  function findIndex(key: any) {
    if (_size === 0) {
      return undefined;
    }

    var index = _head;

    while (index !== undefined) {
      if (equals(key, _keys[index])) {
        return index;
      }

      if (index === _tail) {
        break;
      }

      index = _next[index];
    }

    return undefined;
  }

  function addOnTop(index: number) {
    if (_head === index) {
      return;
    }

    var previous = _previous[index];
    var next = _next[index];

    if (_tail === index) {
      _tail = previous;
    } else {
      _previous[next] = previous;
    }

    _next[previous] = next;

    var oldHead = _head;
    _previous[oldHead] = index;
    _head = index;
    _next[index] = oldHead;
  }

  function put(key: any, value: any) {
    var index = findIndex(key);

    if (index !== undefined) {
      addOnTop(index);
      _values[index] = value;

      return;
    }

    if (_size < capacity) {
      index = _size++;
    } else {
      index = _tail;
      _tail = _previous[index];
    }

    _keys[index] = key;
    _values[index] = value;

    _next[index] = _head;
    _previous[_head] = index;
    _head = index;
  }

  function get(key: any) {
    var index = findIndex(key);

    if (index === undefined) {
      return;
    }

    addOnTop(index);

    return _values[index];
  }

  return { get, put };
}
