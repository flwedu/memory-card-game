import Card from "./Card";

describe("Card component tests", () => {

    beforeEach(() => {
        document.body.innerHTML = "";
    })

    test.each([1, 2, 3])("Should create a card with correct values", (value: number) => {

        const card = new Card(value);
        const el = card.getHtmlElement();
        document.body.appendChild(el);

        expect(card.gameValue).toEqual(value);
        expect(el).toEqual(document.querySelector(".card"));
        expect(document.querySelector("img").src).toEqual("http://localhost/assets/0.png")

    })

    test("Flip method should add flipped class to element and change img src", () => {

        const card = new Card(10);
        const el = card.getHtmlElement();
        document.body.appendChild(el);
        const img = document.querySelector("img");

        card.flip();

        expect.assertions(2);
        expect(el.classList.contains("flipped")).toBeTruthy();
        expect(img.src).toEqual("http://localhost/assets/10.jpg");
    })

    test("Unflip method should remove flipped class of element and change img src", () => {

        const card = new Card(10);
        const el = card.getHtmlElement();
        document.body.appendChild(el);
        const img = document.querySelector("img");

        card.flip();
        card.unflip();

        expect.assertions(2);
        expect(el.classList.contains("flipped")).toBeFalsy();
        expect(img.src).toEqual("http://localhost/assets/0.png");
    })
})
