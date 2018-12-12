import React, { Component } from 'react';
import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import monstersDeck from './decks/monstersDeck';
import barbarianDeck from './decks/barbarianDeck';

import './App.css';

const WTTD = Game({
  name : "Welcome to the Dungeon",

  setup : (ctx) => ({
    mDeck : monstersDeck,
    heroItems : barbarianDeck,
    hero : {name : "Barbarian", hp : 4},
    dungeon : [],
    activeCard : {},
    playerHealth : Array(ctx.numPlayers).fill(2),
    playerVictories : Array(ctx.numPlayers).fill(0),
    activePlayersInRound : Array.from(new Array(ctx.numPlayers), (x,i) => i), //returns an array numbered from 0 up to player count - 1
  }),

  moves : {
    drawCard(G, ctx) {
      // Test to make sure there is a card to draw and that there is no active card
      if(G.mDeck.length > 0 && Object.keys(G.activeCard).length === 0) {
        // Move the top card into the active card slot
        return {...G, activeCard : G.mDeck[0], mDeck : G.mDeck.slice(1)}

      } else {
        console.log("You done messed up");
      }
    },
    passTurn(G, ctx)  {
      return {...G, activePlayersInRound : G.activePlayersInRound.filter(id => id != ctx.currentPlayer)}
    },
    // Moves active card to the dungeon deck
    addCardToDungeon(G, ctx) {
      // Test for active card
      if(Object.keys(G.activeCard).length > 0) {
        return {...G, dungeon : [G.activeCard, ...G.dungeon], activeCard : {}}
      }
    },
    discardEquipment(G, ctx, itemId) {
      //TODO: check that item is in stack

      //Return stack minus item
      return {...G, heroItems : G.heroItems.filter(item => item.id !== itemId)};
    }
  },

  
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
