HeaderSpec = require '../header/spec'

class Validator
	constructor: ->
		@assert = require 'assert'

	assertColorDataLength: (colorDataLength, colorMode) ->
		if colorMode is HeaderSpec.colorModes.Indexed
			@assert(colorDataLength is 768, "Indexed color images: length is 768. Your value is #{colorDataLength}.")
		else if colorMode is HeaderSpec.colorModes.Duotone
			#@assert()
		else
			@assert.strictEqual(colorDataLength, 0, "For non-indexed and non-duotone color images length is 4-byte. Your value is #{colorDataLength}.")

module.exports = Validator
