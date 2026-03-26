import { shuffleArray } from "./shuffle-array";

describe("shuffleArray", () => {
  test("returns array with same length", () => {
    const arr = [1, 2, 3, 4];
    expect(shuffleArray([...arr])).toHaveLength(arr.length);
  });

  test("returns array with same elements", () => {
    const arr = [1, 2, 3, 4];
    expect(shuffleArray([...arr]).sort()).toEqual([...arr].sort());
  });

  test("mutates and returns the same array reference", () => {
    const arr = [1, 2, 3];
    const result = shuffleArray(arr);
    expect(result).toBe(arr);
  });

  test("handles single element array", () => {
    expect(shuffleArray([42])).toEqual([42]);
  });

  test("handles empty array", () => {
    expect(shuffleArray([])).toEqual([]);
  });
});
