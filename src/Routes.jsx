import {
  Route, Routes as Switch,
} from 'react-router-dom';
import React from 'react';
import { HomePage } from './pages/homepage';
import { Movies } from './pages/movies';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/filmes" element={<Movies />} />
      <Route exact path="/clientes" element={<Movies />} />
      <Route exact path="/alugueis" element={<Movies />} />
    </Switch>
  );
}
