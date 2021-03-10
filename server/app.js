const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('./configs/passportConfig');
const authRoute = require('./routes/authRoute');
const oauthRoute = require('./routes/oauthRoute');
const profileRoute = require('./routes/profileRoute');
const commentRoute = require('./routes/commentRoute');
const favoriteRoute = require('./routes/favoriteRoute');
const movieRoute = require('./routes/movieRoute');
const subtitleRoute = require('./routes/subtitleRoute');
const { authentication, jwt } = require('./middleware/authentication');
const errorHandler = require('./middleware/errorHandler');
const { clientPort } = require('./configs/indexConfig');
const cron = require('./configs/cron');

const app = express();
cron();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(jwt);
app.use(passport.initialize());
app.use('/oauth', oauthRoute);
app.use('/auth', authRoute);
app.use('/profile', authentication, profileRoute);
app.use('/comment', authentication, commentRoute);
app.use('/favorite', authentication, favoriteRoute);
app.use('/movie', authentication, movieRoute);
app.use('/subtitle', authentication, subtitleRoute);
app.use('/image', express.static('image'));
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.type('.html');
    return res.sendFile(__dirname + '/public/index.html');
  }
  return res.redirect(`http://localhost:${clientPort}`);
});
app.get('/login', (req, res) => {
  if (!req.isAuthenticated()) {
    res.type('.html');
    return res.sendFile(__dirname + '/public/login.html');
  }
  return res.redirect(`http://localhost:${clientPort}`);
});
app.use(errorHandler);
module.exports = app;
