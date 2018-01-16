const expect = require('chai').expect;
const ntob = require('../dist/number-to-base64.min.js').ntob;
const bton = require('../dist/number-to-base64.min.js').bton;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const base64 = (number) => {
  if (number < 0) return `-${base64(-number)}`;

  let result = '';
  // eslint-disable-next-line no-param-reassign
  number = Math.floor(number);

  do {
    const mod = number % 64;
    result = alphabet.charAt(mod) + result;
    // eslint-disable-next-line no-param-reassign
    number = Math.floor(number / 64);
  } while (number > 0);

  return result;
};

const test = (number) => {
  const fast = ntob(number);
  const slow = base64(number);
  const rev = bton(fast);
  console.log('%s -> %s -> %s', number, number.toString(16), fast);
  return number === rev && fast === slow;
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
  });

  /*
  it('Paranoid', () => {
    for (let i = -9007199254740991; i <= 9007199254740991; i += 1) {
      expect(test(i)).to.equal(true);
    }
  });
  */
});
