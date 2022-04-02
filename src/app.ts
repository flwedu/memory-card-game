import Card from "./components/Card";
import CardList from "./components/CardList";
import { EventEmitter } from "./EventEmitter";

export default class App {

    private flippedCards: Card[] = [];
    private pairCards: Card[] = [];
    public cardList: CardList;

    constructor(private numbersArray: number[]) {
        this.cardList = new CardList(document.getElementById("cardList"), this.numbersArray);
    }

    addCardToPair(card: Card) {
        // Check if card is already in list (double click)
        // or already is in flipped cards list
        if (this.pairCards.includes(card) || this.flippedCards.includes(card)) return;

        // Check the list size
        if (this.pairCards.length < 2) {
            this.pairCards.push(card);
            card.flip();
        }
        this.checkFlippedPair();
    }

    checkMatch(cards: Card[]) {
        return cards.every(card => card.gameValue === this.pairCards[0].gameValue);
    };

    checkFlippedPair() {
        if (this.pairCards.length == 2 && this.checkMatch(this.pairCards)) {
            this.flippedCards.push(...this.pairCards);
            return EventEmitter.emit("score", {})
        }
        if (this.pairCards.length == 2) {
            EventEmitter.emit("unflip", {});
        }
    };

    unflipCards() {
        this.pairCards.forEach(card => card.unflip());
        this.clearPairCards();
    };

    clearPairCards() {
        this.pairCards.length = 0;
    }
}