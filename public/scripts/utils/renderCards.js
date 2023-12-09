import Card from "../domain/entity/card.js"
import CardService from "../services/CardService.js"

/**
 * @param {CardService} cardService 
 */
export default function RenderCards(cardService) {
    /** @private */
    this.deck = document.getElementById('deck')

    /**
     * @param {Card[]} cards 
    */
    this.render = (cards) => {
        this.deck.innerHTML = ''
        const elements = cards
            .map(card => {
                const li = createElement('li')

                const infoCardSection = createElement('section')
                const questionElement = createElement('h3', { textContent: card.question })
                const answerElement = createElement('p', { textContent: card.answer })
                // const buttonDelete = createButtonElement('delete', { onclick: () => { cardService.deleteCardById(card.id) } })
                const choiceElement = createChoicesElement([
                    () => { cardService.rightCard(card.id) },
                    () => { cardService.leftCard(card.id) },
                ])

                li.classList.add('deck__card')
                questionElement.classList.add('cards__question')
                answerElement.classList.add('cards__answer')
                infoCardSection.classList.add('section__info')

                answerElement.dataset.hide = true
                choiceElement.dataset.hide = true

                const formQuestion = createFormAnswerElement(event => {
                    const button = event.target.querySelector('button')
                    answerElement.dataset.hide = false
                    choiceElement.dataset.hide = false
                    button.dataset.hide = true
                })

                formQuestion.appendChild(choiceElement)

                infoCardSection.append(questionElement, answerElement)
                li.append(infoCardSection, formQuestion)

                return li
            })
        this.deck.append(...elements)
        this.cards = elements
        this.cardsInLayers()
    }

    this.cardsInLayers = () => {
        this.cards.forEach((card, i, cards) => {
            const percent = i / cards.length

            card.style.position = 'absolute'
            card.style.width = '50%'
            card.style.marginLeft = `${40 * percent}%`
            card.style.marginTop = `${10 * percent}% `
        })
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
            <input type="text" name="answer__input" id="answer__input" class="answer__input" autofocus placeholder="Sua resposta aqui">
            <button type="submit">Responder</button>
        `
    form.innerHTML = htmlString

    return form
}

/**
 * @param {Element[]} elements
 * @returns {HTMLDivElement}
 */
function createChoicesElement([right = () => { }, left = () => { }]) {
    const div = createElement('div')
    const buttonRight = createButtonElement('Acertei', { onclick: right })
    const buttonLeft = createButtonElement('Errei', { onclick: left })
    div.classList.add('card__choices')
    div.append(buttonRight, buttonLeft)
    return div
}