class PsdHeader
	constructor: ->
		@channels = 1
		@height = 1
		@width = 1
		@depth = 1
		@colorMode = 0

class PsdInputStream
	constructor: (@stream, @descriptor) ->
		@pos = 0

	read: (length) ->
		buffer = new Buffer(length)
		@pos += @stream.readSync(@descriptor, buffer, 0, length, @pos)

		buffer

	readShort: ->
		buffer = @read(2)

		buffer[1] & 0xFF | (buffer[0] & 0xFF) << 8

	readString: (length) ->
		if length > 0
			@read(length).toString('UTF-8')

	skip: (length = 1) ->
		@pos += length if length > 0

	readInt: ->
		buffer = @read(4)

		buffer[3] | (buffer[2] & 0xFF) << 8 | (buffer[1] & 0xFF) << 16 | (buffer[0] & 0xFF) << 24

PsdHeaderSpec =
	signature: '8BPS'
	supportedVersions: [1, 2]
	supportedDepths: [1, 8, 16, 32]
	supportedColorModes: [0, 1, 2, 3, 4, 7, 8, 9]
	colorModes:
		Bitmap: 0
		Grayscale: 1
		Indexed: 2
		RGB: 3
		CMYK: 4
		Multichannel: 7
		Duotone: 8
		Lab: 9

class PsdHeaderValidator
	constructor: ->
		@assert = require 'assert'
		@spec = PsdHeaderSpec
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

class PsdHeaderParser
	constructor: (fileName) ->
		@fs = require 'fs'

		@psdHeader = new PsdHeader

		@parse fileName if typeof fileName is 'string' and fileName.length > 0

	parse: (fileName) ->
		@fs.open fileName, 'r', '0666', (err, fd) =>
			throw "File reading error: #{err}" if err is undefined

			psdStream = new PsdInputStream(@fs, fd)
			psdValidator = new PsdHeaderValidator

			signature = psdStream.readString(4)
			psdValidator.assertSignature(signature)

			version = psdStream.readShort()
			psdValidator.assertVersion(version)

			psdStream.skip(6) # Reserved: must be zero.

			channels = psdStream.readShort()
			psdValidator.assertChannels(channels)
			@psdHeader.channels = channels

			height = psdStream.readInt()
			psdValidator.assertHeight(height)
			@psdHeader.height = height

			width = psdStream.readInt()
			psdValidator.assertWidth(width)
			@psdHeader.width = width

			depth = psdStream.readShort()
			psdValidator.assertDepth(depth)
			@psdHeader.depth = depth

			colorMode = psdStream.readShort()
			psdValidator.assertColorMode(colorMode)
			@psdHeader.colorMode = colorMode

			console.log @psdHeader

			@fs.close(fd)

headerParser = new PsdHeaderParser "#{__dirname}\\psd\\test.psd"
