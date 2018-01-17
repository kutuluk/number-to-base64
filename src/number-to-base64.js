const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const inverse = {};
for (let i = 0; i < 64; i++) {
  inverse[alphabet.charAt(i)] = i;
}

// number to base64
const ntob = (number) => {
  if (number < 0) return `-${ntob(-number)}`;

  let base64 = '';

  if (number > 4294967295) {
    const mod = number % 16777216;
    number = Math.floor(number / 16777216);
    base64 =
      alphabet.charAt(0x3f & (mod >>> 18)) +
      alphabet.charAt(0x3f & (mod >>> 12)) +
      alphabet.charAt(0x3f & (mod >>> 6)) +
      alphabet.charAt(0x3f & mod) +
      base64;
  }

  do {
    base64 = alphabet.charAt(0x3f & number) + base64;
    number >>>= 6;
  } while (number > 0);

  return base64;
};

// base64 to number
const bton = (base64) => {
  let number = 0;
  const sign = base64.charAt(0) === '-' ? 1 : 0;

  for (let i = sign; i < base64.length; i++) {
    number = number * 64 + inverse[base64.charAt(i)];
  }

  if (sign) number = -number;
  return number;
};

export default { ntob, bton };
