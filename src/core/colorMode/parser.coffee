HeaderSpec = require '../header/spec'
InputStream = require '../../extensions/inputStream'
ColorMode = require './colorMode'
class Parser
	constructor: (fileName, header, bufferPosition, callback) ->
		@fs = require 'fs'
		@_colorMode = new ColorMode

		@parse fileName, header.colorMode, bufferPosition, callback

	parse: (fileName, colorMode, bufferPosition, callback) ->
		@fs.open fileName, 'r', '0666', (err, fd) =>
			throw err if err

			stream = new InputStream(@fs, fd, bufferPosition)

			if colorMode is HeaderSpec.colorModes.Indexed
				colorData = stream.readString(768)
				@_colorMode.colorData = colorData
				# To do: Do something with this data
			else if colorMode is HeaderSpec.colorModes.Duotone
				console.log "Parsing duotone (#{colorMode}) color mode."
				# To do: find duotone specification and add parsing duotone images
			else
				stream.skip(4)

			callback(null, stream.position)

module.exports = Parser
