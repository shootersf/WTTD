import React, { Component } from 'react';

export class WTTDBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startOfTurn : true //used for hot-seat/ pass and play
    }

    console.log(props);
  }

  componentDidUpdate(prevProps, prevState) {
    
  }
  
  render() {
    return (<h1>Welcome to the Dungeon</h1>);
  }
}