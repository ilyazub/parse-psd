Spec = require './spec'

class Validator
	constructor: ->
		@assert = require 'assert'
		@version = -1

	assertSignature: (signature) ->
		@assert(signature is Spec.signature, "Signature: always equal to '#{Spec.signature}'. Your value: #{signature}")

	assertVersion: (@version) ->
		@assert(@version in Spec.supportedVersions, "Supported version: always equal to #{Spec.supportedVersions[0]} (**PSB** version is #{Spec.supportedVersions[1]}.). Your value: #{Spec.version}")

	assertChannels: (channels) ->
		@assert(1 < channels < 56, "Number of channels range is 1 to 56. Your value: #{channels}")

	assertHeight: (height) ->
		@assert((@version is 1 and 1 < height < 30000) or (@version is 2 and 1 < height < 300000), "Supported height range is 1 to 30,000 (**PSB** max of 300,000.). Your value: #{height}")

	assertWidth: (width) ->
		@assert((@version is 1 and 1 < width < 30000) or (@version is 2 and 1 < width < 300000), "Supported width range is 1 to 30,000 (**PSB** max of 300,000.). Your value: #{width}")

	assertDepth: (depth) ->
		@assert(depth in Spec.supportedDepths, "Supported depths are #{Spec.supportedDepths}. Your value: #{depth}")

	assertColorMode: (colorMode) ->
		@assert(colorMode in Spec.supportedColorModes, "Supported color modes: #{Spec.supportedColorModes}")

module.exports = Validator
