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
    type : "Weapon"
  },
  {
    name : "Torch",
    text : "Defeat any monsters of Strength 3 or less",
    type : "Weapon"
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
    type : "Weapon"
  }
];

const BarbarianDeck = addIds(BarbarianPreDeck);

export default BarbarianDeck;