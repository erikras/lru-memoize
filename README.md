# lru-memoize

[![NPM Version](https://img.shields.io/npm/v/lru-memoize.svg?style=flat-square)](https://www.npmjs.com/package/lru-memoize) 
[![NPM Downloads](https://img.shields.io/npm/dm/lru-memoize.svg?style=flat-square)](https://www.npmjs.com/package/lru-memoize)
[![Build Status](https://img.shields.io/travis/erikras/lru-memoize/master.svg?style=flat-square)](https://travis-ci.org/erikras/lru-memoize)

`lru-memoize` is a utility to provide simple memoization for any pure javascript function, using an [LRU cache](https://en.wikipedia.org/wiki/Cache_algorithms) that prioritizes the most recently accessed values, and discards the "least recently used" (LRU) items when the size limit is reached. _If your function has side effects or relies on some external state to generate its result, it should not be memoized._

## Installation

```
npm install --save lru-memoize
```

## Usage

Let's look at an example where we want to memoize a function that multiplies three numbers together, and we want to keep the last ten `arguments -> value` mappings in memory.

### ES5

```javascript
var memoize = require('lru-memoize');

var multiply = function(a, b, c) {
  return a * b * c;
}

multiply = memoize(10)(multiply);

module.exports = multiply;
```

### ES6

```javascript
import memoize from 'lru-memoize';

let multiply = (a, b, c) => a * b * c;

multiply = memoize(10)(multiply);

export default multiply;
```

## API

#### `memoize(limit:Integer?, equals:Function?, deepObjects:Boolean?)`

Returns `(Function) => Function`.

###### -`limit` : Integer [optional]

> The number of `arguments -> value` mappings to keep in memory. Defaults to `1`.

###### -`equals` : Function [optional]

> A function to compare two values for equality. Defaults to `===`.

###### -`deepObjects` : Boolean [optional]

> Whether or not to perform a deep equals on Object values. Defaults to `false`.

