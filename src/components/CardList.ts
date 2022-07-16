import Card from "./Card";
import Component from "./Component";

export default class CardList implements Component {
  cards: Card[] = [];
  private el: HTMLDivElement;

  constructor(el: HTMLDivElement, cards: Card[]) {
    this.el = el;
    this.cards = cards;

    this.el.className = "card-list";
    this.el.addEventListener("click", this.handleClick.bind(this));

    const cardElements = this.cards.map((card) => card.getEl());
    cardElements.forEach((cardElement) => this.el.appendChild(cardElement));
  }

  handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains("card")) {
      const cardIndex = Number(target.getAttribute("data-index"));
      this.cards[cardIndex].flip();
    }
  }

  getEl(): HTMLDivElement {
    return this.el;
  }

  render(): string {
    return this.el.innerHTML;
  }
}
