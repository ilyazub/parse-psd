(function() {
  var Spec, Validator;
  Spec = require('./spec');
  Validator = (function() {
    function Validator() {
      this.assert = require('assert');
    }
    Validator.prototype.assertSignature = function(signature) {
      return this.assert.strictEqual(signature, Spec.signature, "Signature should be " + Spec.signature + ". Your value: " + signature + ".");
    };
    return Validator;
  })();
  module.exports = Validator;
}).call(this);
