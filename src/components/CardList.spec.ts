import CardList from "./CardList";

describe("CardList class tests", () => {

    test("Should create a card for each children and the children receives a value of numberArray", () => {

        const numberArray = [1, 2];
        const el = document.createElement("div");
        const cardList = new CardList(el, numberArray);

        expect.assertions(3);
        expect(cardList.cards.length).toEqual(2);
        expect(cardList.cards.at(0).gameValue).toEqual(1);
        expect(cardList.cards.at(1).gameValue).toEqual(2);
    })


})