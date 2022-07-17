import Card from "./Card";
import Component from "./Component";

export default class CardList implements Component {
  private selectedCards: Card[] = [];

  constructor(private el: HTMLDivElement, private cards: Card[]) {
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
  }

  getSelectedCards(): Card[] {
    return this.selectedCards;
  }

  getUnmatchedCards(): Card[] {
    return this.cards.filter((card) => !card.isMatched());
  }

  getFlippedCards(): Card[] {
    return this.cards.filter((card) => card.flipped);
  }

  getEl(): HTMLDivElement {
    return this.el;
  }

  render(): string {
    return this.el.innerHTML;
  }

  checkSelectedCardsMatch(): boolean {
    if (this.checkBothSelectedValuesIsEquals()) {
      this.setMatchedToSelectedCards();
      return true;
    }
    this.unFlipSelectedCards();
    return false;
  }

  private checkBothSelectedValuesIsEquals(): boolean {
    return (
      this.selectedCards[0].getValue() === this.selectedCards[1].getValue()
    );
  }

  private unFlipSelectedCards(): void {
    this.selectedCards.forEach((card) => card.unFlip());
    this.selectedCards = [];
  }

  private setMatchedToSelectedCards(): void {
    this.selectedCards.forEach((card) => card.setMatched());
    this.selectedCards = [];
  }
}
