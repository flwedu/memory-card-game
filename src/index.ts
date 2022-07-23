import $ from "jquery";
import Card from "./components/Card";
import CardList from "./components/CardList";
import "./styles/index.scss";
import { generateCardsArrayWithDoubleLength } from "./util/generate-cards";

// DOM ready
$(function () {
  loadForm();

  const settingsForm: JQuery<HTMLFormElement> = $("#game-settings form");
  settingsForm.on("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(settingsForm[0]);

    const gameSize = Number(formData.get("size"));
    startGame(gameSize);
  });
});

function loadForm() {
  $("#game-settings").show();
  $("#score").hide();
  $("#card-list").hide();
}

function startGame(gameSize: number) {
  const cardListEl: JQuery<HTMLDivElement> = $("#card-list");
  $("#score").show();
  $("#game-settings").hide();

  const cards = generateCardsArrayWithDoubleLength(gameSize);
  const cardList = new CardList(cardListEl.get(0), cards);
  cardList.render();

  cardListEl.show();
  listenClickOnCardList(cardList, cards);
}

function listenClickOnCardList(cardList: CardList, cardsArr: Card[]) {
  const cardListEl = cardList.getEl();
  cardListEl.addEventListener("click", (e) => {
    let el = e.target as HTMLElement;
    if (el.tagName === "IMG") {
      el = el.closest(".card");
    }
    if (el.classList.contains("card")) {
      const cardIndex = Number(el.getAttribute("data-index"));
      const card = cardsArr[cardIndex];

      cardList.addToSelectedCards(card);

      if (cardList.checkTwoSelectedCards()) {
        const match = cardList.checkSelectedCardsMatch();

        console.log(match);
      }
    }
  });
}
