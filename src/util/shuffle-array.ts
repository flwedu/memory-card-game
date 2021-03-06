export function shuffleArray(array: number[]) {
  let lastIndex = array.length,
    randomIndex;

  while (lastIndex != 0) {
    randomIndex = Math.floor(Math.random() * lastIndex);
    lastIndex--;

    [array[lastIndex], array[randomIndex]] = [
      array[randomIndex],
      array[lastIndex],
    ];
  }

  return array;
}
