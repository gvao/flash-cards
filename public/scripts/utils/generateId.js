export function generateId() {
	const idHistory = {};

	const idRandom = Math.round(Math.random() * 1000);

	if (!!idHistory[idRandom]) return generateId();

	idHistory[idRandom] = {
		createdAt: Date.now(),
		id: idRandom,
	};

	return idRandom;
}
