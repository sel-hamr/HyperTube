import React from 'react';
import { GetListMovieFavorite } from '../Assets/GetListMovieFavorite';
import '../Css/FavoriteMovie.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MovieCart } from './MovieCart';
import noData from '../Images/no-data.svg';
export const FavoriteMovie = () => {
  const [favoriteMovie, setFavoriteMovie] = React.useState(false);
  React.useEffect(() => {
    const dataMovies = async () => {
      const test = await GetListMovieFavorite();
      setFavoriteMovie(test);
    };
    dataMovies();
  }, []);
  return (
    <div className='Favorite' style={{ height: favoriteMovie instanceof Array ? 'auto' : '90%' }}>
      {favoriteMovie ? (
        favoriteMovie instanceof Array ? (
          favoriteMovie.map((movie, key) => <MovieCart movie={movie} key={key} setFavoriteMovie={setFavoriteMovie} />)
        ) : (
          <div className='NoData'>
            <img src={noData} className='ImageNoData' />
            <p>Ups!... no results found</p>
          </div>
        )
      ) : (
        <CircularProgress color='secondary' />
      )}
    </div>
  );
};
