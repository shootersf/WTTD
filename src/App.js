import React, { Component } from 'react';
import { Client } from 'boardgame.io/react';
import { WTTD } from './game';
import { WTTDBoard } from './board';

import './App.css';

const WTTDClient = Client({ 
  game : WTTD,
  board : WTTDBoard,
  numPlayers : 4,
  enhancer: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  //redux tools
});

class App extends Component {
  constructor() {
    super();
    this.state = {started : false};
  }

  gameHasStarted() {
    this.setState({started : true});
  }

  render() {
    return <WTTDClient started={this.state.started} gameHasStarted={this.gameHasStarted.bind(this)} />
  }
}

export default App;
