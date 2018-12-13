import React from 'react';

export default function StartNewTurn(props) {
  return (
    <div className="container text-center pt-5">
      
          <h2 className="mb-4">Ready when you are Player {parseInt(props.currentPlayer) + 1}</h2>
          
          <button className="btn btn-primary" onClick={props.newTurnStarted}>START TURN!</button>
    </div>
  )
}
