import React, { Component } from 'react'

import BoardInfo from './BoardInfo';

export default class DungeonPreparer extends Component {
  constructor(props) {
    super(props);
    // Keep track of highlighted item when choosing what one to discard
    this.state = {
      selectingDiscard : false,
      discardIdSeclected : null
    };
  }
  // On Clicks
  enterTheDungeon() {
    // If there are cards in Dungeon enter, otherwise go to victory
      if (this.props.G.dungeon.length > 0) {
        this.props.events.endPhase({ next : 'DungeonRound' });
      }
      else {
        //TODO: Victory
      }
  }

  setItemDiscardId(id) {
    this.setState({discardIdSeclected : id});
  }


  // Moves
  drawCard() {
    this.props.moves.drawCard();
  }

  passTurn() {
    this.props.moves.passTurn();
  }

  addToDungeon() {
    this.props.moves.addCardToDungeon();
  }

  startDiscard() {
    this.setState({ selectingDiscard : true });
  }

  finishDiscard() {
    this.props.moves.discardEquipment(this.state.discardIdSeclected);

    this.setState({ selectingDiscard : false, discardIdSeclected : null});
  }

  // Life cycle
  componentDidUpdate(prevProps, prevState) {

    // If player is last active player prompt them to enter the dungeon
    if (this.props.G.activePlayersInRound.length === 1 && this.props.ctx.phase !== 'PrepareDungeon') {
      // Change phase to preparing dungeon
      this.props.events.endPhase({next : 'PrepareDungeon'});
    }
  }

  // Uses phase, and state to determine what buttons should be available
  createPlayerOptions() {
    const { phase } = this.props.ctx;
    const { mDeck } = this.props.G; // cannot draw card if none available
    let options;
    
    // If draw phase
    if (phase === 'PD_drawOrPass') {
      options = (
        <div className="row">
          <div className="col-sm-6 text-right">
            <button className="btn btn-primary" onClick={this.drawCard.bind(this)} disabled={(mDeck.length > 0) ? null : 'disabled'} >Draw Card</button>
          </div>
          <div className="col-sm-6">
            <button className="btn btn-primary" onClick={this.passTurn.bind(this)} >Pass Turn</button>
          </div>
        </div>
      )
    }
    // If add or discard phase
    // If discard selected
    else if (phase === 'PD_placeOrDiscard' && this.state.selectingDiscard) {
      options = (
        <div className="row">
          <div className="col-sm-6 text-right">
            Highlight Equipment to discard
          </div>
          <div className="col-sm-6">
            <button className="btn btn-primary" onClick={this.finishDiscard.bind(this)} disabled={(this.state.discardIdSeclected) ? null : 'disabled'} >Discard Item</button>
          </div>
        </div>
      );
    }
    else if (phase === 'PD_placeOrDiscard') {
      options = (
        <div className="row">
          <div className="col-sm-6 text-right">
            <button className="btn btn-primary" onClick={this.addToDungeon.bind(this)}>Add Card To Dungeon</button>
          </div>
          <div className="col-sm-6">
            {/* Only allow discard item if Hero still has some items */}
            <button className="btn btn-primary" onClick={this.startDiscard.bind(this)} disabled={(this.props.G.heroItems.length > 0) ? null : 'disabled'} >Discard Item</button>
          </div>
        </div>
      );
    }
    // If preparing dungeon 
    else if (phase === 'PrepareDungeon') {
      options = (
        <div className="row">
          <div className="col-sm-12 text-center">
            <button className="btn btn-danger" onClick={this.enterTheDungeon.bind(this)} >ENTER THE DUNGEON</button>
          </div>
        </div>
      );
    }

    return options;
  }

  render() {
    const playerOptions = this.createPlayerOptions();
    return (
      <div>
        <BoardInfo 
          G={this.props.G} 
          selectingDiscard={this.state.selectingDiscard}
          ctx={this.props.ctx} 
          setItemDiscardId={this.setItemDiscardId.bind(this)}
          discardIdSeclected={this.state.discardIdSeclected}
        />
        {playerOptions}
      </div>

    )
  }
}
