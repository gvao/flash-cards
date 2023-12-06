import Card from '../entity/card.js'

export default class AddCard {
    repository
    constructor(repository) {
        this.repository = repository
    }
    execute(newCard) {
        const cards = this.repository.getAll()
        const card = new Card(newCard)
        this.repository.set([...cards, card])
        return card
    }
}