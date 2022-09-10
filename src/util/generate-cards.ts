import Card from '../components/Card';
import { shuffleArray } from './shuffle-array';

export function generateCardsArrayWithDoubleLength(length: number) {
  const numberArray: number[] = [];

  for (let i = 0; i < length; i++) {
    numberArray.push(i + 1);
    numberArray.push(i + 1);
  }

  const shuffledArray = shuffleArray(numberArray);

  return generateCardsArrayFromArray(shuffledArray);
}

export function generateCardsArrayFromArray(array: number[]) {
  return array.map((value, index) => {
    return new Card(value, index);
  });
}
