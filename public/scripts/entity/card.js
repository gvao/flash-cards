import View from './view.js'

export default class Card {
    element;
    question
    id

    constructor(props) {
        const { id, question, answer } = props
        this.question = question
        this.answer = answer
        this.id = id
        this.element = new View(props).element
    }

    

}
