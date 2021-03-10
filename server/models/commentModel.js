const { query } = require(__dirname + '/../services/mysqlService')

const getComments = async function (imdbID, userID) {
	const comments = await query(
		`SELECT IF(u.userID = ?,1,0) AS 'myComment',commentID,commentContent,date,u.userName,image FROM Comments c,Users u WHERE u.userID=c.userID AND imdbID=? ORDER BY date DESC`,
		[userID, imdbID]
	)
	return comments
}

const insertComment = async function (values) {
	const resultInsert = await query('INSERT INTO Comments SET ?', [values])
	return resultInsert.affectedRows ? resultInsert : false
}

const deleteComment = async function (imdbID, userID, commentID) {
	const resultDelete = await query('DELETE FROM Comments WHERE imdbID = ? AND userID=? AND commentID = ?', [imdbID, userID, commentID])
	return resultDelete.affectedRows ? resultDelete : false
}

module.exports = {
	getComments,
	insertComment,
	deleteComment,
}
