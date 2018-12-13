import React from 'react';

export default function StartNewGame(props) {


  return (
    <div className="container text-center pt-5">
      
          <h1 className="mb-4">Welcome To The Dungeon</h1>
          <p className="lead">Start a game already why don't ya?</p>
          <button className="btn btn-primary" onClick={props.gameHasStarted}>START GAME!</button>
    </div>
  )
}
