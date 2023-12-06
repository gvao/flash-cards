import Card from "../domain/entity/card.js";

export default class Repository {
	/**@type {Card[]} */
	_cards

	constructor(repositoryName = 'cards') {
		this.repositoryName = repositoryName;
		this._cards = JSON.parse(localStorage.getItem(repositoryName)) || []
	}

	/**
	 * @returns {Card[]}
	 */
	getAll() {
		return this._cards.map(card => new Card(card))
	}

	/**
	* @param {Partial<Card>} value 
	* @returns {void}
	*/
	set(value) {
		localStorage.setItem(this.repositoryName, JSON.stringify(value));
		this._cards = value
	}
}