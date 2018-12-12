import React, { Component } from 'react';
import { Client } from 'boardgame.io/react';
import { WTTD } from './game';
import { WTTDBoard } from './board';

import './App.css';

const App = Client({ 
    game : WTTD,
    board : WTTDBoard,
    numPlayers : 4,
    enhancer: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  //redux tools
  });

export default App;
