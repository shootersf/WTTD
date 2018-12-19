import React, { Component } from 'react';

import StartNewGame from './boardComponents/StartNewGame';
import StartNewTurn from './boardComponents/StartNewTurn';
import DungeonPreparer from './boardComponents/DungeonPreparer';
import EnterTheDungeon from './boardComponents/EnterTheDungeon';

export class WTTDBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startOfTurn : true //used for hot-seat/ pass and play
    }

    console.log(props);
  }

  componentDidUpdate(prevProps, prevState) {
    // If start of turn in last state skip
    if (prevState.startOfTurn) {
      return;
    }
    // Otherwise if players have changed set start of turn to true
    else if(prevProps.ctx.currentPlayer !== this.props.ctx.currentPlayer) {
      this.setState({startOfTurn : true});
    }
  }

  newTurnStarted() {
    this.setState({startOfTurn : false});
  }
  
  render() {
    let output;
    const currentPhase = this.props.ctx.phase;

    if (!this.props.started) {
      // set screen to show start game screen
      output = (<StartNewGame gameHasStarted={this.props.gameHasStarted}/>);
    }
    // If new turn show button to start players turn
    else if (this.state.startOfTurn) {
      output = (<StartNewTurn currentPlayer={this.props.ctx.currentPlayer} newTurnStarted={this.newTurnStarted.bind(this)} />);
    }
    // If still in dungeon prep
    else if (currentPhase === 'PD_drawOrPass' || currentPhase === 'PD_placeOrDiscard' || currentPhase === 'PrepareDungeon')
      output = (<DungeonPreparer G={this.props.G} ctx={this.props.ctx} moves={this.props.moves} events={this.props.events} />)
    // If in dungeon
    else if (currentPhase === 'DungeonRound' || currentPhase === 'DungeonHeroDead' || currentPhase === 'DungeonCleared')
    output = (<EnterTheDungeon G={this.props.G} ctx={this.props.ctx} moves={this.props.moves} events={this.props.events} />)
    return (
      // Due to debugger temp put everything to the left
      <div className="container">
        <div className="row">
          <div className="debugger col-10">
            {output}
          </div>
        </div>
      </div>
    );
  }
}