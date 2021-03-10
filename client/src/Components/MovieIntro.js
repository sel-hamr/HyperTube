import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { DataContext } from '../Context/AppContext';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import { toggleMyList } from '../Assets/toggleMyList';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

export default function MovieIntro(props) {
  const ctx = React.useContext(DataContext);
  const [showImage, setShowImage] = React.useState({ src: '', state: false });
  const [dataMovie, setDataMovie] = React.useState(props.data);
  return (
    <div className='movieInfo'>
      <div>
        <p>{dataMovie.titleLong}</p>
        <p>imdb {dataMovie.rating}</p>
        <p>{dataMovie.language}</p>
      </div>
      <Divider style={{ backgroundColor: '#ffffffa3' }} />
      <div>
        <div className='CommentAndList'>
          <img src={dataMovie.postImage} alt='...' />
          <Button
            startIcon={dataMovie.isFavorite ? <DeleteOutlineIcon style={{ fontSize: '25px' }} /> : <AddIcon style={{ fontSize: '20px' }} />}
            variant='contained'
            size='small'
            style={{
              backgroundColor: '#222831',
              color: 'white',
              textTransform: 'none',
              marginTop: '10px',
              width: '300px',
              height: '40px',
              fontSize: '15px',
              fontWeight: '600',
            }}
            onClick={async () => {
              if (dataMovie.isFavorite) toggleMyList('remove', dataMovie.imdbCode);
              else toggleMyList('add', dataMovie.imdbCode);
              setDataMovie((oldValue) => ({ ...oldValue, isFavorite: dataMovie.isFavorite ? false : true }));
            }}>
            {dataMovie.isFavorite ? ctx.Languages[ctx.Lang].RemoveFromMyList : ctx.Languages[ctx.Lang].AddToList}
          </Button>
          <Button
            startIcon={<MoreHorizIcon style={{ fontSize: '25px' }} />}
            variant='contained'
            size='small'
            onClick={() => {
              if (ctx.ref.setShowComment) ctx.ref.setShowComment(true);
            }}
            style={{
              backgroundColor: '#222831',
              color: 'white',
              textTransform: 'none',
              marginTop: '10px',
              width: '300px',
              height: '40px',
              fontSize: '15px',
              fontWeight: '600',
            }}>
            show comment
          </Button>
        </div>
        <div className='DetailAndDescription'>
          <div className='DetailAndGallery'>
            <div className='Detail'>
              <p>{dataMovie.title}</p>
              <div>
                <p>{dataMovie.runtime} Min</p>
                <Divider orientation='vertical' style={{ backgroundColor: '#ffffffa3', height: '60%', marginRight: '10px' }} />
                <p>{dataMovie.genres ? dataMovie.genres.toString() : ''}</p>
                <Divider orientation='vertical' style={{ backgroundColor: '#ffffffa3', height: '60%', marginRight: '10px' }} />
                <p>{dataMovie.year}</p>
                <Divider orientation='vertical' style={{ backgroundColor: '#ffffffa3', height: '60%', marginRight: '10px' }} />
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  <VisibilityIcon style={{ fontSize: '15px', marginRight: '5px' }} /> {dataMovie.countWatchedMovies}
                </p>
              </div>
              <Divider style={{ backgroundColor: '#ffffffa3', width: '90%', marginTop: '0px' }} />
              <div className='InfoCast'>
                <div className='Details'>
                  <p>{ctx.Languages[ctx.Lang].Details}</p>
                  <div>
                    <p style={{ marginBottom: '0px' }}>
                      {ctx.Languages[ctx.Lang].Genre} :<span style={{ lineHeight: '2', wordBreak: 'break-all' }}>{dataMovie.genres.toString()}</span>
                    </p>
                    <p style={{ marginTop: '5px', marginBottom: '0px' }}>
                      {ctx.Languages[ctx.Lang].AvailableIn}: <span style={{ lineHeight: '2' }}>{dataMovie.torrents.map((item) => `${item.quality} ${item.type},`)}</span>
                    </p>
                    <p style={{ marginTop: '5px' }}>
                      {ctx.Languages[ctx.Lang].runtime}: <span>{dataMovie.runtime} Min</span>
                    </p>
                    <p>
                      {ctx.Languages[ctx.Lang].Language}: <span>{dataMovie.language}</span>
                    </p>
                    <p>
                      {ctx.Languages[ctx.Lang].rating}: <span>{dataMovie.rating}</span>
                    </p>
                    <p>
                      {ctx.Languages[ctx.Lang].year}: <span>{dataMovie.year}</span>
                    </p>
                  </div>
                </div>
                <div className='cast'>
                  <p>{ctx.Languages[ctx.Lang].Cast}</p>
                  {dataMovie.cast.map((item, key) => (
                    <div className='CastName' key={key}>
                      {item.url_small_image ? <img src={item.url_small_image} alt='...' /> : <Avatar style={{ backgroundColor: 'rgb(236, 70, 70)' }}>{item.name.substring(0, 2)}</Avatar>}
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='Gallery'>
              <p>{ctx.Languages[ctx.Lang].Gallery}</p>
              {dataMovie.codeTrailer ? <iframe width='100%' height='55%' src={`http://www.youtube-nocookie.com/embed/${dataMovie.codeTrailer}`} frameBorder='0' allowFullScreen></iframe> : ''}
              <div className='ScreenshotImage'>
                {dataMovie.screenshotImage instanceof Array && dataMovie.screenshotImage.map((src, key) => <img src={src} key={key} style={{ width: '33%', objectFit: 'cover', height: '100%', cursor: 'pointer' }} onClick={() => setShowImage({ src: src, state: true })} />)}
              </div>
            </div>
          </div>
          <Divider style={{ backgroundColor: '#ffffffa3' }} />
          <div className='Description'>
            <p>{ctx.Languages[ctx.Lang].Description}</p>
            <p>{dataMovie.description}</p>
          </div>
        </div>
      </div>
      <Dialog onClose={() => setShowImage({ src: '', state: false })} open={showImage.state} className='ShowImage'>
        <img src={showImage.src} alt='...' />
      </Dialog>
    </div>
  );
}
