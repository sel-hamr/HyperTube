import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Rating from '@material-ui/lab/Rating';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useHistory } from 'react-router-dom';

import { DataContext } from '../Context/AppContext';

import { toggleMyList } from '../Assets/toggleMyList';
export const CartSlider = (props) => {
  const [movie, setMovie] = React.useState(props.movie);
  const ctx = React.useContext(DataContext);
  let history = useHistory();
  return (
    <div className={`${props.index === props.sliderActive ? 'BoxSlider SliderActive' : 'BoxSlider SlideNoActive'}`}>
      <img src={movie.image} />
      <div className='detail'>
        <p>{movie.title}</p>
        <div className='Rating'>
          <Rating name='read-only' value={movie.rating / 2} max={5} precision={0.1} readOnly size='large' />
          <p>{movie.date}</p>
          <p>{movie.original_language}</p>
        </div>
        <p>{movie.overview}</p>
        <div className='SliderAction'>
          <Button
            variant='contained'
            startIcon={<PlayArrowIcon style={{ fontSize: '35px' }} />}
            onClick={async () => {
              // const getImdbCode = await Axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=7a518fe1d1c5359a4929ef4765c347fb`);
              history.push(`/movie/${movie.imdbCode}`);
            }}
            style={{
              backgroundColor: '#ec4646',
              color: 'white',
              textTransform: 'none',
              width: '180px',
              fontSize: '18px',
              marginTop: '15px',
            }}>
            {ctx.Languages[ctx.Lang].Watch}
          </Button>
          <Button
            variant='contained'
            startIcon={movie.isFavorite ? <DeleteOutlineIcon style={{ fontSize: '25px' }} /> : <AddIcon style={{ fontSize: '20px' }} />}
            onClick={(e) => {
              if (movie.isFavorite) toggleMyList('remove', movie.imdbCode);
              else toggleMyList('add', movie.imdbCode);
              setMovie((oldValue) => ({ ...oldValue, isFavorite: movie.isFavorite ? false : true }));
            }}
            style={{
              backgroundColor: 'rgba(34, 40, 49, 0.86)',
              color: 'white',
              textTransform: 'none',
              fontSize: '18px',
              minWidth: '180px',
              marginTop: '15px',
            }}>
            {movie.isFavorite ? ctx.Languages[ctx.Lang].RemoveFromMyList : ctx.Languages[ctx.Lang].AddToList}
          </Button>
        </div>
      </div>
    </div>
  );
};
