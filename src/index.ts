import "./main.scss"
import App from "./app"
import { EventEmitter } from "./EventEmitter";
import Card from "./components/Card";

const numberArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
const app = new App(numberArray);
const attemptEl = document.querySelector<HTMLSpanElement>("#attempts");

EventEmitter.on("flip", (card: Card) => {
    app.addCardToPair(card);
});

EventEmitter.on("fail", (value: number) => {
    attemptEl.textContent = String(value);
})