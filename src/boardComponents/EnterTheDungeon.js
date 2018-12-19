import React, { Component } from 'react';
import DungeonBoardInfo from './DungeonBoardInfo';

export default class EnterTheDungeon extends Component {

  killMonster(weaponID) {
    this.props.moves.killMonster(weaponID);
  }

  createPlayerOptions() {
    const { phase } = this.props.ctx;
    let options;

    if (phase === 'DungeonRound') {
      // Get non single use weapons that work
      const multiuseWeapons = this.props.G.heroItems
        .filter(item => item.type === 'Weapon')
        .filter(weapon => !weapon.singleUse)
        .filter(weapon => weapon.canKill(this.props.G.activeCard));

        if (multiuseWeapons.length > 0) {
          options = (
            <div>
              {multiuseWeapons.map(weapon => (<button key={weapon.id} onClick={this.killMonster.bind(this, weapon.id)} >Kill with {weapon.name}</button>) )}
            </div>
          );
        }
        else {
          const singleUseWeapons = this.props.G.heroItems
          .filter(item => item.type === 'Weapon')
          .filter(weapon => weapon.singleUse)
          .filter(weapon => weapon.canKill(this.props.G.activeCard));

          options = (
            <div>
              {singleUseWeapons.map(weapon => (<button key={weapon.id} onClick={this.killMonster.bind(this, weapon.id)} >Kill with {weapon.name}</button>) )}
              <button onClick={this.killMonster.bind(this, null)} >Kill with fists</button>
            </div>
          )
        }
    }
    else if(phase === 'DungeonHeroDead') {
      options = (<h4>You Dead</h4>);
    }
    else if(phase === 'DungeonCleared') {
      options = (<h4>Dungeon Cleared</h4>);
    }

    return options;
  }

  render() {
    const playerOptions = this.createPlayerOptions();
    return (
      <div>
        <DungeonBoardInfo G={this.props.G} ctx={this.props.ctx} />
        {playerOptions}
      </div>
    )
  }
}
