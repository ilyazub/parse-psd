InputStream = require '../../extensions/inputStream'
ColorMode = require './colorMode'
Validator = require './validator'

class Parser
	constructor: (fileName, header, position, callback) ->
		@fs = require 'fs'

		@parse(fileName, header.colorMode, position, callback)

	parse: (fileName, colorMode, position, callback) ->
		@fs.open fileName, 'r', '0666', (err, fd) =>
			throw err if err

			validator = new Validator

			stream = new InputStream(@fs, fd, position)

			colorDataLength = stream.readInt()
			validator.assertColorDataLength(colorDataLength)

			colorData = stream.readString(colorDataLength)
			@_colorMode = new ColorMode(colorDataLength, colorData)

			callback(null, stream.position)

module.exports = Parser
