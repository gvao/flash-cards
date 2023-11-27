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

function LocalStorageRepository(repositoryName = "cards") {
	const getAll = () => JSON.parse(localStorage.getItem(repositoryName)) || [];
	const set = (newData) =>
		localStorage.setItem(repositoryName, JSON.stringify(newData));

	return {
		getAll,
		set,
	};
}

function MakeDeck(repository) {
	const observer = Observer();
	let cards = [
		{ question: "any_question", answer: "any_answer", id: generateId() },
	];

	cards = repository.getAll();

	const getState = () => cards;

	const setState = (newState) => {
		cards = newState;
		repository.set(newState);
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

	const updateById = (id, newValue) => {
		const cardsUpdated = cards.map((card) => {
			if (card.id !== id) return card;

			return {
				...card,
				...newValue,
			};
		});

		setState(cardsUpdated);
	};

	return {
		getState,
		createCard,
		subscribe: observer.subscribe,
		deleteById,
		updateById,
	};
}

function View() {
	function createCardElement(card, onClick = () => {}, onBlur = () => {}) {
		const data = {
			id: card.id,
			question: card.question,
			answer: card.answer,
		};

		const li = document.createElement("li");

		li.dataset.id = card.id;
		li.classList.add("deck__card");
		li.setAttribute("contentEditable", "true");

		const question = document.createElement("h3");
		question.classList.add("cards__question");
		question.setAttribute("contentEditable", "true");

		const answer = document.createElement("p");
		answer.classList.add("cards__answer");
		answer.setAttribute("contentEditable", "true");

		const button = document.createElement("button");
		button.textContent = "Excluir";
		button.addEventListener("click", onClick);

		question.textContent = data.question;
		answer.textContent = data.answer;

		li.addEventListener("input", (event) => {
			for (const child of li.childNodes) {
				const className = child.classList.value;
				const isCard = className.startsWith("card");
				const type = className.replace("cards__", "");
				if (isCard) {
					data[type] = child.textContent;
				}
			}
		});

		li.addEventListener("blur", (event) => {
			for (const type in data) {
				const value = data[type];
				if (value < 3)
					return alert(`Deve conter pelo menos 3 caracteres ${type}`);
			}
			onBlur(data, event);
		});

		li.append(question, answer, button);

		return li;
	}

	function insertCards(cards = [], callBack, onBlur) {
		deck.innerHTML = "";

		const cardElements = cards.map((card) =>
			createCardElement(card, callBack(card.id), onBlur)
		);
		deck.append(...cardElements);
	}

	return {
		insertCards,
	};
}

const repository = LocalStorageRepository();
const flashCards = MakeDeck(repository);
const view = View();

function renderCards() {
	const cards = flashCards.getState();
	view.insertCards(cards, flashCards.deleteById, ({ id, ...data }) =>
		flashCards.updateById(id, data)
	);
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const data = { question: question.value, answer: answer.value };
	flashCards.createCard(data);
	form.reset();
});

flashCards.subscribe(renderCards);
renderCards();
