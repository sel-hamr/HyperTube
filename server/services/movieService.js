const fs = require('fs');
const path = require('path');
const { keys } = require(__dirname + '/../configs/indexConfig');
const axios = require('axios');
const { getUnwatchedMovie } = require('../models/movieModel');
const deleteMoviesNotWatched = async function () {
  const movies = await getUnwatchedMovie();
  for (movie of movies) {
    const moviePath = path.join(__dirname, '../downloads/videos/', movie.moviePath);
    if (fs.existsSync(moviePath)) fs.unlink(moviePath);
  }
};
const getMovieInfo = async function (imdbID) {
  const movie = await axios.get(`https://api.themoviedb.org/3/movie/${imdbID}?api_key=${keys.themoviedb}`);
  return movie.data;
};
module.exports = {
  getMovieInfo,
  deleteMoviesNotWatched,
};
