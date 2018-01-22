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

  // binary to string lookup table
  var b2s = alphabet.split('');

  // string to binary lookup table
  // 123 == 'z'.charCodeAt(0) + 1
  var s2b = new Array(123);
  for (var i = 0; i < alphabet.length; i++) {
    s2b[alphabet.charCodeAt(i)] = i;
  }

  // number to base64
  var ntob = function ntob(number) {
    if (number < 0) return '-' + ntob(-number);

    var lo = number >>> 0;
    var hi = number / 4294967296 >>> 0;

    var right = '';
    while (hi > 0) {
      right = b2s[0x3f & lo] + right;
      lo >>>= 6;
      lo |= (0x3f & hi) << 26;
      hi >>>= 6;
    }

    var left = '';
    do {
      left = b2s[0x3f & lo] + left;
      lo >>>= 6;
    } while (lo > 0);

    return left + right;
  };

  // base64 to number
  var bton = function bton(base64) {
    var number = 0;
    var sign = base64.charAt(0) === '-' ? 1 : 0;

    for (var _i = sign; _i < base64.length; _i++) {
      number = number * 64 + s2b[base64.charCodeAt(_i)];
    }

    return sign ? -number : number;
  };

  exports.default = { ntob: ntob, bton: bton };
  module.exports = exports['default'];
});
