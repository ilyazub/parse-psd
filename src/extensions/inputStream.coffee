class InputStream
	constructor: (@stream, @descriptor, @position = 0) ->

	read: (length, options = { shiftPosition: true }) ->
		buffer = new Buffer(length)

		bufferLength = @stream.readSync(@descriptor, buffer, 0, length, @position)
		@_shiftPosition(bufferLength) if options.shiftPosition

		buffer

	readShort: (options = { shiftPosition: true }) ->
		buffer = @read(2, options)

		buffer[1] & 0xFF | (buffer[0] & 0xFF) << 8

	readString: (length = 0, options = { shiftPosition: true }) ->
		if length is 0
			return ""

		@read(length, options).toString('UTF-8')

	skip: (length) ->
		@_shiftPosition(length) if length > 0

	readInt: (options = { shiftPosition: true }) ->
		buffer = @read(4, options)

		buffer[3] | (buffer[2] & 0xFF) << 8 | (buffer[1] & 0xFF) << 16 | (buffer[0] & 0xFF) << 24

	_shiftPosition: (length) ->
		@position += length if length > 0

module.exports = InputStream
