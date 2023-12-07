import CardService from './services/CardService.js';
import LocalStorageRepository from "./repository/LocalStorageRepository.js";
import RenderCards from './utils/renderCards.js'

const formQuestion = document.getElementById('form-flashcards')

const repository = new LocalStorageRepository();
const cardService = new CardService(repository)
const renderCards = new RenderCards(cardService)

/**
 * 
 * @param {SubmitEvent} event 
 */
function handlerEvent(event) {
    event.preventDefault()
    const inputs = Array.from(formQuestion.querySelectorAll('input'))
    const [question, answer] = inputs.map(input => input.value)

    cardService.addNewCard({ question, answer })
}

const logCardsLength = (cards = cardService.cards) => console.log(`${cards.length} para ${cardService.cards.length} cartas`)
// logCardsLength()

if (cardService.cards.length < 5) {
    const quant = 10 - cardService.cards.length
    console.log(`inserindo ${quant}`)
    for (let i = 0; i < quant; i++) {
        const random = Math.random() * 10000
        const idTemp = Math.round(random)
        console.log(`inserido o id: ${idTemp}`);
        cardService.addNewCard({
            answer: `resposta - ${idTemp}`,
            question: `pergunta - ${idTemp}`,
        })
    }
}

formQuestion.addEventListener('submit', handlerEvent)
cardService.onChangeCards(() => renderCards.render(cardService.cards))
cardService.onChangeCards(logCardsLength)
renderCards.render(cardService.cards)
