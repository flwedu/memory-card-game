import Card from "./Card";
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

  test("unFlipSelectedCards() should unFlip the selected cards", () => {
    const div = document.createElement("div");
    const cards = numberArr.map((value, index) => new Card(value, index));
    const cardList = new CardList(div, cards);
    const firstCard = cards[0];
    const secondCard = cards[1];

    const firstCardEl = firstCard.getEl();
    const secondCardEl = secondCard.getEl();

    firstCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    secondCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    cardList.unFlipSelectedCards();

    expect(firstCard.flipped).toBe(false);
    expect(secondCard.flipped).toBe(false);
    expect(cardList.getSelectedCards()).toEqual([]);
  });

  test("setMatchedToSelectedCards() should set the matched cards", () => {
    const div = document.createElement("div");
    const cards = numberArr.map((value, index) => new Card(value, index));
    const cardList = new CardList(div, cards);
    const firstCard = cards[0];
    const secondCard = cards[1];

    const firstCardEl = firstCard.getEl();
    const secondCardEl = secondCard.getEl();

    firstCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    secondCardEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    cardList.setMatchedToSelectedCards();

    expect(firstCard.isMatched()).toBe(true);
    expect(secondCard.isMatched()).toBe(true);
  });
});
