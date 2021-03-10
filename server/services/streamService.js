const OS = require('opensubtitles-api')
const fs = require('fs')
const path = require('path')
const torrentStream = require('torrent-stream')
const download = require('download')
const srt2vtt = require('srt-to-vtt')
const ffmpeg = require('fluent-ffmpeg')
const mkdirp = require('mkdirp')
const { opensubtitles_config } = require('../configs/indexConfig')

const checkNeedConvert = function (filePath) {
	const ext = path.extname(filePath).replace('.', '')
	if (ext !== 'mp4' && ext !== 'opgg' && ext !== 'webm') return true
	return false
}
const convertStream = async function (file) {
	return new Promise((resolve) => {
		try {
			const streamObject = {}
			streamObject.streamFile = new ffmpeg(file.createReadStream()).format('webm').on('error', (err) => {
				streamObject.err = err
			})
			resolve(streamObject)
		} catch (err) {
			resolve({ err })
		}
	})
}
const downloadSubtitles = function (imdbID, lang) {
	return new Promise(async (resolve) => {
		const OpenSubtitles = new OS(opensubtitles_config)
		const subtitles = await OpenSubtitles.search({
			imdbid: imdbID,
			extensions: ['vtt', 'srt'],
		})
		if (lang in subtitles) {
			const dirPath = path.join(__dirname, '..', 'downloads/subtitles', imdbID)
			const filePath = path.join(dirPath, `${lang}.vtt`)
			if (!fs.existsSync(dirPath)) {
				const made = await mkdirp(dirPath)
				if (made)
					fs.writeFile(filePath, '', (err) => {
						download(subtitles[lang].url)
							.pipe(srt2vtt())
							.pipe(fs.createWriteStream(filePath).on('finish', () => resolve()))
					})
			} else
				fs.writeFile(filePath, '', (err) => {
					download(subtitles[lang].url)
						.pipe(srt2vtt())
						.pipe(fs.createWriteStream(filePath).on('finish', () => resolve()))
				})
		} else resolve()
	})
}

const downloadStream = async function (torrentHash, completedDownload) {
	return new Promise((resolve) => {
		try {
			const engine = torrentStream('magnet:?xt=urn:btih:' + torrentHash, {
				path: __dirname + '/../downloads/videos',
			})
			engine.on('ready', () => {
				/**
				 * sort files desc
				 * portended the large file is video
				 */
				engine.files.sort((file1, file2) => file2.length - file1.length)
				engine.files.map((file) => file.select())
				resolve({ file: engine.files[0], needConvert: checkNeedConvert(engine.files[0].path) })
				engine.on('idle', () => {
					completedDownload()
					engine.destroy()
				})
			})
		} catch (err) {
			resolve({ err })
		}
	})
}
const getFileStream = async function (filePath) {
	const file = {}
	try {
		if (fs.existsSync(path.join(__dirname, '../downloads/videos/', filePath))) {
			const parts = filePath.split('/')
			const status = await fs.promises.stat(path.join(__dirname, '../downloads/videos/', filePath))
			file.name = parts.length >= 2 ? parts[parts.length - 1] : parts[0]
			file.path = path
			file.length = status.size
			file.createReadStream = function (opts) {
				const params = [path.join(__dirname, '../downloads/videos/', filePath)]
				if (opts) params.push(opts)
				return fs.createReadStream(...params)
			}
			file.needConvert = checkNeedConvert(filePath)
			return { file }
		}
		return { err: "file doesn't exist" }
	} catch (err) {
		return { err }
	}
}

module.exports = {
	downloadStream,
	downloadSubtitles,
	convertStream,
	checkNeedConvert,
	getFileStream,
}
