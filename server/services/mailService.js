const fs = require('fs')

const readFilePromise = function (file) {
	return new Promise((resolve) => fs.readFile(file, (err, data) => resolve(data)))
}
const mailContent = async function (userName, subject, url, token) {
	const needed = {
		reset: {
			message: 'reset your password',
			button: 'Reset password',
		},
		active: {
			message: 'active your account',
			button: 'Active account',
		},
	}
	const data = await readFilePromise(__dirname + '/../layout/mail.html')
	return data
		.toString()
		.replace('${token}', token)
		.replace('${userName}', userName)
		.replace('${message}', needed[subject].message)
		.replace('${button}', needed[subject].button)
		.replace('${url}', url)
}

module.exports = mailContent
