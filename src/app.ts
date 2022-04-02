import Card from "./components/Card";
import CardList from "./components/CardList";
import { EventEmitter } from "./EventEmitter";
import { shuffle } from "./util/shuffle-array";

export default class App {

    private attempts = 0;
    private flippedCards: Card[] = [];
    private pairCards: Card[] = [];
    public cardList: CardList;

    constructor(private numbersArray: number[]) {
        this.numbersArray = shuffle(numbersArray);
        this.cardList = new CardList(this.numbersArray);
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
        // Success
        if (this.pairCards.length == 2 && this.checkMatch(this.pairCards)) {
            this.flippedCards.push(...this.pairCards);
            this.clearPairCards();
            return EventEmitter.emit("success", {})
        }
        // Fail
        if (this.pairCards.length == 2) {
            this.addAttempt();
            setTimeout(() => this.unflipCards(), 1000);
            EventEmitter.emit("fail", this.attempts);
        }
    };

    unflipCards() {
        this.pairCards.forEach(card => card.unflip());
        this.clearPairCards();
    };

    clearPairCards() {
        this.pairCards.length = 0;
    }

    addAttempt() {
        this.attempts += 1;
    }
}