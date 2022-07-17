import Card from "./Card";
import Component from "./Component";

export default class CardList implements Component {
  cards: Card[] = [];
  private selectedCards: Card[] = [];
  private el: HTMLDivElement;

  constructor(el: HTMLDivElement, cards: Card[]) {
    this.el = el;
    this.cards = cards;

    const gameSize = (this.cards.length / 2) as number;

    this.el.classList.add(`size-${gameSize}`);
    this.el.addEventListener("click", this.handleClick.bind(this));

    const cardElements = this.cards.map((card) => card.getEl());
    cardElements.forEach((cardElement) => this.el.appendChild(cardElement));
  }

  handleClick(event: MouseEvent): void {
    let el = event.target as HTMLElement;

    // Check click on a img
    if (el.tagName === "IMG") {
      el = el.closest(".card");
    }
    if (el.classList.contains("card")) {
      const cardIndex = Number(el.getAttribute("data-index"));
      const card = this.cards[cardIndex];
      card.flip();
      if (this.selectedCards.length < 2) {
        this.selectedCards.push(card);
      }
    }

  getEl(): HTMLDivElement {
    return this.el;
  }

  render(): string {
    return this.el.innerHTML;
  }
}
