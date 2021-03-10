const express = require('express')
const { clientPort } = require('../configs/indexConfig')
const { getJWT } = require('../services/userService')
const passport = require(__dirname + '/../configs/passportConfig')
const oauthRoute = express.Router()

oauthRoute.get('/42', passport.authenticate('42'))
oauthRoute.get('/42/callback', (req, res, next) => {
	if (!req.isAuthenticated())
		passport.authenticate('42', { session: false }, async (err, user) => {
			if (user) {
				const jwt = await getJWT(user)
				res.cookie('jwtToken', jwt, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false })
				return res.redirect(`http://localhost:${clientPort}`)
			}
			return res.redirect(`http://localhost:${clientPort}/login`)
		})(req, res, next)
	else res.redirect(`http://localhost:${clientPort}`)
})

oauthRoute.get('/github', passport.authenticate('github'))
oauthRoute.get('/github/callback', (req, res, next) => {
	if (!req.isAuthenticated())
		passport.authenticate('github', { session: false }, async (err, user) => {
			if (user) {
				const jwt = await getJWT(user)
				res.cookie('jwtToken', jwt, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false })
				return res.redirect(`http://localhost:${clientPort}`)
			}
			return res.redirect(`http://localhost:${clientPort}/login`)
		})(req, res, next)
	else res.redirect(`http://localhost:${clientPort}`)
})

oauthRoute.get('/google', passport.authenticate('google'))
oauthRoute.get('/google/callback', (req, res, next) => {
	if (!req.isAuthenticated())
		passport.authenticate('google', { session: false }, async (err, user) => {
			console.log(err, user)
			if (user) {
				const jwt = await getJWT(user)
				res.cookie('jwtToken', jwt, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false })
				return res.redirect(`http://localhost:${clientPort}`)
			}
			return res.redirect(`http://localhost:${clientPort}/login`)
		})(req, res, next)
	else res.redirect(`http://localhost:${clientPort}`)
})
module.exports = oauthRoute
