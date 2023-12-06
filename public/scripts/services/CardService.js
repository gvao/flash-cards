import getCards from "../domain/useCases/getCards.js"
import AddCard from "../domain/useCases/addCard.js"
import removeCard from "../domain/useCases/removeCard.js"
import { Observer } from "../utils/observer.js"
import Card from "../domain/entity/card.js"
import sendResult from "../domain/useCases/sendResult.js"

export default class CardService {
    /**
     * @type {Card[]}
     * @private
     */
    _cards = []
    /**
     * @private
     */
    _observer = Observer()
    /**
     * @private
     */
    _repository

    constructor(repository) {
        this._repository = repository
        this._cards = getCards(repository)
        this._observer.notifyAll()
    }

    /**
     * @returns {Card[]}
     */
    get cards() {

        return this._cards.filter(card => card.isReview)
    }

    onChangeCards(listener) {
        this._observer.subscribe(listener)
    }

    addNewCard({ ...props }) {
        const addCard = new AddCard(this._repository)
        const card = addCard.execute(props)
        this._cards.push(card)
        this._observer.notifyAll()
    }

    /**
     * @param {string} id
     */
    deleteCardById(id) {
        removeCard(id, this._repository)
        const index = this._cards.findIndex(card => card.id === id)
        this._cards.splice(index, 1)
        this._observer.notifyAll()
    }

    /**
     * @param {Card} card 
     */
    rightCard(card) {
        sendResult(card, this._repository).right()
        this._observer.notifyAll()
    }
    /**
     * @param {Card} card 
     */
    leftCard(card) {
        sendResult(card, this._repository).left()
        this._observer.notifyAll()
    }
}

