import { generateId } from '../../utils/generateId.js'

export default class Card {
    question
    id
    DAYS_TO_REVIEW = 2
    createdAt
    /**
     * @private
     */
    _isReview = true

    constructor(props) {
        const { id, question, answer } = props
        this.question = question
        this.answer = answer
        this.id = id || generateId()
        this.createdAt = new Date()
    }

    get isReview() {
        if (!this.reviewAt) return true
        this._isReview = this.reviewAt.getTime() < Date.now()
        return this._isReview
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