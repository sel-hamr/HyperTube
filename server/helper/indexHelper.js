const Jimp = require('jimp')
/**
 * CREATE TOKEN DEPENDING ON LENGTH AND CONVERT IT INTO BASE64
 **/
const generateToken = function (lengthChar) {
	const allChar = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~'
	let token = ''
	for (let i = 0; i < lengthChar; i++) {
		const random = Math.floor(Math.random() * allChar.length)
		token += allChar[random]
	}
	token = Buffer.from(token)
	return token.toString('base64')
}

const createImage = async function (src) {
	const buffer = Buffer.from(src.split('base64,')[1], 'base64')
	return new Promise(
		(resolve) =>
			new Jimp(buffer, (createError, value) => {
				//get extension from origin mime
				const ext = value._originalMime.split('image/')[1]
				const path = `/image/${Date.now()}.${ext}`
				resolve(path)
				value.write(__dirname + '/..' + path, (writeError) => writeError)
			})
	)
}

module.exports = {
	generateToken,
	createImage,
}
