# number-to-base64
Number to Base64 encoding/decoding.

[![NPM version](https://img.shields.io/npm/v/number-to-base64.svg?style=flat-square)](https://www.npmjs.com/package/number-to-base64)[![Build Status](https://img.shields.io/travis/kutuluk/number-to-base64/master.svg?style=flat-square)](https://travis-ci.org/kutuluk/number-to-base64)

## Features

- Converts all values of javascript safe integers range (from `-9007199254740991` to `9007199254740991`)
- Extremely fast due to bitwise operations
- ES3 compatible

## Perfomance comparison

https://jsperf.com/number-to-base64-encoding

## Installation

```sh
npm install number-to-base64
```

## API

#### `ntob(number)`
Takes a number and returns a base64 string.

#### `bton(base64)`
Takes a base64 string and returns a number.


## Usage

### Browser directly
```html
<script src="https://unpkg.com/number-to-base64/dist/number-to-base64.min.js"></script>

<script>
  var number = 9007199254740991;
  var base64 = numberToBase64.ntob(number);
  var back = numberToBase64.bton(base64);
  console.log('%s -> %s -> %s (%s)', number, base64, back, back === number);
</script>
```

### ES6
```javascript
import { ntob, bton } from 'number-to-base64';

const number = 9007199254740991;
const base64 = ntob(number);
const back = bton(base64);
console.log('%s -> %s -> %s (%s)', number, base64, back, back === number);
```

Output
```
9007199254740991 -> f//////// -> 9007199254740991 (true)
```
