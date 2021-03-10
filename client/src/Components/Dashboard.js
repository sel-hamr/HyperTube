import React from 'react';
import Slider from './Slider';
import '../Css/Dashboard.css';
import ListMovies from './ListMovies';
import SortAndFilter from './SortAndFilter';
import { Switch, Route } from 'react-router-dom';
import { MovieDetail } from './MovieDetail';
import { FavoriteMovie } from './FavoriteMovie';
import { Profile } from './Profile';

export default function Dashboard() {
  console.log('Dashboard');
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Slider />
          <SortAndFilter />
          <ListMovies />
        </Route>
        <Route exact path='/movie/:code'>
          <MovieDetail />
        </Route>
        <Route exact path='/FavoriteMovie'>
          <FavoriteMovie />
        </Route>
        <Route exact path='/Profile'>
          <Profile />
        </Route>
      </Switch>
    </>
  );
}
