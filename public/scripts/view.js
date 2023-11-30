export default function View() {
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

	function renderCards(cards, { deleteById, updateById }) {
		deck.innerHTML = "";

		cards.forEach((card) => {
			insertCard(card, deleteById, updateById);
		});
	}

	return {
		renderCards,
	};
};
