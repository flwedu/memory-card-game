import Card from "../components/Card";
import { shuffleArray } from "./shuffle-array";

export function generateCards(cardNumber: number) {
  const numberArray: number[] = [];

  for (let i = 0; i < cardNumber; i++) {
    numberArray.push(i);
    numberArray.push(i);
  }

  const shuffledArray = shuffleArray(numberArray);

  const cards = shuffledArray.map((value, index) => {
    return new Card(value, index);
  });

  return cards;
}
