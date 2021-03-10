const { getFavorites, getCountFavoriteMovie, checkFavorite, insertFavorite, deleteFavorite } = require('../models/favoriteModel');
const { getUser } = require(__dirname + '/../models/userModel');
const { getMovieDBInfo } = require(__dirname + '/../models/movieModel');
const { getMovieInfo } = require('../services/movieService');

const getAllFavorites = async function (req, res, next) {
  try {
    const { justImdbID } = req.params;
    const allFavorites = await getFavorites(req.user, justImdbID ? 'imdbID' : false);
    if (allFavorites.length > 0)
      return res.send({
        type: 'success',
        status: 200,
        body: allFavorites,
      });
    return res.send({
      type: 'error',
      status: 403,
      body: { Eng: 'Favorites not found', Fr: 'Favoris non trouvés' },
    });
  } catch (err) {
    next(err);
  }
};

const addFavorite = async function (req, res, next) {
  try {
    const { imdbID } = req.body;
    if (typeof imdbID !== 'string' || imdbID.trim().length > 10)
      return res.send({
        type: 'error',
        status: 400,
        body: { Eng: 'Incorrect imdbID', Fr: 'Incorrect imdbID' },
      });
    const found = await checkFavorite(imdbID.trim(), req.user);
    if (found)
      return res.send({
        type: 'warning',
        status: 403,
        body: { Eng: 'Already have this movie on favorite', Fr: "J'ai déjà ce film en favori" },
      });
    const movieDB = await getMovieDBInfo(imdbID.trim());
    if (movieDB && movieDB.movieTitle) {
      const resultInsert = await insertFavorite({
        userID: req.user,
        imdbID: imdbID.trim(),
        ...movieDB,
      });
      if (resultInsert.insertId)
        return res.send({
          type: 'success',
          status: 200,
          body: resultInsert.insertId,
        });
      return res.send({
        type: 'error',
        status: 403,
        body: { Eng: 'Insert failed', Fr: "L'insertion a échoué" },
      });
    }
    const movie = await getMovieInfo(imdbID.trim());
    const { original_title, poster_path, vote_average, overview, runtime, original_language, genres, release_date } = movie;
    const movieGenre = [];
    if (genres) for (const value of genres) movieGenre.push(value.name);
    const resultInsert = await insertFavorite({
      userID: req.user,
      imdbID: imdbID.trim(),
      movieTitle: original_title,
      movieRating: vote_average,
      movieImage: poster_path,
      movieDescription: [...overview].splice(0, 1024).toString().replaceAll(',', ''),
      movieTime: runtime,
      movieLanguage: original_language,
      movieGenre: JSON.stringify(movieGenre),
      movieRelease: new Date(release_date).getFullYear(),
    });
    if (resultInsert.insertId)
      return res.send({
        type: 'success',
        status: 200,
        body: resultInsert.insertId,
      });
    return res.send({
      type: 'error',
      status: 403,
      body: { Eng: 'Insert failed', Fr: "L'insertion a échoué" },
    });
  } catch (err) {
    if (err.response)
      return res.send({
        type: 'error',
        status: 403,
        body: { Eng: 'Movie not found', Fr: 'Film introuvable' },
      });
    next(err);
  }
};

const removeFavorite = async function (req, res, next) {
  try {
    const { imdbID } = req.body;
    if (typeof imdbID !== 'string' || imdbID.trim().length > 10)
      return res.send({
        type: 'error',
        status: 400,
        body: { Eng: 'Incorrect imdbID', Fr: 'Incorrect imdbID' },
      });
    const deleteResult = await deleteFavorite(imdbID.trim(), req.user);
    if (deleteResult)
      return res.send({
        type: 'success',
        status: 200,
        body: { Eng: 'Deleted successful', Fr: 'Supprimé avec succès' },
      });
    return res.send({
      type: 'error',
      status: 403,
      body: { Eng: 'Deleted failed', Fr: 'Supprimé a échoué' },
    });
  } catch (err) {
    next(err);
  }
};

const getCountFavorite = async function (req, res, next) {
  try {
    const { userName } = req.params;
    if (userName && userName.length <= 40) {
      const user = await getUser({ userName }, 'userID');
      if (user && user.userID) {
        const count = await getCountFavoriteMovie(user.userID);
        return res.send({
          type: 'success',
          status: 200,
          body: count,
        });
      }
      return res.send({
        type: 'error',
        status: 400,
        body: { Eng: 'username not found', Fr: "Nom d'utilisateur introuvable" },
      });
    }
    return res.send({
      type: 'error',
      status: 400,
      body: { Eng: 'Wrong username', Fr: "Mauvais nom d'utilisateur" },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFavorites,
  addFavorite,
  removeFavorite,
  getCountFavorite,
};
