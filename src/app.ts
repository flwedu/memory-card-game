import Card from "./components/Card";
import CardList from "./components/CardList";

export default class App {

    private flippedCards: Card[];
    public cardList: CardList;

    constructor(private numbersArray: number[]) {
        this.cardList = new CardList(document.getElementById("cardList"), this.numbersArray);
    }

    addCardToFlipped(card: Card) {
        this.flippedCards.push(card);
        this.checkTwoFlippedCards();
    }

    checkMatch(cards: Card[]) {
        return cards.every(card => card.gameValue === this.flippedCards[0].gameValue);
    };

    checkTwoFlippedCards() {
        if (this.flippedCards.length == 2 && !this.checkMatch(this.flippedCards))
            this.unflipCards();
    };
    unflipCards() {
        this.flippedCards.forEach(card => card.unflip());
    };
}