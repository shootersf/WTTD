import React, { Component } from 'react';
import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import monsters from './pre-decks/monsters';
import deckCreator from './decks/deck-creator';
import barbarianDeck from './decks/barbarianDeck';

import './App.css';

const WTTD = Game({
  setup : () => ({
    mDeck : deckCreator(monsters),
    heroItems : barbarianDeck
  })
});

// class App extends Component {
//   render() {
//     let monsterDeck = deckCreator(monsters);
//     console.log(monsterDeck);
//     return (
//       <h1>Welcome to the Dungeon</h1>
//     );
//   }
// }

const App = Client({ game: WTTD, numPlayers : 4 });

export default App;
