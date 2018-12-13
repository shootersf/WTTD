import React from 'react';
import Card from './Card';

export default function CardsInfo(props) {
  const { activeCard, dungeon, mDeck } = props;
  return (
    <div className="row">
      <div className="col-sm-4">
        <h4>Active Card: </h4>
        {(Object.keys(activeCard).length > 0) ? <Card card={activeCard}/> : <p>None</p>}
      </div>
      <div className="col-sm-4">
        <h4>Cards Left in Deck: </h4>
        {mDeck.length}
      </div>
      <div className="col-sm-4">
        <h4>Cards in Dungeon: </h4>
        {dungeon.length}
      </div>
    </div>
  )
}
