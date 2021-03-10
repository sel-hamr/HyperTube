import React from 'react';
import Search from './Search';
import FindReplaceIcon from '@material-ui/icons/FilterList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { DataContext } from '../Context/AppContext';
import '../Css/SortAndFilter.css';
export default function SortAndFilter() {
  const ctx = React.useContext(DataContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filter, setFilter] = React.useState(ctx.cache.filter);
  const ArrayYears = () => {
    const listYears = [];
    for (let i = 1; i <= 61; i++) listYears.push(i + 1959);
    return listYears;
  };
  const listFilter = {
    genre: [
      'All',
      'Action',
      'Adventure',
      'Animation',
      'Biography',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Family',
      'Fantasy',
      'Film-Noir',
      'Game-Show',
      'History',
      'Horror',
      'Music',
      'Musical',
      'Mystery',
      'News',
      'Reality-TV',
      'Romance',
      'Sci-Fi',
      'Sport',
      'Talk-Show',
      'Thriller',
      'War',
      'Western',
    ],
    rating: [0, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    sort: ['year', 'rating', 'title'],
    order: ['desc', 'asc'],
    years: ArrayYears(),
  };
//   sort
// order
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectFilter = (type, value) => {
    if (type === 'years') ctx.cache.filter = { ...ctx.cache.filter, years: value };
    if (type === 'genre') ctx.cache.filter = { ...ctx.cache.filter, genre: value };
    if (type === 'rating') ctx.cache.filter = { ...ctx.cache.filter, rating: value };
    if (type === 'order') ctx.cache.filter = { ...ctx.cache.filter, order: value };
    if (type === 'sort') ctx.cache.filter = { ...ctx.cache.filter, sort: value };
    setFilter(ctx.cache.filter);
    handleClose();
  };
  const search = async () => {
    ctx.cache.listMovies = { list: [], page: 0, next: true, middleware: true };
    if (ctx.ref.setListMovies) ctx.ref.setListMovies(ctx.cache.listMovies);
    ctx.cache.listMovies = await ctx.GetMovies(1, [], filter);
    if (ctx.ref.setListMovies) ctx.ref.setListMovies({ ...ctx.cache.listMovies });
  };
  return (
    <div className='SortAndFilter'>
      <div>
        <Search
          Onchange={(value) => {
            ctx.cache.filter = { ...ctx.cache.filter, title: value };
            setFilter(ctx.cache.filter);
          }}
        />
        <Button
          variant='contained'
          size='large'
          onClick={search}
          startIcon={<FindReplaceIcon style={{ fontSize: '25px' }} />}
          style={{
            backgroundColor: '#ec4646',
            color: 'white',
            textTransform: 'none',
            width: '13%',
            minWidth: '100px',
            fontSize: '18px',
            height: '45px',
          }}>
          {ctx.Languages[ctx.Lang].Search}
        </Button>
      </div>
      <div>
        <div className='q'>
          <p>{ctx.Languages[ctx.Lang].Genre}</p>
          <div onClick={handleClick} data-filter='genre'>
            <p>{filter.genre !== '' ? ctx.Languages[ctx.Lang][filter.genre] : ctx.Languages[ctx.Lang].All}</p>
            <ExpandMoreIcon />
          </div>
        </div>
        <div className='q'>
          <p>{ctx.Languages[ctx.Lang].Rating}</p>
          <div onClick={handleClick} data-filter='rating'>
            <p>{filter.rating !== 0 ? `+ ${filter.rating}` : ctx.Languages[ctx.Lang].All}</p>
            <ExpandMoreIcon />
          </div>
        </div>
        <div className='q'>
          <p>Sort By</p>
          <div onClick={handleClick} data-filter='sort'>
            <p>{filter.sort !== '' ? ctx.Languages[ctx.Lang][filter.sort] : ctx.Languages[ctx.Lang].All}</p>
            <ExpandMoreIcon />
          </div>
        </div>
        <div className='q'>
          <p>Order By</p>
          <div onClick={handleClick} data-filter='order'>
            <p>{filter.order !== '' ? filter.order : 'All'}</p>
            <ExpandMoreIcon />
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: '460px',
            width: '160px',
          },
        }}>
        {anchorEl
          ? listFilter[anchorEl.getAttribute('data-filter')].map((item, key) => (
              <MenuItem onClick={() => selectFilter(anchorEl.getAttribute('data-filter'), item)} key={key}>
                {anchorEl.getAttribute('data-filter') === 'rating' ? `+ ${item}` : ctx.Languages[ctx.Lang][item]}
              </MenuItem>
            ))
          : ''}
      </Menu>
    </div>
  );
}
