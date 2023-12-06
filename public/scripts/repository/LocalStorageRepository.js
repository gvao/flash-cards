/**  
 * @typedef {object} methods 
 * @property {any[]} getAll
 * @property {void} set
*/
/**
 * @param {string} repositoryName 
 * @returns {methods}
 */

export default function LocalStorageRepository(repositoryName = "cards") {
	const getAll = () => JSON.parse(localStorage.getItem(repositoryName)) || [];

	const set = (newData) =>
		localStorage.setItem(repositoryName, JSON.stringify(newData));

	return {
		getAll,
		set,
	};
}
