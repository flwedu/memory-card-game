import Card from "./components/Card";
import CardList from "./components/CardList";
import { EventEmitter } from "./EventEmitter";

export default class App {

    private flippedCards: Card[] = [];
    public cardList: CardList;

    constructor(private numbersArray: number[]) {
        this.cardList = new CardList(document.getElementById("cardList"), this.numbersArray);
    }

    addCardToFlipped(card: Card) {
        // Check if card is already in list (double click)
        if (this.flippedCards.includes(card)) return;

        // Check the list size
        if (this.flippedCards.length < 2) {
            this.flippedCards.push(card);
            card.flip();
        }
        this.checkTwoFlippedCards();
    }

    checkMatch(cards: Card[]) {
        return cards.every(card => card.gameValue === this.flippedCards[0].gameValue);
    };

    checkTwoFlippedCards() {
        if (this.flippedCards.length == 2 && this.checkMatch(this.flippedCards)) {
            return EventEmitter.emit("score", {})
        }
        if (this.flippedCards.length == 2) {
            EventEmitter.emit("unflip", {});
        }
    };

    unflipCards() {
        this.flippedCards.forEach(card => card.unflip());
        this.clearFlippedCards();
    };

    clearFlippedCards() {
        this.flippedCards.length = 0;
    }
}