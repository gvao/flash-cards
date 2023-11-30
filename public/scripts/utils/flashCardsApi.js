const URL_BASE = "";

async function fetchApi(path = "/api/flashcards", options) {
	const response = await fetch(path, options).catch(console.error);

	if (!response.ok) throw new Error("bad request");

	return response;
}

export default function flashCardsApi() {
	const path = "/api/flashcards";

	return {
		async getAll() {
			const response = await fetchApi(`${URL_BASE}${path}`);

			return await response.json();
		},

		async create(data) {
			const response = await fetchApi(`${URL_BASE}${path}`, {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify(data),
			});

			return await response.json();
		},

		async deleteById(id) {
			const response = await fetchApi(`${URL_BASE}${path}/${id}`, {
				method: "DELETE",
			});

			return await response.json();
		},

		async updateById(id, newValue) {
			const response = await fetchApi(`${URL_BASE}${path}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify(newValue),
			});

			return await response.json();
		},
	};
}