import { expect, test } from "vitest";

class Entity {
	id: string;

	constructor(id: string = crypto.randomUUID()) {
		this.id = id;
	}
}

class FlashCard extends Entity {
	question: string;
	answer: string;

	constructor({
		question,
		answer,
	}: {
		id?: string;
		question: string;
		answer: string;
	}) {
		super();
		this.question = question;
		this.answer = answer;
	}
}

test("should instance a flash card", () => {
	const flashCard = new FlashCard({ question: "qual meu nome?", answer: "Yuri" });

	expect(flashCard).toBeInstanceOf(FlashCard);
	expect(flashCard.id).toBeDefined();
});
