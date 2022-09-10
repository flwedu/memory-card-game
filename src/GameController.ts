import $ from 'jquery';
import Card from './components/Card';
import CardList from './components/CardList';

export class GameController {
  private wrongMoves = 0;

  constructor(
    private cardList: CardList,
    private cardsArr: Card[],
    private wrongMovesEl: JQuery<HTMLParagraphElement>
  ) {}

  add1WrongMove() {
    this.wrongMoves++;
    this.wrongMovesEl.html(`<p>Wrong moves: ${this.wrongMoves}</p>`);
  }

  start() {
    const cardListEl = this.cardList.getEl();

    // Listen to clicks on cardList HTML Element
    cardListEl.addEventListener('click', (e) => {
      // Check if already has two selected cards
      if (this.cardList.checkTwoSelectedCards()) {
        return;
      }

      let el = e.target as HTMLElement;
      if (el.tagName === 'IMG') {
        el = el.closest('.card');
      }
      if (el.classList.contains('card')) {
        const cardIndex = Number(el.getAttribute('data-index'));
        const card = this.cardsArr[cardIndex];

        this.cardList.addToSelectedCards(card);

        if (this.cardList.checkTwoSelectedCards()) {
          const match = this.cardList.checkSelectedCardsMatch();

          if (!match) {
            this.add1WrongMove();
          }

          if (this.cardList.getUnmatchedCards().length === 0) {
            this.gameOver();
          }
        }
      }
    });
  }

  gameOver() {
    this.wrongMovesEl.hide();

    setTimeout(() => {
      $('#app').html(`<h1>Game over!</h1>
      <div class="flex flex-center flex-col">
      <p>Your number of wrong moves was: ${this.wrongMoves}</p>
      <button id="restart" onClick="history.go(0);">Restart</button>
      </div>
      `);
    }, 1500);
  }
}
