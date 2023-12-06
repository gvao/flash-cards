export default function removeCard(id, repository) {
    if(!id) throw new Error(`id is required`)
    const cards = repository.getAll()
    const cardsFiltered = cards.filter(card => card.id !== id)
    repository.set(cardsFiltered)
}