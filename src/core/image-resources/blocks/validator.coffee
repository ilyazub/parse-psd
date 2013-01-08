Spec = require './spec'

class Validator
	constructor: ->
		@assert = require 'assert'

	assertSignature: (signature) ->
		@assert.strictEqual(signature, Spec.signature, "Signature should be #{Spec.signature}. Your value: #{signature}.")

module.exports = Validator
