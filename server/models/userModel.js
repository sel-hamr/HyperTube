const { query } = require(__dirname + '/../services/mysqlService')

const getUser = async function (dependencies, keys) {
	const [user] = await query(`SELECT ${keys.toString()} FROM Users WHERE ?`, dependencies)
	return user
}

const insertUser = async function (values) {
	const resultInsert = await query('INSERT INTO Users SET ?', [values])
	return resultInsert.affectedRows ? resultInsert : false
}
const insertLocalUser = async function (values) {
	const resultInsert = await query(
		"INSERT INTO Users SET userID=CONCAT('lo_',(SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='HyperTube' AND TABLE_NAME='Users')),?",
		[values]
	)
	return resultInsert.affectedRows ? resultInsert : false
}

const updateUser = async function (userID, values) {
	const resultUpdate = await query('UPDATE Users SET ? WHERE userID=?', [values, userID])
	return resultUpdate.affectedRows ? resultUpdate : false
}

const deleteUser = async function (dependencies) {
	const resultDelete = await query('DELETE FROM Users WHERE ?', [dependencies])
	return resultDelete.affectedRows ? resultDelete : false
}
const checkUserExist = async function (username, email) {
	const [user] = await query('SELECT userID FROM Users WHERE userName=? AND Email=?', [username, email])
	if (user) return 'userName and email'
	const [userUserName] = await query('SELECT userID FROM Users WHERE userName=?', [username])
	if (userUserName) return 'userName'
	const [userEmail] = await query('SELECT userID FROM Users WHERE email=?', [email])
	return userEmail ? 'email' : false
}

module.exports = {
	getUser,
	insertUser,
	insertLocalUser,
	updateUser,
	deleteUser,
	checkUserExist,
}
