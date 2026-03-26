import { generateCardsArrayFromArray, generateCardsArrayWithDoubleLength } from './generate-cards'
import { Card } from '../components/Card'

describe('generateCardsArrayFromArray', () => {
  test('creates a Card instance for each element', () => {
    const cards = generateCardsArrayFromArray([1, 2, 3])
    expect(cards).toHaveLength(3)
    cards.forEach((card) => expect(card).toBeInstanceOf(Card))
  })

  test('assigns correct values to each card', () => {
    const cards = generateCardsArrayFromArray([5, 10, 15])
    expect(cards[0].getValue()).toBe(5)
    expect(cards[1].getValue()).toBe(10)
    expect(cards[2].getValue()).toBe(15)
  })

  test('assigns sequential indices to each card', () => {
    const cards = generateCardsArrayFromArray([1, 2, 3])
    cards.forEach((card, i) => expect(card.index).toBe(i))
  })
})

describe('generateCardsArrayWithDoubleLength', () => {
  test('creates 2 * length cards', () => {
    const cards = generateCardsArrayWithDoubleLength(3)
    expect(cards).toHaveLength(6)
  })

  test('each value from 1 to length appears exactly twice', () => {
    const length = 4
    const cards = generateCardsArrayWithDoubleLength(length)
    const values = cards.map((c) => c.getValue())

    for (let i = 1; i <= length; i++) {
      expect(values.filter((v) => v === i)).toHaveLength(2)
    }
  })

  test('cards have sequential indices after shuffle', () => {
    const cards = generateCardsArrayWithDoubleLength(3)
    cards.forEach((card, i) => expect(card.index).toBe(i))
  })
})
