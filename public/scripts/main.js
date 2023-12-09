import CardService from './services/CardService.js';
import LocalStorageRepository from "./repository/LocalStorageRepository.js";
import RenderCards from './utils/renderCards.js'

const formQuestion = document.getElementById('form-flashcards')

const repository = new LocalStorageRepository();
const cardService = new CardService(repository)
const renderCards = new RenderCards(cardService)

/**
 * @param {SubmitEvent} event 
 */
function handlerEvent(event) {
    event.preventDefault()
    const inputs = Array.from(formQuestion.querySelectorAll('input'))
    const [question, answer] = inputs.map(input => input.value)

    cardService.addNewCard({ question, answer })
    formQuestion.reset()
}

formQuestion.addEventListener('submit', handlerEvent)
repository.subscribe(() => {
    const cards = cardService.getCardsReviewIs(true)
    renderCards.render(cards)
})

const cards = cardService.getCardsReviewIs(true)
renderCards.render(cards)