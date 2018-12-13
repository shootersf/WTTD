import React, { Component } from 'react';

import StartNewGame from './boardComponents/StartNewGame';
import StartNewTurn from './boardComponents/StartNewTurn';

export class WTTDBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startOfTurn : true //used for hot-seat/ pass and play
    }

    console.log(props);
  }

  componentDidUpdate(prevProps, prevState) {
    //TODO: check if game has just started or if player has changed to set startOfTurn
  }

  newTurnStarted() {
    this.setState({startOfTurn : false})
  }
  
  render() {
    let output;

    if (!this.props.started) {
      // set screen to show start game screen
      output = (<StartNewGame gameHasStarted={this.props.gameHasStarted}/>);
    }
    // If new turn show button to start players turn
    else if (this.state.startOfTurn) {
      output = (<StartNewTurn currentPlayer={this.props.ctx.currentPlayer} newTurnStarted={this.newTurnStarted.bind(this)} />);
    }

    return (
      // Due to debugger temp put everything to the left
      <div className="container">
        <div className="row">
          <div className="col-8">
            {output}
          </div>
        </div>
      </div>

    //<StartNewGame/>
    );
  }
}