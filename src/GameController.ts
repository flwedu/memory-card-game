import Card from "./components/Card";
import CardList from "./components/CardList";

export default class GameController {
  constructor(private cardList: CardList, private cardsArr: Card[]) {}

  start() {
    const cardListEl = this.cardList.getEl();
    cardListEl.addEventListener("click", (e) => {
      // Check if already has two selected cards
      if (this.cardList.checkTwoSelectedCards()) {
        return;
      }

      let el = e.target as HTMLElement;
      if (el.tagName === "IMG") {
        el = el.closest(".card");
      }
      if (el.classList.contains("card")) {
        const cardIndex = Number(el.getAttribute("data-index"));
        const card = this.cardsArr[cardIndex];

        this.cardList.addToSelectedCards(card);

        if (this.cardList.checkTwoSelectedCards()) {
          const match = this.cardList.checkSelectedCardsMatch();

          console.log(match);
        }
      }
    });
  }
}
