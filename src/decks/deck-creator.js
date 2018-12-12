// Takes in a deck of cards with multiples and makes copies discarding the "qty" attribute
export function expandMultiples(preDeck) {
  let deck = [];

  for (let card of preDeck) {
    const {qty, ...contents} = card;

    for(let i = 1; i <= qty; i++) {
      deck.push(contents);
    }
  }

  return deck;
}

// Adds an id to each card in a deck starting at 0
export function addIds(preDeck) {
  let id = 0;
  let deck = [];
  for(let card of preDeck) {
    deck.push({...card, id : id++});
  }

  return deck;
}