Block = require './block'
Validator = require './validator'
InputStream = require '../../../extensions/inputStream'

class Parser
	constructor: (fileName, position) ->
		@fs = require 'fs'

		@parse(fileName, position)

	parse: (fileName, position) ->
		@fs.open fileName, 'r', '0666', (err, fd) =>
			throw err if err

			stream = new InputStream(@fs, fd, position)

			validator = new Validator

			blocks = []

			while @parseSignature(stream, validator)
				stream.skip(4)

				id = stream.readShort()

				name = stream.readShort();
				# Variable - Name: Pascal string, padded to make the size even (a null name consists of two bytes of 0)

				resourceBlockSize = stream.readInt()

				resourceData = stream.readString(resourceBlockSize)
				# The resource data, described in the sections on the individual resource types. It is padded to make the size even.

				# Check readme for go further

				block = new Block(id, name, resourceBlockSize, resourceData)

				blocks.push block

	parseSignature: (stream, validator) ->
		try
			signature = stream.readString(4, { shiftPosition: false })
			validator.assertSignature(signature)
			true
		catch e
			false

module.exports = Parser
