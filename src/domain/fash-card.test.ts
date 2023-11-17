import { beforeEach, expect, test } from "vitest";

class Entity {
	id: string;

	constructor(id?: string) {
		this.id = id || crypto.randomUUID();
	}
}

type FlashCardProps = {
	id?: string;
	question: string;
	answer: string;
};

class FlashCard extends Entity {
	question: string;
	answer: string;

	constructor({ id, question, answer }: FlashCardProps) {
		super(id);
		this.question = question;
		this.answer = answer;
	}
}

let sut: FlashCard;

beforeEach(() => {
	sut = new FlashCard({ question: "qual meu nome?", answer: "Yuri" });
});

test("should instance a flash card", () => {
	expect(sut).toBeInstanceOf(FlashCard);
	expect(sut.id).toBeDefined();
	expect(sut.question).toBe("qual meu nome?");
	expect(sut.answer).toBe("Yuri");
});

test("must ensure the id you choose", () => {
	const sut = new FlashCard({
		id: "any_id",
		answer: "any_answer",
		question: "any_question",
	});

	expect(sut.id).toBe("any_id");
});
