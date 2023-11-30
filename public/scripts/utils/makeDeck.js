import flashCardsApi from "./flashCardsApi.js";
import { Observer } from "./observer.js";

export default function MakeDeck(repository) {
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
