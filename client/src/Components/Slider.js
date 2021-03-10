import React from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import '../Css/Slider.css';
import Axios from 'axios';
import { UseWindowSize } from '../Assets/UseWindowSize';
import { CartSlider } from './CartSlider';
export default function Slider() {
  const width = UseWindowSize();

  const [sliderActive, setSliderActive] = React.useState(0);
  const [listPopularMovies, setListPopularMovies] = React.useState([]);

  React.useEffect(async () => {
    let unmount = false;
    const popularMovies = await Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7a518fe1d1c5359a4929ef4765c347fb`);
    const listFavorite = await Axios(`http://localhost:1337/favorite/imdbID`, { withCredentials: true });
    const detailPopularMovies = await new Promise((resolve) => {
      const result = [];
      popularMovies.data.results.map(async (movie) => {
        const image = await Axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=7a518fe1d1c5359a4929ef4765c347fb`);
        const getImdbCode = await Axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=7a518fe1d1c5359a4929ef4765c347fb`);
        image.data.backdrops.sort((a, b) => b.width - a.width);
        result.push({
          id: movie.id,
          title: movie.title,
          original_language: movie.original_language,
          image: `https://image.tmdb.org/t/p/original/${image.data.backdrops[0].file_path}`,
          overview: movie.overview,
          date: parseInt(movie.release_date),
          rating: movie.vote_average,
          isFavorite: listFavorite.data.body instanceof Array && listFavorite.data.body.findIndex((a) => a.imdbID === getImdbCode.data.imdb_id) !== -1 ? true : false,
          imdbCode: getImdbCode.data.imdb_id,
        });
        if (result.length === popularMovies.data.results.length) resolve(result);
      });
    });
    if (!unmount) setListPopularMovies(detailPopularMovies);
    return () => (unmount = true);
  }, []);
  return width > 600 ? (
    <div className='Slide'>
      {sliderActive !== 0 ? (
        <NavigateBeforeIcon
          onClick={() => {
            setSliderActive(sliderActive === 0 ? listPopularMovies.length - 1 : sliderActive - 1);
          }}
          style={{ fontSize: '55px', cursor: 'pointer', position: 'absolute', left: '25px', zIndex: '1', color: 'white' }}
        />
      ) : (
        ''
      )}
      {listPopularMovies.map((movie, key) => (
        <CartSlider key={key} index={key} movie={movie} sliderActive={sliderActive} />
      ))}
      {sliderActive !== listPopularMovies.length - 1 ? (
        <NavigateNextIcon
          onClick={() => {
            setSliderActive(sliderActive === listPopularMovies.length - 1 ? 0 : sliderActive + 1);
          }}
          style={{ fontSize: '55px', cursor: 'pointer', position: 'absolute', right: '25px', zIndex: '1', color: 'white' }}
        />
      ) : (
        ''
      )}
    </div>
  ) : (
    ''
  );
}
