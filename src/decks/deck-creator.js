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

export function addIds(preDeck) {
  let id = 0;
  let deck = [];
  for(let card of preDeck) {
    deck.push({...card, id : id++});
  }

  return deck;
}