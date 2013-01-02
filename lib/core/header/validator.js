(function() {
  var Spec, Validator;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  Spec = require('./spec');
  Validator = (function() {
    function Validator() {
      this.assert = require('assert');
      this.version = -1;
    }
    Validator.prototype.assertSignature = function(signature) {
      return this.assert(signature === Spec.signature, "Signature: always equal to '" + Spec.signature + "'. Your value: " + signature);
    };
    Validator.prototype.assertVersion = function(version) {
      var _ref;
      this.version = version;
      return this.assert((_ref = this.version, __indexOf.call(Spec.supportedVersions, _ref) >= 0), "Supported version: always equal to " + Spec.supportedVersions[0] + " (**PSB** version is " + Spec.supportedVersions[1] + ".). Your value: " + Spec.version);
    };
    Validator.prototype.assertChannels = function(channels) {
      return this.assert((1 < channels && channels < 56), "Number of channels range is 1 to 56. Your value: " + channels);
    };
    Validator.prototype.assertHeight = function(height) {
      return this.assert((this.version === 1 && (1 < height && height < 30000)) || (this.version === 2 && (1 < height && height < 300000)), "Supported height range is 1 to 30,000 (**PSB** max of 300,000.). Your value: " + height);
    };
    Validator.prototype.assertWidth = function(width) {
      return this.assert((this.version === 1 && (1 < width && width < 30000)) || (this.version === 2 && (1 < width && width < 300000)), "Supported width range is 1 to 30,000 (**PSB** max of 300,000.). Your value: " + width);
    };
    Validator.prototype.assertDepth = function(depth) {
      return this.assert(__indexOf.call(Spec.supportedDepths, depth) >= 0, "Supported depths are " + Spec.supportedDepths + ". Your value: " + depth);
    };
    Validator.prototype.assertColorMode = function(colorMode) {
      return this.assert(__indexOf.call(Spec.supportedColorModes, colorMode) >= 0, "Supported color modes: " + Spec.supportedColorModes);
    };
    return Validator;
  })();
  module.exports = Validator;
}).call(this);
