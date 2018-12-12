import { addIds } from './deck-creator';

const BarbarianPreDeck = [
  {
    name : "Healing Potion"
  },
  {
    name : "Vorpal Axe"
  },
  {
    name : "Torch"
  },
  {
    name : "Leather Shield"
  },
  {
    name : "Chainmail"
  },
  {
    name : "War Hammer"
  }
];

const BarbarianDeck = addIds(BarbarianPreDeck);

export default BarbarianDeck;