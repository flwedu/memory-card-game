import CardList from "./CardList";

describe("CardList class tests", () => {

    test("Should create a card for each children and the children receives a value of numberArray", () => {

        document.body.innerHTML = `<div id="cardList"></div>`
        const numberArray = [1, 2];
        const cardList = new CardList(numberArray);

        expect.assertions(3);
        expect(cardList.cards.length).toEqual(2);
        expect(cardList.cards.at(0).gameValue).toEqual(1);
        expect(cardList.cards.at(1).gameValue).toEqual(2);
    })


})