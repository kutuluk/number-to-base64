const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const inverse = {};
for (let i = 0; i < 64; i++) {
  inverse[alphabet.charAt(i)] = i;
}

// number to base64
const ntob = (number) => {
  if (number < 0) return `-${ntob(-number)}`;

  let lo = '';
  if (number >= 16777216) {
    const lo24 = number % 16777216;
    number /= 16777216;
    lo =
      alphabet.charAt(0x3f & (lo24 >>> 18)) +
      alphabet.charAt(0x3f & (lo24 >>> 12)) +
      alphabet.charAt(0x3f & (lo24 >>> 6)) +
      alphabet.charAt(0x3f & lo24);
  }

  let hi = '';
  do {
    hi = alphabet.charAt(0x3f & number) + hi;
    number >>>= 6;
  } while (number > 0);

  return hi + lo;
};

// base64 to number
const bton = (base64) => {
  let number = 0;
  const sign = base64.charAt(0) === '-' ? 1 : 0;

  for (let i = sign; i < base64.length; i++) {
    number = number * 64 + inverse[base64.charAt(i)];
  }

  return sign ? -number : number;
};

export default { ntob, bton };
