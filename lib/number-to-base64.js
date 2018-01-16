(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.numberToBase64 = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  var inverse = { '': 0, '-': 0 };
  for (var i = 0; i < 64; i++) {
    inverse[alphabet.charAt(i)] = i;
  }

  // base64 to number
  var bton = function bton(base64) {
    var number = 0;
    var sign = base64.charAt(0) === '-' ? 1 : 0;

    for (var mod = 1, _i = base64.length; _i > sign; mod *= 16777216) {
      number += mod * (inverse[base64.charAt(--_i)] | inverse[base64.charAt(--_i)] << 6 | inverse[base64.charAt(--_i)] << 12 | inverse[base64.charAt(--_i)] << 18);
    }

    if (sign) number = -number;
    return number;
  };

  // number to base64
  var ntob = function ntob(number) {
    if (number < 0) return '-' + ntob(-number);

    var base64 = '';
    number = Math.floor(number);

    do {
      if (number > 4294967295) {
        var mod = number % 16777216;
        number = Math.floor(number / 16777216);
        base64 = alphabet.charAt(0x3f & mod >> 18) + alphabet.charAt(0x3f & mod >> 12) + alphabet.charAt(0x3f & mod >> 6) + alphabet.charAt(0x3f & mod) + base64;
      } else {
        do {
          base64 = alphabet.charAt(number & 0x3f) + base64;
          number >>>= 6;
        } while (number > 0);
      }
    } while (number > 0);

    return base64;
  };

  exports.default = { bton: bton, ntob: ntob };
  module.exports = exports['default'];
});
