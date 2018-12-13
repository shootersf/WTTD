import React from 'react';

import HeroInfo from './boardInfoComponents/HeroInfo';
import ItemsInfo from './boardInfoComponents/ItemsInfo';

export default function BoardInfo(props) {
  const {activeCard, activePlayersInRound, dungeon, hero, heroItems, mDeck, playerHealth, playerVictories} = props.G;
  const {currentPlayer} = props.ctx;
  const totalHP = getTotalHP(hero, heroItems);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <HeroInfo name={hero.name} startHP={hero.hp} totalHP={totalHP} />
          <ItemsInfo items={heroItems} />
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  )
}

function getTotalHP(hero, items) {
  let hp = hero.hp;
  const hpItems = items.filter(item => item.type === "Armour");
  //return reduced hpItems with initial value of hp
  return hpItems.reduce( ((acc, cur) => acc + cur.hpBuff), hp);

}