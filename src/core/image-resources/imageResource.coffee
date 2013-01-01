class ImageResource
	constructor: (@length = 0) ->
		console.log "#{module.id}: Image resources length is #{@length}"

module.exports = ImageResource
