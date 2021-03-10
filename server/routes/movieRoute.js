const express = require("express");
const { getOneMovie, countWatchedMovies, lastWatchedMovies, countUserWatchedMovies, watchedMovies } = require("../controllers/movieController");
const movieRoute = express.Router();

movieRoute.get("/count/:userName", countUserWatchedMovies);
movieRoute.get("/lastWatched", lastWatchedMovies);
movieRoute.get("/watched", watchedMovies);
movieRoute.get("/:imdbID/:torrentHash", getOneMovie);
movieRoute.get("/:imdbID", countWatchedMovies);

module.exports = movieRoute;
