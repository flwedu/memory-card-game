import Card from "./Card";
import Component from "./Component";

export default class CardList implements Component {
  private selectedCards: Card[] = [];

  constructor(private el: HTMLDivElement, private cards: Card[]) {
    const gameSize = this.cards.length / 2;

    this.el.classList.add(`size-${gameSize}`);
    const cardElements = this.cards.map((card) => card.getEl());
    cardElements.forEach((cardElement) => this.el.appendChild(cardElement));
  }

  addToSelectedCards(card: Card): void {
    if (card.isFlipped() || card.isMatched() || this.checkTwoSelectedCards())
      return;

    card.flip();
    this.selectedCards.push(card);
  }

  checkTwoSelectedCards(): boolean {
    return this.selectedCards.length === 2;
  }

  getUnmatchedCards(): Card[] {
    return this.cards.filter((card) => !card.isMatched());
  }

  getFlippedCards(): Card[] {
    return this.cards.filter((card) => card.isFlipped());
  }

  getEl(): HTMLDivElement {
    return this.el;
  }

  render(): string {
    return this.el.innerHTML;
  }

  checkSelectedCardsMatch(): boolean {
    if (this.checkTwoSelectedCards()) {
      if (this.selectedCards[0].checkMatch(this.selectedCards[1])) {
        this.setMatchedToSelectedCards();
        return true;
      }
      setTimeout(() => this.unFlipSelectedCards(), 1000);
      return false;
    }
    return false;
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
