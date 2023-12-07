import Card from "../domain/entity/card.js"
import CardService from "../services/CardService.js"

/**
 * @param {CardService} cardService 
 */
export default function RenderCards(cardService) {
    this.deck = document.getElementById('deck')

    /**
     * 
     * @param {Card} cards 
    */
    this.render = (cards) => {
        this.deck.innerHTML = ''
        const elements = cards
            .map(card => {
                const intl = new Intl.DateTimeFormat('pt-BR')
                const li = createElement('li', { textContent: `${card.isReview ? 'review' : 'not review'}: ${intl.format(card.reviewAt)}` })

                const question = createElement('h3', { textContent: card.question })
                const answerElement = createElement('p', { textContent: card.answer })
                const buttonDelete = createButtonElement('delete', { onclick: () => { cardService.deleteCardById(card.id) } })
                const choiceElement = createChoicesElement(
                    () => { cardService.rightCard(card) },
                    () => { cardService.leftCard(card) },
                )

                li.classList.add('deck__card')
                question.classList.add('cards__question')
                answerElement.classList.add('cards__answer')
                answerElement.dataset.hide = true
                choiceElement.dataset.hide = true

                const formQuestion = createFormAnswerElement(event => {
                    const input = event.target.querySelector('input')
                    const button = event.target.querySelector('button')
                    answerElement.dataset.hide = false
                    choiceElement.dataset.hide = false
                    button.dataset.hide = true
                })

                li.append(question, buttonDelete, answerElement, formQuestion, choiceElement)

                return li
            })
        this.deck.append(...elements)

    }

}

/**
 * @param {string} tagName 
 * @param {HTMLElement} options 
 * @return {HTMLElement}
 */
function createElement(tagName, { textContent, ...options } = {}) {
    const element = document.createElement(tagName)
    element.textContent = textContent
    for (const key in options) {
        element.setAttribute(key, options[key])
    }
    return element
}

/**
 * @param {string} textContent 
 * @param {HTMLButtonElement} options 
 * @return {HTMLButtonElement}
 */
function createButtonElement(textContent, { onclick = () => { }, ...options } = {}) {
    const button = createElement('button', { textContent, type: 'button', ...options })
    button.onclick = onclick
    return button
}

/**
 * 
 * @param {((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null} onSubmit 
 * @returns 
 */
function createFormAnswerElement(onSubmit) {
    const form = createElement('form')
    form.classList.add('form-question')
    form.onsubmit = event => {
        event.preventDefault()
        onSubmit(event)
    }
    const htmlString = `
            <input type="text" name="answer__input" id="answer__input" autofocus placeholder="Sua resposta aqui">
            <button type="submit">Responder</button>
        `
    form.innerHTML = htmlString

    return form
}

/**
 * @returns {HTMLDivElement}
 */
function createChoicesElement(right = () => { }, left = () => { }) {
    const div = createElement('div')
    const buttonAcertei = createButtonElement('acertei', { onclick: right })
    const buttonErrei = createButtonElement('Errei', { onclick: left })
    div.append(buttonAcertei, buttonErrei)
    return div
}