import getCards from "../domain/useCases/getCards.js"
import AddCard from "../domain/useCases/addCard.js"
import removeCard from "../domain/useCases/removeCard.js"
import { Observer } from "../utils/observer.js"
import Card from "../domain/entity/card.js"
import Repository from "../repository/LocalStorageRepository.js"
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
    /** @private @type {Repository} */
    _repository

    _observer = Observer()
    onChangeCards = this._observer.subscribe
    notify = this._observer.notifyAll

    constructor(repository) {
        this._repository = repository
        this._cards = getCards(repository)

        /**@param {Card[]} data */
        const handlerRepositoryNotify = data => this.cards = data
        this._repository.subscribe(handlerRepositoryNotify)
    }

    /**
     * @returns {Card[]}
     */
    get cards() {
        return this._cards
    }

    set cards(newData) {
        this._cards = newData
        this.notify(this._cards)
    }

    /** @param {boolean} isReview  */
    getCardsReviewIs(isReview) {
        return this._cards.filter(card => card.isReview === isReview)
    }

    /**
     * @typedef Params
     * @property {string} question
     * @property {string} answer
     * 
     * @param {Params} newCard 
     * @property 
     */
    addNewCard(newCard) {
        const addCard = new AddCard(this._repository)
        addCard.execute(newCard)
        this.notify()
    }

    /**
     * @param {string} id
    */
    deleteCardById(id) {
        removeCard(id, this._repository)
        this.notify()
    }

    /**
     * 
     * @param {string} id 
     */
    changeReviewById(id) {
        if (!id) throw new Error('Please provide a valid id')
        const cards = this._repository.getAll()
        const card = cards.find(c => c.id === id)
        card.isCorrect(true)
        console.log(cards)
        this._repository.set(cards)
    }

    /** @param {string} id  */
    rightCard(id) {
        const { right } = sendResult(this._repository, id)
        right()
    }
    /** @param {string} id  */
    leftCard(id) {
        const { left } = sendResult(this._repository, id)
        left()
    }

}

