const mysql = require('mysql')
const { db_config } = require(__dirname + '/../configs/indexConfig')
const pool = mysql.createPool(db_config)

/**
 * CREATE PROMISE QUERY INSTEAD OF CALLBACK
 **/
const query = function (sql, params) {
	const queryPromise = new Promise((resolve, reject) => {
		pool.getConnection((connectionError, connection) => {
			if (connectionError) reject(connectionError)
			else {
				connection.query(sql, params, (queryError, queryResult) => {
					if (queryError) reject(queryError)
					resolve(queryResult)
					connection.release()
				})
			}
		})
	})
	return queryPromise
}

module.exports = {
	query,
	pool,
}
