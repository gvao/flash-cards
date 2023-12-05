import Card from './entity/card.js'

/**
 * @param {HTMLUListElement} deck 
 */

export default function ViewCards(deck) {
	function renderCards(cards, { deleteById, updateById }) {
		deck.innerHTML = ""

		const cardsElement = cards
			.map(card => new Card(card).element);

		deck.append(...cardsElement);
	}

	return {
		renderCards,
	};
}
