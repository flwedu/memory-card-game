import "./main.scss"
import App from "./app"
import { EventEmitter } from "./EventEmitter";
import Card from "./components/Card";

const numberArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
const app = new App(numberArray);

EventEmitter.on("flip", (card: Card) => {
    app.addCardToFlipped(card);
})

EventEmitter.on("score", () => {
    console.log("point!");
    app.clearFlippedCards();
})

EventEmitter.on("unflip", () => {
    console.log("oh no!");
    setTimeout(() => app.unflipCards(), 1000);
})