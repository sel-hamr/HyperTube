const validate = require('validator')
const jimp = require('jimp')

const validateImage = async function (src) {
	if (typeof src !== 'string') return false
	const body = src.split('base64,')
	//check if result of split contain 2 part
	// if body have 2 part then validate part2 with base64
	if (!(body.length === 2 && validate.isBase64(body[1]))) return false
	//create new buffer from part 2
	const buffer = Buffer.from(body[1], 'base64')
	const result = await (() => new Promise((resolve) => jimp.read(buffer, (err, value) => resolve({ err, value }))))()
	return result.err ? false : true
}

const validator = function (key, value) {
	if (typeof value !== 'string' || validate.isEmpty(value)) return false
	const objectKeys = {
		email: () => validate.isEmail(value) && validate.isLength(value, { max: 100 }),
		userName: () => /^[a-zA-Z0-9]{2,15}[\-\_\.]{0,1}[a-zA-Z0-9]{2,15}$/g.test(value),
		lastName: () => validate.isAlpha(value) && validate.isLength(value, { min: 4, max: 25 }),
		firstName: () => validate.isAlpha(value) && validate.isLength(value, { min: 4, max: 25 }),
		password: () =>
			validate.isStrongPassword(value, {
				minLength: 8,
				returnScore: true,
			}) > 35 && validate.isLength(value, { max: 60 }),
		token: () => validate.isBase64(value) && validate.isLength(value, { min: 0, max: 172 }),
	}
	return objectKeys[key]() ? true : false
}

module.exports = { validator, validateImage }
