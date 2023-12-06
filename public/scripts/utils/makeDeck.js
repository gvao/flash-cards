import flashCardsApi from "./flashCardsApi.js";
import { Observer } from "./observer.js";
import Card from '../entity/card.js'

/**
 * @typedef {Object} Repository
 * @property {Function} set - Função para definir o estado do repositório.
 */

/**
 * @typedef {Object} Deck
 * @property {() => Card[]} getState - Obtém o estado atual do deck.
 * @property {(card: { question: any, answer: any }) => Promise<void>} createCard - Cria um novo card.
 * @property {(listener: any) => void} subscribe - Adiciona um observador.
 * @property {(id: string) => () => Promise<void>} deleteById - Exclui um card por ID.
 * @property {(id: any, newValue: any) => Promise<void>} updateById - Atualiza um card por ID.
 * 
 * @param {Repository} repository - O repositório utilizado.
 * @returns {Deck} - Instância do deck.
 */

export default function MakeDeck(repository) {
	const observer = Observer();
	let cards = [];

	const api = flashCardsApi();

	(async () => {
		const flashCards = await api.getAll();

		setState(flashCards);
	})();

	/**
	 * Obtém o estado atual do deck.
	 * @returns {Card[]} - Array de cards.
	 */
	const getState = () => cards;

	/**
	 * Define o estado do deck.
	 * @param {Card[]} newState - Novo estado do deck.
	 */
	const setState = (newState) => {
		cards = newState;
		repository.set(newState);
		observer.emit();
	};

	/**
	 * Cria um novo card.
	 * @param {Object} param0 - Parâmetros para criação do card.
	 * @param {string} param0.question - Pergunta do card.
	 * @param {string} param0.answer - Resposta do card.
	 * @returns {Promise<void>} - Promise indicando a conclusão da criação.
	 */
	async function createCard({ question, answer }) {
		const newCard = await api.create({ question, answer });
		console.log(`created new card: `, newCard);
		setState([...cards, newCard]);
	}

	/**
	 * Exclui um card por ID.
	 * @param {string} id - ID do card a ser excluído.
	 * @returns {Promise<void>} - Promise indicando a conclusão da exclusão.
	 */
	const deleteById = (id) => async () => {
		const { idDeleted, message } = await api.deleteById(id);
		console.log(`Delete id: ${idDeleted}\n`, message);
		const filtered = cards.filter((card) => card.id !== idDeleted);
		setState(filtered);
		alert(message);
	};

	/**
	 * Atualiza um card por ID.
	 * @param {any} id - ID do card a ser atualizado.
	 * @param {any} newValue - Novos valores para o card.
	 * @returns {Promise<void>} - Promise indicando a conclusão da atualização.
	 */
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
