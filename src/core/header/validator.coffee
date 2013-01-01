Spec = require './spec'

class Validator
	constructor: ->
		@assert = require 'assert'
		@spec = Spec
		@version = -1

	assert: (condition, failMessage) ->
		@assert(condition, failMessage)

	assertSignature: (signature) ->
		@assert(signature is @spec.signature, "Signature: always equal to '#{@spec.signature}'. Your value: #{signature}")

	assertVersion: (@version) ->
		@assert(@version in @spec.supportedVersions, "Supported version: always equal to #{@spec.supportedVersions[0]} (**PSB** version is #{@spec.supportedVersions[1]}.). Your value: #{@spec.version}")

	assertChannels: (channels) ->
		@assert(1 < channels < 56, "Number of channels range is 1 to 56. Your value: #{channels}")

	assertHeight: (height) ->
		@assert((@version is 1 and 1 < height < 30000) or (@version is 2 and 1 < height < 300000), "Supported height range is 1 to 30,000 (**PSB** max of 300,000.). Your value: #{height}")

	assertWidth: (width) ->
		@assert((@version is 1 and 1 < width < 30000) or (@version is 2 and 1 < width < 300000), "Supported width range is 1 to 30,000 (**PSB** max of 300,000.). Your value: #{width}")

	assertDepth: (depth) ->
		@assert(depth in @spec.supportedDepths, "Supported depths are #{@spec.supportedDepths}. Your value: #{depth}")

	assertColorMode: (colorMode) ->
		@assert(colorMode in @spec.supportedColorModes, "Supported color modes: #{@spec.supportedColorModes}")

module.exports = Validator
