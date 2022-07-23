import Card from "./Card";

describe("Card component tests", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test.each([1, 2, 3])(
    "Should create a card with correct attributes",
    (value: number) => {
      const card = new Card(value, 0);
      const el = card.getEl();
      document.body.appendChild(el);

      expect(card.getValue()).toEqual(value);
      expect(el).toEqual(document.querySelector(".card"));
      expect(document.querySelector("img").src).toEqual(
        "http://localhost/assets/0.png"
      );
    }
  );

  test("card.flip() should add flipped class to element and change img src", () => {
    const card = new Card(10, 0);
    const el = card.getEl();
    document.body.appendChild(el);
    const img = document.querySelector("img");

    card.flip();

    expect.assertions(2);
    expect(el.classList.contains("flipped")).toBeTruthy();
    expect(img.src).toEqual("http://localhost/assets/10.jpg");
  });

  test("card.unFlip() should remove flipped class of element and change img src", () => {
    const card = new Card(10, 0);
    const el = card.getEl();
    document.body.appendChild(el);
    const img = document.querySelector("img");

    card.flip();
    card.unFlip();

    expect.assertions(2);
    expect(el.classList.contains("flipped")).toBeFalsy();
    expect(img.src).toEqual("http://localhost/assets/0.png");
  });
});
