InputStream = require '../../extensions/inputStream'
Validator = require './validator'
Header = require './header'

class Parser
	constructor: (fileName, callback) ->
		@fs = require 'fs'

		@header = new Header

		@parse(fileName, callback) if typeof fileName is 'string' and fileName.length > 0

	parse: (fileName, callback) ->
		@fs.open fileName, 'r', '0666', (err, fd) =>
			throw new Error("File reading error: #{err}") if err is undefined

			stream = new InputStream(@fs, fd, 0)
			validator = new Validator

			signature = stream.readString(4)
			validator.assertSignature(signature)

			version = stream.readShort()
			validator.assertVersion(version)

			stream.skip(6) # Reserved: must be zero.

			channels = stream.readShort()
			validator.assertChannels(channels)
			@header.channels = channels

			height = stream.readInt()
			validator.assertHeight(height)
			@header.height = height

			width = stream.readInt()
			validator.assertWidth(width)
			@header.width = width

			depth = stream.readShort()
			validator.assertDepth(depth)
			@header.depth = depth

			colorMode = stream.readShort()
			validator.assertColorMode(colorMode)
			@header.colorMode = colorMode

			callback(null, @header, stream.position)

			@fs.close(fd)

module.exports = Parser
