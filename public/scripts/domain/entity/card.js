import View from './view.js'
import { generateId } from '../../utils/generateId.js'

export default class Card {
    element;
    question
    id
    DAYS_TO_REVIEW = 2
    createdAt

    constructor(props) {
        const { id, question, answer } = props
        this.question = question
        this.answer = answer
        this.id = id || generateId()
        this.element = new View(props).element
        this.createdAt = new Date()
    }

    get isReview() {
        if (!this.reviewAt) return true

        return this.reviewAt.getTime() < Date.now()
    }

    /**
     * @param {boolean} result 
     */
    isCorrect(result) {
        if(!result) return
        this.newReview()
    }

    newReview() {
        const now = new Date()
        const day = now.getDate()
        this.reviewAt = new Date(now.setDate(day + this.DAYS_TO_REVIEW))
    }
}