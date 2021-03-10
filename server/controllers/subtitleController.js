const fs = require('fs')
const path = require('path')
const { downloadSubtitles } = require('../services/streamService')
const getSubtitle = async function (req, res, next) {
	try {
		const { imdbID, lang } = req.params
		if (typeof imdbID === 'string' && imdbID.length <= 10 && (lang === 'fr' || lang === 'en')) {
			const filename = path.join(__dirname, '../downloads/subtitles', `${imdbID}/${lang}.vtt`)
			if (!fs.existsSync(filename)) await downloadSubtitles(imdbID, lang)
			if (fs.existsSync(filename)) {
				res.setHeader('Content-Type', 'text/vtt')
				return res.send(fs.readFileSync(filename).toString())
			}
		}
		return res.send({
			type: 'error',
			status: 400,
			body: { Eng: 'Incorrect parameters', Fr: 'Paramètres incorrects' },
		})
	} catch (err) {
		next(err)
	}
}

module.exports = {
	getSubtitle,
}
