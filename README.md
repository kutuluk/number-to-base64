# number-to-base64
Extremely fast number to radix64 converting.

[![NPM version](https://img.shields.io/npm/v/number-to-base64.svg?style=flat-square)](https://www.npmjs.com/package/number-to-base64)[![Build Status](https://img.shields.io/travis/kutuluk/number-to-base64/master.svg?style=flat-square)](https://travis-ci.org/kutuluk/number-to-base64)

## Features

- Converts all values of javascript safe integers range (from `-9007199254740991` to `9007199254740991`)
- Extremely fast due to bitwise operations
- Does not add extra padding characters for more efficient compression
- ES3 compatible

Number           | Result
-----------------|------------
0                | A
63               | /
64               | BA
4095             | //
262143           | ///
16777215         | ////
68719476735      | //////
281474976710655  | ////////
9007199254740991 | f////////
-9007199254740991| -f////////

## Installation

```sh
npm install number-to-base64
```

## API

#### `ntob(number)`
Takes a number, discards a fractional part and returns a string.

#### `bton(base64)`
Takes a string and returns a number.


## Usage

### Browser directly
```html
<script src="https://unpkg.com/number-to-base64/dist/number-to-base64.min.js"></script>

<script>
  var number = -9007199254740991;
  var base64 = numberToBase64.ntob(number);
  var back = numberToBase64.bton(base64);
  console.log('%s -> "%s" -> %s (%s)', number, base64, back, back === number);
</script>
```

Output
```
-9007199254740991 -> "-f////////" -> -9007199254740991 (true)
```

### ES6
```javascript
import { ntob, bton } from 'number-to-base64';

const test = (number) => {
  const base64 = ntob(number);
  const back = bton(base64);
  console.log('%s -> "%s" -> %s (%s)', number, base64, back, back === number);
};

[0, 1, -1, 255, 65535, 4294967295, 4294967296, Date.now(), 9007199254740991].forEach(number =>
  test(number)
);
```

Output
```
0 -> "A" -> 0 (true)
1 -> "B" -> 1 (true)
-1 -> "-B" -> -1 (true)
255 -> "D/" -> 255 (true)
65535 -> "P//" -> 65535 (true)
4294967295 -> "D/////" -> 4294967295 (true)
4294967296 -> "EAAAAA" -> 4294967296 (true)
1516612803738 -> "WEdKtya" -> 1516612803738 (true)
9007199254740991 -> "f////////" -> 9007199254740991 (true)
```

## Benchmarking

```
Converting 1 -> "B" -> 1
----------------------------------------------------------------
number-to-base64 x 12,522,220 ops/sec ±1.16% (79 runs sampled)
        radix-64 x 5,646,873 ops/sec ±0.53% (90 runs sampled)
         radixer x 9,247,606 ops/sec ±1.01% (88 runs sampled)

Converting -1 -> "-B" -> -1
----------------------------------------------------------------
number-to-base64 x 7,085,183 ops/sec ±0.65% (86 runs sampled)
        radix-64 - error
         radixer - error

Converting 255 -> "D/" -> 255
----------------------------------------------------------------
number-to-base64 x 7,105,757 ops/sec ±1.04% (86 runs sampled)
        radix-64 x 1,625,993 ops/sec ±0.75% (88 runs sampled)
         radixer x 3,096,584 ops/sec ±1.20% (89 runs sampled)

Converting 65535 -> "P//" -> 65535
----------------------------------------------------------------
number-to-base64 x 5,823,782 ops/sec ±1.11% (88 runs sampled)
        radix-64 x 1,394,050 ops/sec ±1.40% (90 runs sampled)
         radixer x 1,998,073 ops/sec ±0.55% (87 runs sampled)

Converting 4294967295 -> "D/////" -> 4294967295
----------------------------------------------------------------
number-to-base64 x 3,510,849 ops/sec ±0.52% (88 runs sampled)
        radix-64 x 941,715 ops/sec ±1.35% (91 runs sampled)
         radixer x 1,003,687 ops/sec ±0.54% (91 runs sampled)

Converting 4294967296 -> "EAAAAA" -> 4294967296
----------------------------------------------------------------
number-to-base64 x 3,284,146 ops/sec ±1.20% (89 runs sampled)
        radix-64 x 931,296 ops/sec ±2.61% (87 runs sampled)
         radixer x 1,561,844 ops/sec ±1.44% (85 runs sampled)

Converting 1516613323746 -> "WEdMsvi" -> 1516613323746
----------------------------------------------------------------
number-to-base64 x 3,041,711 ops/sec ±0.62% (90 runs sampled)
        radix-64 x 866,496 ops/sec ±1.53% (89 runs sampled)
         radixer x 1,143,080 ops/sec ±0.60% (89 runs sampled)

Converting 9007199254740991 -> "f////////" -> 9007199254740991
----------------------------------------------------------------
number-to-base64 x 2,490,628 ops/sec ±0.71% (89 runs sampled)
        radix-64 x 721,063 ops/sec ±1.29% (86 runs sampled)
         radixer x 659,930 ops/sec ±0.44% (90 runs sampled)

Converting -9007199254740991 -> "-f////////" -> -9007199254740991
----------------------------------------------------------------
number-to-base64 x 2,283,304 ops/sec ±1.07% (90 runs sampled)
        radix-64 - error
         radixer - error
```
