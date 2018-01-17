/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */

const expect = require('chai').expect;
const ntob = require('../dist/number-to-base64.min.js').ntob;
const bton = require('../dist/number-to-base64.min.js').bton;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const inverse = {};
for (let i = 0; i < alphabet.length; i++) {
  inverse[alphabet.charAt(i)] = i;
}

const ntobModImpl = (number) => {
  if (number < 0) return `-${ntobModImpl(-number)}`;

  let base64 = '';

  do {
    const mod = number % 64;
    number = Math.floor(number / 64);
    base64 = alphabet.charAt(mod) + base64;
  } while (number > 0);

  return base64;
};

const ntobBitwiseImpl = (number) => {
  if (number < 0) return `-${ntobBitwiseImpl(-number)}`;

  let base64 = '';

  do {
    base64 = alphabet.charAt(0x3f & number) + base64;
    number >>>= 6;
  } while (number > 0);

  return base64;
};

const test = (number) => {
  const fast = ntob(number);
  const slow = ntobModImpl(number);
  const back = bton(fast);
  console.log('%s -> %s -> %s', number, number.toString(16), fast);
  return number === back && fast === slow;
};

describe('Common', () => {
  it('Tests', () => {
    expect(test(0)).to.equal(true);
    expect(test(4294967295)).to.equal(true);
    expect(test(4294967296)).to.equal(true);
    expect(test(-2147483648)).to.equal(true);
    expect(test(1099511627775)).to.equal(true);
    expect(test(1099511562240)).to.equal(true);
    expect(test(9007199254740991)).to.equal(true);
    expect(test(-9007199254740991)).to.equal(true);
    expect(test(4503599627370497)).to.equal(true);
    expect(test(-5)).to.equal(true);
  });

  /*
  it('Paranoid', () => {
    for (let i = 0; i <= 9007199254740991; i += 1) {
      expect(test(i)).to.equal(true);
    }
  });
  */
});
