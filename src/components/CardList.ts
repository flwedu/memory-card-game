import Card from "./Card";
import Component from "./Component";

export default class CardList implements Component {

    cards: Card[] = [];

    constructor(private el: HTMLElement, private numberArray: number[]) {
        numberArray.forEach(
            value => this.addCard(value)
        )
    }

    addCard(value: number) {
        // Creating entity
        const card = new Card(value);
        this.cards.push(card);
        // Creating child node
        this.el.appendChild(card.getHtmlElement());
    }

    render(): void {
    }

}