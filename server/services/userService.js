const { sign } = require('jsonwebtoken')

const { validator } = require(__dirname + '/../helper/validatorHelper')
const { getUser, updateUser } = require(__dirname + '/../models/userModel')
const { keys } = require(__dirname + '/../configs/indexConfig')

/**
 * CHECK USER INPUT BY CHECKING KEYS AND VALIDATE VALUE BY VALIDATOR
 * RETURN ERROR
 **/
const checkUserInput = function (inputs, properties) {
	if (inputs instanceof Object) {
		for (const key in inputs) if (properties.indexOf(key) === -1) return `Error unsupported key ${key}`
		for (const key of properties) {
			if (Object.keys(inputs).indexOf(key) === -1) return 'Error missing some inputs'
			if (!validator(key, inputs[key])) return `Incorrect ${key}`
		}
		return ''
	}
	return 'Incorrect Input'
}

const getJWT = async function (userID) {
	const user = await getUser({ userID }, 'jwt')
	if (user && user.jwt) return user.jwt
	const jwt = sign({ userID }, keys.jwt)
	updateUser(userID, { jwt })
	return jwt
}

module.exports = {
	checkUserInput,
	getJWT,
}
