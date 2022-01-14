import {
    Route, Routes as Switch,
  } from 'react-router-dom';
  import React from 'react';
import { HomePage } from './pages/homepage/HomePage';
import { Movies } from './pages/movies/Movies';

  
  export default function Routes() {
    return (
      <Switch>
        <Route exact path="/" element={<HomePage />} />       
        <Route exact path="/movies" element={<Movies />} />
      </Switch>
    );
  }
  