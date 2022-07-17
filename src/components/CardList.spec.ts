import { generateCardsArrayFromArray } from "../util/generate-cards";
import CardList from "./CardList";

describe("CardList class tests", () => {
  const numberArr = [1, 1, 2, 2];
  test("render() should return the correct html to div element", () => {
    const div = document.createElement("div");
    const cards = generateCardsArrayFromArray(numberArr);
    const cardList = new CardList(div, cards);

    expect(div.innerHTML).toMatchSnapshot();
    expect(cardList.render()).toEqual(div.innerHTML);
  });

  test("handleClick() should call the flip() method of the card", () => {
    const div = document.createElement("div");
    const cards = generateCardsArrayFromArray(numberArr);
    const cardList = new CardList(div, cards);
    const firstCard = cards[0];
    const spy = jest.spyOn(firstCard, "flip");

    const firstCardEl = firstCard.getEl();
    firstCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(spy).toHaveBeenCalled();
    expect(firstCard.flipped).toBe(true);
  });

  test("getSelectedCards() should return the selected cards", () => {
    const div = document.createElement("div");
    const cards = generateCardsArrayFromArray(numberArr);
    const cardList = new CardList(div, cards);
    const firstCard = cards[0];
    const secondCard = cards[1];

    const firstCardEl = firstCard.getEl();
    const secondCardEl = secondCard.getEl();

    expect(cardList.getSelectedCards()).toEqual([]);

    firstCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    secondCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(cardList.getSelectedCards()).toEqual([firstCard, secondCard]);
  });

  describe("checkSelectedCardsMatch()", () => {
    test("should return true if the selected cards match, and getFlippedCards() should return 2 cards", () => {
      const numberArr = [1, 1];
      const div = document.createElement("div");
      const cards = generateCardsArrayFromArray(numberArr);
      const cardList = new CardList(div, cards);
      const firstCard = cards[0];
      const secondCard = cards[1];

      const firstCardEl = firstCard.getEl();
      const secondCardEl = secondCard.getEl();

      firstCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      secondCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(cardList.checkSelectedCardsMatch()).toBe(true);
      expect(cardList.getFlippedCards().length).toBe(2);
      expect(cardList.getUnmatchedCards().length).toBe(0);
    });

    test("should return false if the selected cards don't match, and getFlippedCards() should return 0 cards", () => {
      const numberArr = [1, 2];
      const div = document.createElement("div");
      const cards = generateCardsArrayFromArray(numberArr);
      const cardList = new CardList(div, cards);
      const firstCard = cards[0];
      const secondCard = cards[1];

      const firstCardEl = firstCard.getEl();
      const secondCardEl = secondCard.getEl();

      firstCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      secondCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(cardList.checkSelectedCardsMatch()).toBe(false);
      expect(cardList.getFlippedCards().length).toBe(0);
      expect(cardList.getUnmatchedCards().length).toBe(2);
    });
  });
});
