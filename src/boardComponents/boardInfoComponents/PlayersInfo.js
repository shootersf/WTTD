import React from 'react';

export default function PlayersInfo(props) {
  const {currentPlayer, activePlayers, playerHealth, playerVictories} = props;

  const playerStats = [];
  for (let i = 0; i < playerHealth.length; i++) {
    const playerStat = (
      <li key={i}>
        Player {i}: H:{playerHealth[i]} V:{playerVictories[i]}
      </li>
    );

    playerStats.push(playerStat);
  }

  return (
    <div>
      <div>
        <h4>Current Player: {currentPlayer}</h4>
      </div>
      <div>
        <h4>Players Left in Round: </h4>
        <ul className="list-unstyled ml-3">
          {activePlayers.map(player => <li key={player} >{player}</li>)}
        </ul>
      </div>
      <div>
        <h4>Player Stats: </h4>
        <ul className="list-unstyled ml-3">
          {playerStats}
        </ul>
      </div>
    </div>
  )
}
