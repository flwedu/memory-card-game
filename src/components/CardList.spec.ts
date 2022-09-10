import { generateCardsArrayFromArray } from '../util/generate-cards';
import { CardList } from './CardList';

describe('CardList class tests', () => {
  const numberArr = [1, 1, 2, 2];
  test('render() should return the correct html to div element', () => {
    const div = document.createElement('div');
    const cards = generateCardsArrayFromArray(numberArr);
    const cardList = new CardList(div, cards);

    expect(div.innerHTML).toMatchSnapshot();
    expect(cardList.render()).toEqual(div.innerHTML);
  });

  test("should return false if the selected cards don't match, and getFlippedCards() should return 0 cards", () => {
    const numberArr = [1, 2];
    const div = document.createElement('div');
    const cards = generateCardsArrayFromArray(numberArr);
    const cardList = new CardList(div, cards);
    const firstCard = cards[0];
    const secondCard = cards[1];

    cardList.addToSelectedCards(firstCard);
    cardList.addToSelectedCards(secondCard);

    expect(cardList.checkSelectedCardsMatch()).toBe(false);
    setTimeout(() => {
      expect(cardList.getFlippedCards().length).toBe(0);
    }, 1100);

    expect(cardList.getUnmatchedCards().length).toBe(2);
  });

  test('should return true if the selected cards match, and getFlippedCards() should return 2 cards', () => {
    const numberArr = [1, 1];
    const div = document.createElement('div');
    const cards = generateCardsArrayFromArray(numberArr);
    const cardList = new CardList(div, cards);
    const firstCard = cards[0];
    const secondCard = cards[1];

    cardList.addToSelectedCards(firstCard);
    cardList.addToSelectedCards(secondCard);

    expect(cardList.checkSelectedCardsMatch()).toBe(true);
    expect(cardList.getFlippedCards().length).toBe(2);
    expect(cardList.getUnmatchedCards().length).toBe(0);
  });
});
