import View from "./view.js";
import LocalStorageRepository from "./repository/LocalStorageRepository.js";
import MakeDeck from "./utils/makeDeck.js";

const deck = document.getElementById("deck");
const form = document.querySelector("#form-flashcards");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");

const repository = LocalStorageRepository();
const flashCards = MakeDeck(repository);
const view = View();

function RenderCards() {
	view.renderCards(flashCards.getState(), {
		deleteById: flashCards.deleteById,
		updateById: ({ id, ...data }) => {
			flashCards.updateById(id, data);
		},
	});
}

flashCards.subscribe(RenderCards);
RenderCards();

flashCards.subscribe(() => {
	deck.style.position = "relative";

	const childs = Array.from(deck.children);
	childs.forEach((card, index) => {
		card.style.position = "absolute";
		card.style.top = `${0.5 * index * 30}%`;
		card.style.left = `${0.5 * index * 10}%`;
		card.style.zIndex = ++index;
		const { zIndex, top, left } = getComputedStyle(card);
		console.log({ zIndex, top, left });
	});
});

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const data = { question: question.value, answer: answer.value };
	await flashCards.createCard(data).catch(console.error);
	form.reset();
});
