ImageResource = require './imageResource'
InputStream = require '../../extensions/inputStream'
BlockParser = require './blocks/parser'

class Parser
	constructor: (fileName, position, callback) ->
		@fs = require 'fs'

		@parse fileName, position, callback

	parse: (fileName, position, callback) ->
		@fs.open fileName, 'r', '0666', (err, fd) =>
			throw err if err

			stream = new InputStream @fs, fd, position

			length = stream.readInt()

			#resourceBlocks = stream.readString(length)

			@imageResource = new ImageResource(length)

			blocksParser = new BlockParser(fileName, stream.position) if length > 0

			callback(null, stream.position)

module.exports = Parser
