const form = document.querySelector("#form-flashcards");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const deck = document.getElementById("deck");

// const URL_BASE = "http://localhost:3333";
const URL_BASE = "";

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

async function fetchApi(path = "/api/flashcards", options) {
	const response = await fetch(path, options).catch(console.error);

	if (!response.ok) throw new Error("bad request");

	return response;
}

function flashCardsApi() {
	const path = "/api/flashcards";

	return {
		async getAll() {
			const response = await fetchApi(`${URL_BASE}${path}`);

			return await response.json();
		},

		async create(data) {
			const response = await fetchApi(`${URL_BASE}${path}`, {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify(data),
			});

			return await response.json();
		},

		async deleteById(id) {
			const response = await fetchApi(`${URL_BASE}${path}/${id}`, {
				method: "DELETE",
			});

			return await response.json();
		},

		async updateById(id, newValue) {
			const response = await fetchApi(`${URL_BASE}${path}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify(newValue),
			});

			return await response.json();
		},
	};
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
	let cards = [];

	const api = flashCardsApi();

	(async () => {
		const flashCards = await api.getAll();

		setState(flashCards);
	})();

	const getState = () => cards;

	const setState = (newState) => {
		cards = newState;
		repository.set(newState);
		observer.emit();
	};

	async function createCard({ question, answer }) {
		const newCard = await api.create({ question, answer });
		console.log(`created new card: `, newCard);
		setState([...cards, newCard]);
	}

	const deleteById = (id) => async () => {
		const { idDeleted, message } = await api.deleteById(id);
		console.log(`Delete id: ${idDeleted}\n`, message);
		const filtered = cards.filter((card) => card.id !== idDeleted);
		setState(filtered);
		alert(message);
	};

	const updateById = async (id, newValue) => {
		await api.updateById(id, newValue);
		console.log(`updateById: `, newValue);

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

		const answer = document.createElement("p");
		answer.classList.add("cards__answer");

		const button = document.createElement("button");
		button.textContent = "Excluir";
		button.addEventListener("click", onClick);
		button.setAttribute("contentEditable", false);

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

	function insertCard(card, callBack, onBlur) {
		const flashcard = createCardElement(card, callBack(card.id), onBlur);
		deck.append(flashcard);
	}

	function renderCards(cards) {
		deck.innerHTML = "";

		cards.forEach((card) => {
			insertCard(card, flashCards.deleteById, ({ id, ...data }) => {
				flashCards.updateById(id, data);
			});
		});
	}

	return {
		renderCards,
	};
}

const repository = LocalStorageRepository();
const flashCards = MakeDeck(repository);
const view = View();

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const data = { question: question.value, answer: answer.value };
	await flashCards.createCard(data).catch(console.error);
	form.reset();
});

view.renderCards(flashCards.getState());
flashCards.subscribe(() => {
	view.renderCards(flashCards.getState());
});

flashCards.subscribe(() => {
	deck.style.position = "relative";

	const childs = Array.from(deck.children);
	childs.forEach((card, index) => {
		card.style.position = "absolute";
		card.style.top = `${0.9 * index * 10}%`;
		card.style.left = `${0.5 * index * 10}%`;
		card.style.zIndex = ++index;
		const { zIndex, top, left } = getComputedStyle(card);
		console.log({ zIndex, top, left });
	});
});
