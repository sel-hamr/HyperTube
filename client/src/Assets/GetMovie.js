import Axios from 'axios';

export const GetMovie = async (code) => {
  const codeMovie = await Axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${code}`);
  const movieInfo = await (await Axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${codeMovie.data.data.movies[0].id}&with_images=true&with_cast=true`)).data.data.movie;
  const images = await Axios.get(`https://api.themoviedb.org/3/movie/${movieInfo.imdb_code}/images?api_key=7a518fe1d1c5359a4929ef4765c347fb`);
  let suggestions = await (await Axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${codeMovie.data.data.movies[0].id}`)).data.data.movies;
  const listFavorite = await Axios(`/favorite/imdbID`, { withCredentials: true });
  const countWatchedMovies = await Axios.get(`/movie/${movieInfo.imdb_code}`, { withCredentials: true });
  suggestions = suggestions.map((movie) => ({
    image: movie.medium_cover_image,
    id: movie.id,
    titre: movie.title,
    year: movie.year,
    runtime: movie.runtime,
    rating: movie.rating,
    language: movie.language,
    genres: movie.genres,
    description: movie.description_full,
    imdbCode: movie.imdb_code,
  }));
  images.data.backdrops.sort((a, b) => b.width - a.width);
  return {
    titleLong: movieInfo.title_long,
    title: movieInfo.title,
    year: movieInfo.year,
    imdbCode: movieInfo.imdb_code,
    cast: movieInfo.cast instanceof Array ? movieInfo.cast : [],
    description: movieInfo.description_full,
    genres: movieInfo.genres,
    id: movieInfo.id,
    language: movieInfo.language,
    postImage: `https://image.tmdb.org/t/p/original/${images.data.posters[0].file_path}`,
    coverImage: images.data.backdrops.length && images.data.backdrops[0].hasOwnProperty('file_path') ? `https://image.tmdb.org/t/p/original/${images.data.backdrops[0].file_path}` : '',
    screenshotImage: [movieInfo.large_screenshot_image1, movieInfo.large_screenshot_image2, movieInfo.large_screenshot_image3],
    runtime: movieInfo.runtime,
    codeTrailer: movieInfo.yt_trailer_code,
    torrents: movieInfo.torrents.map((item) => ({ quality: item.quality, hash: item.hash, type: item.type })),
    rating: movieInfo.rating,
    dateUploaded: movieInfo.date_uploaded,
    suggestions,
    isFavorite: listFavorite.data.body instanceof Array && listFavorite.data.body.findIndex((a) => a.imdbID === movieInfo.imdb_code) === -1 ? false : true,
    countWatchedMovies: countWatchedMovies.data.body,
  };
};
