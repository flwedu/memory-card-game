import { GameController } from "./GameController";
import { generateCardsArrayFromArray } from "./util/generate-cards";
import { CardList } from "./components/CardList";

describe("GameController", () => {
  let wrongMovesEl: HTMLElement;
  let cardListEl: HTMLDivElement;
  let cards: ReturnType<typeof generateCardsArrayFromArray>;
  let cardList: CardList;
  let game: GameController;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    wrongMovesEl = document.createElement("div");
    cardListEl = document.createElement("div");
    cards = generateCardsArrayFromArray([1, 1, 2, 2]);
    cardList = new CardList(cardListEl, cards);
    game = new GameController(cardList, cards, wrongMovesEl);
  });

  test("add1WrongMove() updates DOM with incremented count", () => {
    game.add1WrongMove();
    expect(wrongMovesEl.innerHTML).toContain("Wrong moves: 1");
    game.add1WrongMove();
    expect(wrongMovesEl.innerHTML).toContain("Wrong moves: 2");
  });

  test("gameOver() hides wrongMovesEl immediately", () => {
    game.gameOver();
    expect(wrongMovesEl.style.display).toBe("none");
  });

  test("gameOver() renders game over screen after 1500ms", () => {
    vi.useFakeTimers();
    game.gameOver();
    vi.advanceTimersByTime(1500);
    expect(document.getElementById("app").innerHTML).toContain("Game over!");
    vi.useRealTimers();
  });

  test("gameOver() shows wrong moves count on game over screen", () => {
    vi.useFakeTimers();
    game.add1WrongMove();
    game.add1WrongMove();
    game.gameOver();
    vi.advanceTimersByTime(1500);
    expect(document.getElementById("app").innerHTML).toContain("2");
    vi.useRealTimers();
  });

  test("start() triggers card flip on click", () => {
    document.body.appendChild(cardListEl);
    game.start();

    const cardEl = cards[0].getEl();
    cardEl.click();

    expect(cards[0].isFlipped()).toBe(true);
  });

  test("start() increments wrong moves when non-matching cards are selected", () => {
    document.body.appendChild(cardListEl);
    game.start();

    // cards[0] = value 1, cards[2] = value 2 (no match)
    cards[0].getEl().click();
    cards[2].getEl().click();

    expect(wrongMovesEl.innerHTML).toContain("Wrong moves: 1");
  });
});
