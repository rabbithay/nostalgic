import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

import Routes from './Routes';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes />
    </Router>
  )
}

export default App;
