import Axios from "axios";
export const GetMovies = async (page, oldValue, search) => {
  let { rating, order, genre, title, sort } = search;
  if (sort === "") sort = "download_count";
  if (genre === "All") genre = "";
  if (sort === "rating" && rating === 0) rating = 0.1;
  let test = await new Promise(async (resolve) => {
    let arrayMovies;
    const rog = [];
    let movies = [];
    let i = page;
    const listFavorite = await Axios.get(`/favorite/imdbID`, { withCredentials: true });
    const listWatch = await Axios.get(`/movie/watched`, { withCredentials: true });
    try {
      while (i) {
        arrayMovies = await Axios.get(
          `https://yts.megaproxy.info/api/v2/list_movies.json?page=${i}&minimum_rating=${rating}&genre=${genre}&limit=30&query_term=${title}&sort_by=${sort}&order_by=${order}`
        );
        if (arrayMovies.data.data.movies) {
          arrayMovies.data.data.movies.forEach((movie) => {
            if (oldValue.findIndex((element) => element.id === movie.id) === -1)
              rog.push({
                image: movie.large_cover_image,
                year: movie.year,
                titre: movie.title_english,
                description: movie.summary,
                rating: movie.rating,
                runtime: movie.runtime,
                genres: movie.genres ? movie.genres : [],
                language: movie.language,
                imdbCode: movie.imdb_code,
                id: movie.id,
                isFavorite: listFavorite.data.body instanceof Array && listFavorite.data.body.findIndex((a) => a.imdbID === movie.imdb_code) !== -1 ? true : false,
                isWatched: listWatch.data.body instanceof Array && listWatch.data.body.findIndex((a) => a.imdbID === movie.imdb_code) !== -1 ? true : false,
              });
          });
          i++;
          movies = [...oldValue, ...rog];
          if (rog.length >= 20) break;
        } else break;
      }
      resolve({ list: movies, page: i, next: arrayMovies.data.data.movie_count > movies.length, middleware: false });
    } catch (error) {
      return resolve(await GetMoviesBackup(page, oldValue, search));
    }
  });
  return test;
};

export const GetMoviesBackup = async (page, oldValue, search) => {
  let { genre, title, sort } = search;
  genre = genre === "All" ? "" : `&genre=${genre}`;
  if (sort === "rating") sort = "seeds";
  let test = await new Promise(async (resolve) => {
    let arrayMovies;
    const rog = [];
    let movies = [];
    let i = page;
    while (i) {
      arrayMovies = await Axios.get(`https://api.apipop.net/list?page=${i}${genre}&keywords=${title}&sort=${sort}`);
      if (arrayMovies.data.MovieList) {
        arrayMovies.data.MovieList.forEach((movie) => {
          if (oldValue.findIndex((element) => element.id === movie.id) === -1)
            rog.push({
              image: movie.poster_big,
              year: movie.year,
              titre: movie.title,
              description: movie.description,
              rating: movie.rating,
              runtime: movie.runtime,
              genres: movie.genres,
              language: "none",
              imdbCode: movie.imdb,
              id: movie.id,
            });
        });
        i++;
        movies = [...oldValue, ...rog];
        if (rog.length >= 20) break;
      } else break;
    }
    resolve({ list: movies, page: i, next: movies.length !== 0, middleware: false });
  });
  return test;
};
