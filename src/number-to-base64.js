const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const inverse = { '': 0, '-': 0 };
for (let i = 0; i < 64; i++) {
  inverse[alphabet.charAt(i)] = i;
}

// base64 to number
const bton = (base64) => {
  let number = 0;
  const sign = base64.charAt(0) === '-' ? 1 : 0;

  for (let mod = 1, i = base64.length; i > sign; mod *= 16777216) {
    number +=
      mod *
      (inverse[base64.charAt(--i)] |
        (inverse[base64.charAt(--i)] << 6) |
        (inverse[base64.charAt(--i)] << 12) |
        (inverse[base64.charAt(--i)] << 18));
  }

  if (sign) number = -number;
  return number;
};

// number to base64
const ntob = (number) => {
  if (number < 0) return `-${ntob(-number)}`;

  let base64 = '';
  number = Math.floor(number);

  do {
    if (number > 4294967295) {
      const mod = number % 16777216;
      number = Math.floor(number / 16777216);
      base64 =
        alphabet.charAt(0x3f & (mod >> 18)) +
        alphabet.charAt(0x3f & (mod >> 12)) +
        alphabet.charAt(0x3f & (mod >> 6)) +
        alphabet.charAt(0x3f & mod) +
        base64;
    } else {
      do {
        base64 = alphabet.charAt(number & 0x3f) + base64;
        number >>>= 6;
      } while (number > 0);
    }
  } while (number > 0);

  return base64;
};

export default { bton, ntob };
