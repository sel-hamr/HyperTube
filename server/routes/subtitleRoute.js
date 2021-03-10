const express = require('express')
const { getSubtitle } = require('../controllers/subtitleController')
const subtitleRoute = express.Router()

subtitleRoute.get('/:imdbID/:lang', getSubtitle)
module.exports = subtitleRoute
