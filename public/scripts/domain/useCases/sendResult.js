import Repository from "../../repository/LocalStorageRepository.js";
import Card from "../entity/card.js";

/**
 * @typedef {Object} Output
 * @property {Function} right
 * @property {Function} left
 */

/**
 * @param {Repository} repository
 * @param {Card} card
 * @returns {Output}
 */
export default function sendResult(repository, id) {

    /** @param {boolean} result */
    function handler(result) {
        const cards = repository.getAll()
        const card = cards.find(c => c.id === id)
        card.isCorrect(result)
        repository.set(cards)
    }

    const left = () => handler(false)
    const right = () => handler(true)

    return {
        left, right
    }
}