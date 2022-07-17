import Card from "../components/Card";
import { shuffleArray } from "./shuffle-array";

export function generateCardsArrayWithDoubleLength(length: number) {
  const numberArray: number[] = [];

  for (let i = 0; i < length; i++) {
    numberArray.push(i + 1);
    numberArray.push(i + 1);
  }

  const shuffledArray = shuffleArray(numberArray);

  const cards = generateCardsArrayFromArray(shuffledArray);

  return cards;
}

export function generateCardsArrayFromArray(array: number[]) {
  const cards = array.map((value, index) => {
    return new Card(value, index);
  });

  return cards;
}
