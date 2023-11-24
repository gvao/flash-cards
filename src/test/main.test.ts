import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { IncomingMessage, Server, ServerResponse } from "node:http";
import { FlashCard } from "../domain";

const URL_BASE = `http://localhost:3333`;

async function makeRequest(url: string, init?: RequestInit) {
	const response = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
		},
		...init,
	});
	return response;
}

describe("testing server", () => {
	let _server = {} as Server<typeof IncomingMessage, typeof ServerResponse>;
	let idFakeFlash: string;

	beforeAll(async () => {
		const { server } = await import("../main");
		_server = server;
		await new Promise((resolve) => _server.once("listening", resolve));
	});

	test("testing rota POST api/flashcards", async () => {
		const data = { question: "any_question", answer: "any_answer" };
		const response = await makeRequest(`${URL_BASE}/api/flashcards`, {
			method: "POST",
			body: JSON.stringify(data),
		});

		const flashcard = await response.json();

		idFakeFlash = flashcard.id;
		expect(typeof flashcard.id).toBe("string");
	});

	test("testing rota GET api/flashcards", async () => {
		const response = await makeRequest(`${URL_BASE}/api/flashcards`);
		const cards = await response.json();

		expect(cards.length).toBe(1);
	});

	test("testing rota GET api/flashcards/:id", async () => {
		const response = await makeRequest(`${URL_BASE}/api/flashcards/${idFakeFlash}`);
		const card: FlashCard = await response.json();

		expect(card.answer).toBe('any_answer');
		expect(card.question).toBe('any_question');
	});

	test("testing rota PUT api/flashcards/:id", async () => {
		const url = `${URL_BASE}/api/flashcards`;
		const data = {
			question: "any_question_updated",
			answer: "any_answer_updated",
		};
		const expectedData = data

		await makeRequest(`${url}/${idFakeFlash}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});

		const response = await makeRequest(`${url}/${idFakeFlash}`);
		const flashCard: FlashCard = await response.json();

		expect(flashCard.question).toBe(expectedData.question);
		expect(flashCard.answer).toBe(expectedData.answer);
	});
	
	test("testing rota DELETE api/flashcards/:id", async () => {
		const url = `${URL_BASE}/api/flashcards`;

		const response = await makeRequest(`${url}/${idFakeFlash}`, {
			method: "DELETE",
		});

		const data = await response.json()

		expect(response.status).toBe(201)
	});
	test("testing rota DELETE api/flashcards/:id", async () => {
		const url = `${URL_BASE}/api/flashcards`;

		const response = await makeRequest(`${url}/any_id`, {
			method: "DELETE",
		});

		expect(response.status).toBe(404)
	});
	

	afterAll((done) => {
		_server.close((args) => console.log(`server closed`, args));
	});
});
