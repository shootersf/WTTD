import { addIds, expandMultiples } from './deck-creator';

const MonstersPreDeck = [
  {
    name : "Goblin",
    strength : 1,
    qty : 2
  },
  {
    name : "Skeleton",
    strength : 2,
    qty : 2
  },
  {
    name : "Orc",
    strength : 3,
    qty : 2
  },
  {
    name : "Vampire",
    strength : 4,
    qty : 2
  },
  {
    name : "Golem",
    strength : 5,
    qty : 2
  },
  {
    name : "Lich",
    strength : 6,
    qty : 1
  },
  {
    name : "Demon",
    strength : 7,
    qty : 1
  },
  {
    name : "Dragon",
    strength : 9,
    qty : 1
  }
];

const MonstersDeck = addIds(expandMultiples(MonstersPreDeck));

export default MonstersDeck;