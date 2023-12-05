/**
 * @constant {Element} element
 * @returns {Element} A element DOM
 */
function createElement(tagName, { className, textContent = "" }) {
    if (!className) throw new Error("Parameter 'className' not specified");

    const element = document.createElement(tagName);

    element.classList.add(className);
    element.textContent = textContent;
    element.dataset.hide = false

    return element;
}

export default class View {

    /**
     * @param {Element} element
     */
    element
    difficulty = null
    optionsDifficulty = {
        hard: 0, easy: 100, medium: 50,
    }

    constructor({ id, question, answer }) {
        this.element = this.makeElement({ title: `card id:\n${id}`, id, question, answer })
        this.difficulty = 'easy'
    }

    makeElement({ id, title, question, answer }) {

        const element = createElement('li', { className: 'deck__card', id })
        const titleElement = createElement('h4', { className: 'card__title', textContent: title })
        const questionElement = createElement('p', { className: 'card__question', textContent: question })
        const answerElement = createElement('p', { className: 'card__answer', textContent: answer })

        this.hideElement(answerElement)

        const formElement = this.makeForm('card__form')

        const inputAnswerElement = this.makeInput('card__answer-input', { placeholder: 'resposta aqui...', required: true, autofocus: true })
        const difficultyElement = createElement('div', { className: 'form-difficulty' })

        const buttonShowAnswerElement = this.makeButton('card__button', 'responder')

        formElement.onsubmit = event => {
            event.preventDefault()
            console.log(`form submit`, this.difficulty, answer)

            const { value } = inputAnswerElement
            if (value.length < 3) return

            if (!!this.difficulty) {
                alert(`voce respondeu ${value}`)
                this.showElement(difficultyElement)
                this.showElement(answerElement)
                this.hideElement(buttonShowAnswerElement)
                return
            }

            this.difficulty = null

            return
        }


        const optionsElements = Object.keys(this.optionsDifficulty)
            .map(difficulty => {
                const handler = (event) => this.difficulty = difficulty
                return this.makeButton('card__difficulty', difficulty, handler)
            })

        this.hideElement(difficultyElement)

        inputAnswerElement.focus()
        difficultyElement.append(...optionsElements)
        formElement.append(inputAnswerElement, buttonShowAnswerElement, difficultyElement)
        element.append(titleElement, questionElement, answerElement, formElement)
        return element
    }

    /**}
     * @returns {HTMLFormElement}
     */
    makeForm = (className) => createElement('form', { className, })

    /**
     * @constant {HTMLButtonElement} buttonElement
     * @returns {HTMLButtonElement}
     * @
    */
    makeButton = (className, text, click = event => { },) => {
        const buttonElement = createElement('button', { className, textContent: text })
        buttonElement.addEventListener('click', (event) => click(event))
        return buttonElement
    }

    /**
     * @param {HTMLInputElement} props
     * @returns {HTMLInputElement}
     */
    makeInput(className, props) {
        const input = createElement('input', { className })
        for (const prop in props) input.setAttribute(prop, props[prop])
        return input
    }

    /**
     * @param {Element} element
     */
    hideElement(element) {
        element.dataset.hide = true
    }

    /**
     * @param {Element} element
     */
    showElement(element) {
        element.dataset.hide = false
    }
}
