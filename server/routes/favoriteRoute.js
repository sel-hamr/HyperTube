const express = require("express");
const { getAllFavorites, getCountFavorite, removeFavorite, addFavorite } = require("../controllers/favoriteController");
const favoriteRoute = express.Router();

favoriteRoute.get("/count/:userName", getCountFavorite);
favoriteRoute.get("/:justImdbID", getAllFavorites);
favoriteRoute.get("/", getAllFavorites);
favoriteRoute.post("/delete", removeFavorite);
favoriteRoute.post("/", addFavorite);

module.exports = favoriteRoute;
