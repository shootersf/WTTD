import React, { Component } from 'react'

import BoardInfo from './BoardInfo';

export default class DungeonPreparer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectingDiscard : false,
      discardIdSeclected : null
    };
  }

  setItemDiscardId(id) {
    this.setState({discardIdSeclected : id});
  }

  createPlayerOptions() {

  }

  render() {
    return (
      <div>
        <BoardInfo G={this.props.G} selectingDiscard={this.state.selectingDiscard} setItemDiscardId={this.setItemDiscardId.bind(this)} />
      </div>
    )
  }
}
