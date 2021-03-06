Spec =
	signature: '8BPS'
	supportedVersions: [1, 2]
	supportedDepths: [1, 8, 16, 32]
	supportedColorModes: [0, 1, 2, 3, 4, 7, 8, 9]
	colorModes:
		Bitmap: 0
		Grayscale: 1
		Indexed: 2
		RGB: 3
		CMYK: 4
		Multichannel: 7
		Duotone: 8
		Lab: 9

module.exports = Spec
