/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */

const expect = require('chai').expect;
const ntob = require('../dist/number-to-base64.min.js').ntob;
const bton = require('../dist/number-to-base64.min.js').bton;

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

const test = (number, log) => {
  let float = number + Math.random();
  if (Math.floor(float) !== number) float = number;

  const fast = ntob(float);
  const slow = modulo(float);
  const back = bton(fast);
  if (log) console.log('%s -> %s -> %s', float, fast, back);

  if (fast !== slow) return NaN;
  return back;
};

describe('Tests', () => {
  it('Table', () => {
    const table = [0, 1, 255, 65535, 4294967295, 4294967296, Date.now(), 9007199254740991];

    table.forEach(value => expect(test(value, true)).to.equal(value));
  });

  it('Fuzzing', () => {
    for (let i = 0; i <= 1000000; i += 1) {
      const t = Math.floor(Math.random() * 9007199254740991);
      expect(test(t)).to.equal(t);
    }
  }).timeout(0);

  /*
  it('Paranoid', () => {
    for (let i = 0; i <= 9007199254740991; i += 1) {
      if (i % 1000000000000000) console.log(i);
      expect(test(i)).to.equal(true);
    }
  }).timeout(0);
  */
});
