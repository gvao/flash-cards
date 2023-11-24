import { assert, beforeEach, describe, expect, test } from "vitest";
import { FlashCard } from "../domain/flash-card";
import { InvalidParameter } from "../error";

let sut: FlashCard;

describe("flashcard", () => {
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

	describe("#updateQuestion", () => {
		test("should update flashcard with update method", () => {
			const sut = new FlashCard({
				id: "any_id",
				answer: "any_answer",
				question: "any_question",
			});

			sut.updateQuestion("question_updated");

			expect(sut.question).toBe("question_updated");
		});

		test("should`n update flashcard with invalid parameters", () => {
			const sut = new FlashCard({
				id: "any_id",
				answer: "any_answer",
				question: "any_question",
			});

			expect(() => sut.updateQuestion("")).toThrowError(`invalid parameter`);
		});
	});

	describe("#updateAnswer", () => {
		test("should update flashcard with update method", () => {
			const sut = new FlashCard({
				id: "any_id",
				answer: "any_answer",
				question: "any_question",
			});

			sut.updateAnswer("answer_updated");

			expect(sut.answer).toBe("answer_updated");
		});

		test("should`n update flashcard with invalid parameters", () => {
			const sut = new FlashCard({
				id: "any_id",
				answer: "any_answer",
				question: "any_question",
			});

			expect(() => {
				sut.updateAnswer("");
			}).toThrowError("invalid parameters");
		});
	});
});
