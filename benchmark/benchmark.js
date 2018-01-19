/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const Benchmark = require('benchmark');
const { ntob, bton } = require('../lib/number-to-base64.js');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const inverse = {};
for (let i = 0; i < alphabet.length; i++) {
  inverse[alphabet.charAt(i)] = i;
}

const modulo = (number) => {
  if (number < 0) return `-${modulo(-number)}`;

  let base64 = '';
  number = Math.floor(number);

  do {
    const mod = number % 64;
    number = Math.floor(number / 64);
    base64 = alphabet.charAt(mod) + base64;
  } while (number > 0);

  return base64;
};

const bitwise = (number) => {
  if (number < 0) return `-${bitwise(-number)}`;

  let base64 = '';

  do {
    base64 = alphabet.charAt(0x3f & number) + base64;
    number >>>= 6;
  } while (number > 0);

  return base64;
};

function test(number) {
  console.log('\nEncoding %s -> "%s"', number, ntob(number));
  console.log('----------------------------------------------------------------');

  const implementations = {
    'modulo-implementation': () => modulo(number),
    '32bit-implementation': () => bitwise(number),
    'number-to-base64': () => ntob(number),
  };

  const suite = new Benchmark.Suite();

  Object.keys(implementations).forEach((key) => {
    if (number !== bton(implementations[key]())) {
      suite.add(key, () => {
        throw new Error();
      });
    } else {
      suite.add(key, implementations[key]);
    }
  });

  suite
    .on('cycle', (event) => {
      if (event.target.error) console.log(`${event.target.name} - out of range`);
      else console.log(String(event.target));
    })
    .on('complete', () => {
      console.log('----------------------------------------------------------------');
      console.log(`Fastest is ${suite.filter('fastest').map('name')}`);
    })
    .run();
}

[1, 255, 65535, 4294967295, 4294967296, Date.now(), 9007199254740991].forEach(number =>
  test(number),
);
