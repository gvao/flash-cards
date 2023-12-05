import ViewCards from "./view.js";
import LocalStorageRepository from "./repository/LocalStorageRepository.js";
import MakeDeck from "./utils/makeDeck.js";

const deck = document.getElementById("deck");
const form = document.querySelector("#form-flashcards");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");

const repository = LocalStorageRepository();
const flashCards = MakeDeck(repository);
const view = ViewCards(deck);

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
	const childs = Array.from(deck.children);

	childs.forEach((card, index, cards) => {
		const totalCount = cards.length
		const percent = 0.5 * index;
		const shadow = 1 / totalCount
		const shadowPercent = shadow * index


		card.style.marginTop = `${percent * 20}px`;
		card.style.marginLeft = `${percent * 30}px`;
		card.style.boxShadow = `1px 1px ${10 * shadowPercent}px rgba(0, 0, 0, 0.3)`
	});
});

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const data = { question: question.value, answer: answer.value };
	await flashCards.createCard(data).catch(console.error);
	form.reset();
});
