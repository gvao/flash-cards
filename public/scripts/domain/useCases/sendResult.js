import Card from "../entity/card.js";

/**
 * @typedef {object} Methods
 * @property {() => void} right
 * @property {() => void} left
 */

/**
 * @param {Card} card 
 * @returns {Methods}
 */
export default function sendResult(card, repository) {
    const cards = repository.getAll()
    const index = cards.findIndex(c => c.id === card.id)

    function Result(result) {
        if (result) card.isCorrect(true)
        else card.isCorrect(false)
        repository.set(cards.splice(index, 1, card))
    }

    const right = () => Result(true)
    const left = () => Result(false)
    return {
        right, left
    }
}
