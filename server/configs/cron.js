const cron = require('node-cron')
const { deleteMoviesNotWatched } = require(__dirname + '/../services/movieService')

module.exports = function () {
	cron.schedule('59 23 * * *', () => {
		deleteMoviesNotWatched()
	})
}
