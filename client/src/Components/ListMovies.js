import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { DataContext } from '../Context/AppContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../Css/ListMovies.css';
import { MovieCart } from './MovieCart';
import PopCorn from 'popcorn-api';

export default function ListMovies() {
  const ctx = React.useContext(DataContext);
  const [listMovies, setListMovies] = React.useState(ctx.cache.listMovies);

  React.useEffect(() => {
    let unmount = false;
    const awaitData = async () => {
      ctx.cache.listMovies = await ctx.GetMovies(1, [], ctx.cache.filter);
      ctx.ref.setListMovies = setListMovies;
      if (!unmount) setListMovies(ctx.cache.listMovies);
    };
    if (!unmount) awaitData();
    return () => {
      ctx.ref.setListMovies = null;
      unmount = true;
    };
  }, [ctx.Lang]);
  return (
    <div className='ListMovie'>
      {listMovies.middleware ? (
        <CircularProgress style={{ marginTop: '35px' }} />
      ) : (
        <>
          {listMovies.list.map((movie, key) => (
            <MovieCart movie={movie} key={key} />
          ))}
          {ctx.cache.listMovies.next ? <LinearProgress color='secondary' style={{ position: 'absolute', bottom: '0px', width: '100%' }} /> : ''}
        </>
      )}
    </div>
  );
}
