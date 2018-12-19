import React from 'react';
import HeroInfo from './dungeonBoardInfoComponents/HeroInfo';
import Card from './boardInfoComponents/Card';
import ItemsInfo from './dungeonBoardInfoComponents/ItemsInfo';

export default function DungeonBoardInfo(props) {
  return (
    <div className="container">
      <HeroInfo name={props.G.hero.name} baseHP={props.G.hero.hp} currentHP={props.G.dungeonStats.currentHP} />
      <ItemsInfo items={props.G.heroItems} />
      <div className="row">
        <div className="col-sm-4">
          <h4>Current Monster :</h4>
          {/* Show Monster Card if active card exists */}
          { (Object.keys(props.G.activeCard).length > 0) ? (<Card card={props.G.activeCard} />) : (<p>None</p>) }
        </div>
        <div className="col-sm-8">
          <h4>Monsters Left in Dungeon Deck: {props.G.dungeon.length}</h4>
        </div>
      </div>
    </div>
  )
}
