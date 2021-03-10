const { verify } = require('jsonwebtoken')
const { getUser } = require(__dirname + '/../models/userModel')
const { keys } = require(__dirname + '/../configs/indexConfig')
const authentication = function (req, res, next) {
	if (req.isAuthenticated()) return next()
	return res.send({
		type: 'error',
		status: 401,
		body: 'Unauthorized',
	})
}
const jwt = async function (req, res, next) {
	const { jwtToken } = req.cookies
	try {
		if (jwtToken) {
			const payload = verify(jwtToken, keys.jwt)
			const user = await getUser({ userID: payload.userID }, 'userID')
			if (user) {
				req.user = user.userID
				req.isAuthenticated = () => (req.user ? true : false)
			}
		}
		next()
	} catch (err) {
		next()
	}
}
module.exports = { authentication, jwt }
