import {
  Route, Routes as Switch,
} from 'react-router-dom';
import React from 'react';
import { Movies } from './pages/movies';
import { Customers } from './pages/customers';
import { Rentals } from './pages/rentals';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" element={<Movies />} />
      <Route exact path="/clientes" element={<Customers />} />
      <Route exact path="/alugueis" element={<Rentals />} />
    </Switch>
  );
}
