import React from 'react';
import { DataContext } from '../Context/AppContext';
import '../Css/MovieDetail.css';
import { GetMovie } from '../Assets/GetMovie';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MovieCart } from './MovieCart';
import Comments from './Comments';
import MovieIntro from './MovieIntro';
export const MovieDetail = () => {
  let { code } = useParams();
  const ctx = React.useContext(DataContext);
  const [movieInfo, setMovieInfo] = React.useState(ctx.cache.movieInfo);
  const [quality, setQuality] = React.useState(0);
  React.useEffect(() => {
    let unmount = false;
    async function awaitData() {
      ctx.ref.setMovieInfo = setMovieInfo;
      const data = await GetMovie(code);
      if (!unmount) setMovieInfo(data);
    }
    if (!unmount) awaitData();
    return () => (unmount = true);
  }, [code, ctx.Lang]);
  return movieInfo instanceof Object ? (
    <div className='MovieDetail'>
      <div className='movieDetailImage'>{movieInfo.coverImage !== '' ? <img src={movieInfo.coverImage ? movieInfo.coverImage : ''} /> : <p style={{ color: 'white', fontSize: '45px' }}>Image Not Found</p>}</div>
      <MovieIntro data={movieInfo} />
      <div className='Stream'>
        <AppBar style={{ backgroundColor: '#222831', height: '48px' }} position='static'>
          <Tabs value={quality} onChange={(event, newValue) => setQuality(newValue)} variant='scrollable' scrollButtons='on'>
            {movieInfo.torrents.map((item, key) => (
              <Tab label={`${item.quality} ${item.type}`} key={key} />
            ))}
          </Tabs>
        </AppBar>
        {movieInfo.torrents.map((movie, key) =>
          quality === key ? (
            <video width='100%' height='700px' controls crossOrigin='use-credentials' key={key}>
              <source src={`http://localhost:1337/movie/${movieInfo.imdbCode}/${movie.hash}`} type='video/mp4' />
              <track label='English' kind='subtitles' srcLang='en' src={`http://localhost:1337/subtitle/${movieInfo.imdbCode}/en`} />
              <track label='French' kind='subtitles' srcLang='fr' src={`http://localhost:1337/subtitle/${movieInfo.imdbCode}/fr`} />
            </video>
          ) : (
            ''
          )
        )}
      </div>
      <div className='Suggestions'>
        {movieInfo.suggestions.map((movie, key) => (
          <MovieCart movie={movie} key={key} callBack />
        ))}
      </div>
      <Comments data={movieInfo} code={code} />
    </div>
  ) : (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress color='secondary' />
    </div>
  );
};
// hash: "16B087DFF9C8153072BD35C1BEC245CB831AEF4D"
// quality: "3D"
// type: "bluray"
