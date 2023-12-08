import Card from "../domain/entity/card.js";
import { Observer } from "../utils/observer.js";

export default class Repository {
	/** @type {Card[]} */
	_cards

	/** @private */
	_observer = Observer()
	notify = this._observer.notifyAll
	subscribe = this._observer.subscribe
	print = (...args) => console.log(`[localStorageRepository]: `, ...args)

	constructor(repositoryName = 'cards') {
		this.repositoryName = repositoryName;
		this._cards = this.getLocalStorage(repositoryName)
	}

	/**
	 * @returns {Card[]}
	 */
	getAll() {
		return this._cards.map(card => new Card(card))
	}

	getLocalStorage = (repositoryName) => JSON.parse(localStorage.getItem(repositoryName)) || []

	/**
	* @param {Partial<Card>} value 
	* @returns {void}
	*/
	/**@param {Card[]} value  */
	set(value) {
		this._cards = value
		localStorage.setItem(this.repositoryName, JSON.stringify(this._cards));
		this.notify(this._cards)
	}


}