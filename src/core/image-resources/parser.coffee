ImageResource = require './imageResource'
InputStream = require '../../extensions/inputStream'

class Parser
	constructor: (fileName, bufferPosition, callback) ->
		@fs = require 'fs'

		@parse fileName, bufferPosition, callback

	parse: (fileName, bufferPosition, callback) ->
		@fs.open fileName, 'r', '0666', (err, fd) =>
			throw err if err

			stream = new InputStream @fs, fd, bufferPosition

			length = stream.readInt()
			@imageResource = new ImageResource(length)

			callback(null, stream.position)

module.exports = Parser
