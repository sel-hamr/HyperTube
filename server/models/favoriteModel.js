const { query } = require(__dirname + '/../services/mysqlService')

const getFavorites = async function (userID, justImdbID) {
	const needed = justImdbID
		? justImdbID
		: "favoriteID,imdbID,movieTitle,movieImage,movieLanguage,movieRelease,movieRating,movieTime,movieGenre,movieDescription,(SELECT COUNT(userID) FROM Viewed WHERE userID=f.userID AND imdbID=f.imdbID) AS 'watched'"
	const favorites = await query(`SELECT ${needed} FROM Favorites f WHERE userID=?`, userID)
	return favorites
}

const getCountFavoriteMovie = async function (userID) {
	const [{ count }] = await query('SELECT COUNT(*) as count FROM Favorites WHERE userID=?', userID)
	return count
}

const insertFavorite = async function (values) {
	const resultInsert = await query('INSERT INTO Favorites SET ?', [values])
	return resultInsert.affectedRows ? resultInsert : false
}

const deleteFavorite = async function (imdbID, userID) {
	const resultDelete = await query('DELETE FROM Favorites WHERE imdbID = ? AND userID=?', [imdbID, userID])
	return resultDelete.affectedRows ? resultDelete : false
}
const checkFavorite = async function (imdbID, userID) {
	const [user] = await query('SELECT userID FROM Favorites WHERE imdbID = ? AND userID=?', [imdbID, userID])
	return user ? true : false
}

module.exports = {
	getFavorites,
	insertFavorite,
	deleteFavorite,
	checkFavorite,
	getCountFavoriteMovie,
}
