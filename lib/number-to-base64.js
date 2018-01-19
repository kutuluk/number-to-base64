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

  var inverse = {};
  for (var i = 0; i < 64; i++) {
    inverse[alphabet.charAt(i)] = i;
  }

  // number to base64
  var ntob = function ntob(number) {
    if (number < 0) return '-' + ntob(-number);

    var lo = '';
    if (number >= 4294967296) {
      var lo24 = number % 16777216;
      number /= 16777216;
      lo = alphabet.charAt(0x3f & lo24 >>> 18) + alphabet.charAt(0x3f & lo24 >>> 12) + alphabet.charAt(0x3f & lo24 >>> 6) + alphabet.charAt(0x3f & lo24);
    }

    var hi = '';
    do {
      hi = alphabet.charAt(0x3f & number) + hi;
      number >>>= 6;
    } while (number > 0);

    return hi + lo;
  };

  // base64 to number
  var bton = function bton(base64) {
    var number = 0;
    var sign = base64.charAt(0) === '-' ? 1 : 0;

    for (var _i = sign; _i < base64.length; _i++) {
      number = number * 64 + inverse[base64.charAt(_i)];
    }

    return sign ? -number : number;
  };

  exports.default = { ntob: ntob, bton: bton };
  module.exports = exports['default'];
});
