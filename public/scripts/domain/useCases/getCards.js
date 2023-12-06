import Card from '../entity/card.js'

export default function getCards(repository) {
    const cardData = repository.getAll()
    return cardData.map(data => new Card(data))
}