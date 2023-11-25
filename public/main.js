const form = document.querySelector("#form-flashcards");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const deck = document.getElementById("deck");

function Observer() {
	const subscribers = [];

	const subscribe = (listener) => {
		subscribers.push(listener);
	};
	const emit = () => subscribers.forEach((listener) => listener());
	return {
		subscribe,
		emit,
	};
}

function generateId() {
	const idHistory = {};

	const idRandom = Math.round(Math.random() * 1000);

	if (!!idHistory[idRandom]) return generateId();

	idHistory[idRandom] = {
		createdAt: Date.now(),
		id: idRandom,
	};

	return idRandom;
}

function MakeDeck() {
	const observer = Observer();

	let cards = [
		{ question: "any_question", answer: "any_answer", id: generateId() },
	];

	const getState = () => cards;
	const setState = (newState) => {
		cards = newState;
		observer.emit();
	};

	async function createCard({ question, answer }) {
		const newCard = { question, answer, id: generateId() };
		setState([...cards, newCard]);
	}

	const deleteById = (id) => () => {
		const filtered = cards.filter((card) => card.id !== id);
		setState(filtered);
	};

	return {
		getState,
		createCard,
		subscribe: observer.subscribe,
		deleteById,
	};
}

function View() {
	function createCardElement(card, onClick = () => {},) {
		const li = document.createElement("li");
		li.id = `card-${card.id}`;
		li.setAttribute('contentEditable', 'true');
		
		li.addEventListener('input', event => {
			console.log(event)
			console.log(event.target)
		})

		const question = document.createElement("h3");
		question.classList.add("cards__question");

		const answer = document.createElement("p");
		answer.classList.add("cards__answer");

		const button = document.createElement("button");
		button.textContent = "Excluir";
		button.addEventListener("click", onClick);

		question.textContent = card.question;
		answer.textContent = card.answer;

		li.append(question, answer, button);

		return li;
	}

	function insertCards(cards = [], callBack) {
		deck.innerHTML = "";

		const cardElements = cards.map((card) =>
			createCardElement(card, callBack(card.id))
		);
		deck.append(...cardElements);
	}

	return {
		insertCards,
	};
}

const flashCards = MakeDeck();
const view = View();

function renderCards() {
	const cards = flashCards.getState();
	view.insertCards(cards, flashCards.deleteById);
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const data = { question: question.value, answer: answer.value };
	flashCards.createCard(data);
	form.reset();
});

flashCards.subscribe(renderCards);
renderCards();
