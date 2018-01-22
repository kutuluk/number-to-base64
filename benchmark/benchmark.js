/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const Benchmark = require('benchmark');

const { ntob, bton } = require('../lib/number-to-base64.js');
const { encodeInt, decodeToInt } = require('radix-64')();
const { numberToString, stringToNumber } = require('radixer');

function test(number) {
  console.log('\nConverting %s -> "%s" -> %s', number, ntob(number), number);
  console.log('----------------------------------------------------------------');

  const implementations = {
    'number-to-base64': () => bton(ntob(number)),
    'radix-64': () => decodeToInt(encodeInt(number)),
    radixer: () => stringToNumber(numberToString(number)),
  };

  const suite = new Benchmark.Suite();

  Object.keys(implementations).forEach((key) => {
    let successful = false;
    try {
      successful = number === implementations[key](number);
      // eslint-disable-next-line no-empty
    } catch (ignore) {}
    if (successful) {
      suite.add(key, implementations[key]);
    } else {
      suite.add(key, () => {
        throw new Error();
      });
    }
  });

  suite
    .on('cycle', (event) => {
      if (event.target.error) console.log(`${event.target.name} - error`);
      else console.log(String(event.target));
    })
    .run();
}

[
  1,
  -1,
  255,
  65535,
  4294967295,
  4294967296,
  Date.now(),
  9007199254740991,
  -9007199254740991,
].forEach(number => test(number));
