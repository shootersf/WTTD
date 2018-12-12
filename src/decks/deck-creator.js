export default function deckCreator(preDeck) {
  let deck = [];

  for (let card of preDeck) {
    const {qty , ...rest} = card;
    for(let i = 1; i <= qty; i++) {
      deck.push(rest);
    }
  }

  return deck;
}