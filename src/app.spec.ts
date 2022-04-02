import App from "./app"

describe("App class tests", () => {

    beforeEach(() => {
        document.body.innerHTML = ``;
        setup();
    })

    test("checkMatch method should be called only if are two cards in pairCards list", () => {

        const app = new App([1, 1]);
        const spy = jest.spyOn(app, "checkMatch");
        const cards = app.cardList.cards;

        app.addCardToPair(cards[0]);

        expect.assertions(2);
        expect(spy).not.toHaveBeenCalled();

        app.addCardToPair(cards[1]);
        expect(spy).toHaveBeenCalled();
    })
})

function setup() {
    const cardList = document.createElement("div");
    cardList.id = "cardList";
    document.body.appendChild(cardList);
}
