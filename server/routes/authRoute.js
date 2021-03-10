const express = require('express')
const passport = require(__dirname + '/../configs/passportConfig')
const { login, register, resetPassword, activeAccount } = require(__dirname + '/../controllers/authController')

const authRoute = express.Router()
authRoute.get('/', (req, res) => {
	return res.send({
		isLogin: req.isAuthenticated(),
	})
})
authRoute.post('/login', (req, res, next) => {
	if (!req.isAuthenticated()) {
		return passport.authenticate('local', async () => {
			return await login(req, res, next)
		})(req, res, next)
	}
	return res.redirect(`http://localhost:${clientPort}`)
})
authRoute.post('/register', async (req, res, next) => {
	if (!req.isAuthenticated()) return await register(req, res, next)
	return res.redirect(`http://localhost:${clientPort}`)
})
authRoute.post('/reset', resetPassword)
authRoute.post('/active', activeAccount)

module.exports = authRoute
