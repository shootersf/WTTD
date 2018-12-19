import { addIds } from './deck-creator';

const BarbarianPreDeck = [
  {
    name : "Healing Potion",
    text : "When you die, return to life with Starting HP (one time use)",
    type : "Potion"
  },
  {
    name : "Vorpal Axe",
    text : "Defeat any monster (one time use)",
    type : "Weapon",
    singleUse : true,
    canKill : function(monster) {
      return true;
    },
  },
  {
    name : "Torch",
    text : "Defeat any monsters of Strength 3 or less",
    type : "Weapon",
    singleUse : false,
    canKill : function(monster) {
      return (monster.strength <= 3) ? true : false;
    }
  },
  {
    name : "Leather Shield",
    text : "HP +3",
    type : "Armour",
    hpBuff : 3
  },
  {
    name : "Chainmail",
    text : "HP +4",
    type : "Armour",
    hpBuff : 4
  },
  {
    name : "War Hammer",
    text : "Defeat Golems (Strength: 5)",
    type : "Weapon",
    singleUse : false,
    canKill : function(monster) {
      return (monster.name === 'Golem') ? true : false;
    }
  }
];

const BarbarianDeck = addIds(BarbarianPreDeck);

export default BarbarianDeck;