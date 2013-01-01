class InputStream
	constructor: (@stream, @descriptor, @position = 0) ->

	read: (length) ->
		buffer = new Buffer(length)
		@position += @stream.readSync(@descriptor, buffer, 0, length, @position)

		buffer

	readShort: ->
		buffer = @read(2)

		buffer[1] & 0xFF | (buffer[0] & 0xFF) << 8

	readString: (length) ->
		if length > 0
			@read(length).toString('UTF-8')

	skip: (length = 1) ->
		@position += length if length > 0

	readInt: ->
		buffer = @read(4)

		buffer[3] | (buffer[2] & 0xFF) << 8 | (buffer[1] & 0xFF) << 16 | (buffer[0] & 0xFF) << 24

module.exports = InputStream
