(function() {
  var HeaderSpec, Validator;
  HeaderSpec = require('../header/spec');
  Validator = (function() {
    function Validator() {
      this.assert = require('assert');
    }
    Validator.prototype.assertColorDataLength = function(colorDataLength, colorMode) {
      if (colorMode === HeaderSpec.colorModes.Indexed) {
        return this.assert(colorDataLength === 768, "Indexed color images: length is 768. Your value is " + colorDataLength + ".");
      } else if (colorMode === HeaderSpec.colorModes.Duotone) {
        ;
      } else {
        return this.assert(colorDataLength === 0, "For non-indexed and non-duotone color images length is 4-byte. Your value is " + colorDataLength + ".");
      }
    };
    return Validator;
  })();
  module.exports = Validator;
}).call(this);
