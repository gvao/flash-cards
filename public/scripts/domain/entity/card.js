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
    /**@type {Date} */
    reviewAt = null

    constructor(props) {
        const { id, question, answer, _isReview, reviewAt, createdAt } = props
        this.question = question
        this.answer = answer
        this.id = id || generateId()
        this.createdAt = createdAt || new Date()
        this._isReview = typeof _isReview === 'undefined' ? true : _isReview
        this.reviewAt = reviewAt ? new Date(reviewAt) : null
    }

    get isReview() {
        return this._isReview
    }

    getReviewStatus = () => this._isReview

    /**
     * @param {boolean} result 
     */
    isCorrect(result) {
        if (!result) return
        this.newReview()
    }

    /** @private */
    newReview() {
        const now = new Date()
        const day = now.getDate()
        this.reviewAt = new Date(now.setDate(day + this.DAYS_TO_REVIEW))
        const isNotReview = this.reviewAt.getTime() < Date.now()
        console.log({ isNotReview });
        this._isReview = isNotReview
    }
}