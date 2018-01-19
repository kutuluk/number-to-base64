# number-to-base64
Extremely fast & compact Number ⟷ Base64 converting.

[![NPM version](https://img.shields.io/npm/v/number-to-base64.svg?style=flat-square)](https://www.npmjs.com/package/number-to-base64)[![Build Status](https://img.shields.io/travis/kutuluk/number-to-base64/master.svg?style=flat-square)](https://travis-ci.org/kutuluk/number-to-base64)

## Features

- Converts all values of javascript safe integers range (from `-9007199254740991` to `9007199254740991`)
- Extremely fast due to bitwise operations
- Does not add extra padding characters for more efficient compression
- Optimized for V8 (Chrome, Node.js)
- ES1 compatible

Number          | compact Base64
----------------|------------
0               | A
63              | /
64              | BA
4095            | //
262143          | ///
16777215        | ////
68719476735     | //////
281474976710655 | ////////
9007199254740991| f////////

## Installation

```sh
npm install number-to-base64
```

## API

#### `ntob(number)`
Takes a number and returns a compact Base64 string.

#### `bton(base64)`
Takes a compact Base64 string and returns a number.


## Usage

### Browser directly
```html
<script src="https://unpkg.com/number-to-base64/dist/number-to-base64.min.js"></script>

<script>
  var number = 9007199254740991;
  var base64 = numberToBase64.ntob(number);
  var back = numberToBase64.bton(base64);
  console.log('%s -> "%s" -> %s (%s)', number, base64, back, back === number);
</script>
```

### ES6
```javascript
import { ntob, bton } from 'number-to-base64';

const number = 9007199254740991;
const base64 = ntob(number);
const back = bton(base64);
console.log('%s -> "%s" -> %s (%s)', number, base64, back, back === number);
```

Output
```
9007199254740991 -> "f////////" -> 9007199254740991 (true)
```

## Benchmarking

```
Encoding 1 -> "B"
----------------------------------------------------------------
modulo-implementation x 24,209,913 ops/sec ±1.34% (76 runs sampled)
32bit-implementation x 31,198,373 ops/sec ±0.88% (86 runs sampled)
number-to-base64 x 38,565,690 ops/sec ±0.78% (81 runs sampled)
----------------------------------------------------------------
Fastest is number-to-base64

Encoding 255 -> "D/"
----------------------------------------------------------------
modulo-implementation x 7,609,115 ops/sec ±0.68% (90 runs sampled)
32bit-implementation x 8,639,041 ops/sec ±3.66% (81 runs sampled)
number-to-base64 x 9,291,425 ops/sec ±0.72% (88 runs sampled)
----------------------------------------------------------------
Fastest is number-to-base64

Encoding 65535 -> "P//"
----------------------------------------------------------------
modulo-implementation x 6,101,988 ops/sec ±1.09% (89 runs sampled)
32bit-implementation x 7,595,659 ops/sec ±0.57% (89 runs sampled)
number-to-base64 x 7,472,295 ops/sec ±1.08% (85 runs sampled)
----------------------------------------------------------------
Fastest is 32bit-implementation

Encoding 4294967295 -> "D/////"
----------------------------------------------------------------
modulo-implementation x 2,801,981 ops/sec ±0.53% (88 runs sampled)
32bit-implementation x 4,728,056 ops/sec ±0.67% (90 runs sampled)
number-to-base64 x 4,660,376 ops/sec ±0.96% (88 runs sampled)
----------------------------------------------------------------
Fastest is 32bit-implementation

Encoding 4294967296 -> "EAAAAA"
----------------------------------------------------------------
modulo-implementation x 2,822,325 ops/sec ±0.56% (89 runs sampled)
32bit-implementation - out of range
number-to-base64 x 3,841,496 ops/sec ±3.77% (80 runs sampled)
----------------------------------------------------------------
Fastest is number-to-base64

Encoding 1516368178259 -> "WEOlixT"
----------------------------------------------------------------
modulo-implementation x 2,614,696 ops/sec ±0.49% (89 runs sampled)
32bit-implementation - out of range
number-to-base64 x 3,851,435 ops/sec ±0.99% (88 runs sampled)
----------------------------------------------------------------
Fastest is number-to-base64

Encoding 9007199254740991 -> "f////////"
----------------------------------------------------------------
modulo-implementation x 2,085,061 ops/sec ±0.49% (86 runs sampled)
32bit-implementation - out of range
number-to-base64 x 3,143,694 ops/sec ±1.06% (87 runs sampled)
----------------------------------------------------------------
Fastest is number-to-base64
```
