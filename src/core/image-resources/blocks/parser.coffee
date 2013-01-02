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

			signature = stream.readString(4)
			validator.assertSignature(signature)

			id = stream.readShort()

			nullName = stream.readShort({ shiftPosition: false });
			# Variable - Name: Pascal string, padded to make the size even (a null name consists of two bytes of 0)
			stream.skip(2) if nullName is 0
			# To do: add name parsing if name isn't null.

			resourceBlockSize = stream.readInt()
			# To do: parse resource data.
			# The resource data, described in the sections on the individual resource types. It is padded to make the size even.

			# block = new Block(id)

module.exports = Parser
