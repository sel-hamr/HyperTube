module.exports = {
	db_config: {
		user: 'root',
		password: 'Test12345@',
		database: 'HyperTube',
	},
	mail_config: {
		service: 'gmail',
		auth: {
			user: 'camagru1337aelimra@gmail.com',
			pass: 'ael-imra@1337',
		},
	},
	keys: {
		github: {
			clientID: '784b5eadefe75bf9b50e',
			clientSecret: 'fe432bed80a3ae7d1fc593391ca00894e6ffe112',
		},
		42: {
			clientID: 'b817b9f39dfe514c0105f7169f2401a26baba4582d74d8e3412629b09d3d0c76',
			clientSecret: 'a8b51d4317afe8a3ef546b59a75a73700a9a90f3581b7224e33036da239a221a',
		},
		google: {
			clientID: '796813640888-nrb136ms4ev2sgevu8isqli1bpvl7j6t.apps.googleusercontent.com',
			clientSecret: 'kOFrkVFsRXt5Q8OBrYDUE-ap',
		},
		jwt: 'b817b9f39dfe514c0105f7169f2401a26baba4582d74d8e3412629b09d3d0c76',
		themoviedb: '11f791476f04c7b213de1050fd41cdcb',
	},
	opensubtitles_config: {
		useragent: 'UserAgent',
		username: '1337Hypertube',
		password: 'ael-imra@1337',
	},
	host: 'localhost',
	port: 1337,
	clientPort: 3000,
}
