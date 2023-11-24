import { beforeEach, describe, expect, test } from "vitest";
import {
	CreateFlashCard,
	GetFlashCards,
	UpdateFlashcardById,
} from "../use-cases";
import { FlashCardRepositoryInMemory } from "../application/repositories/flash-card/inMemory";
import { FlashCard } from "../domain";

const repository = FlashCardRepositoryInMemory();

let idFakeFlashcard: string;

describe("UpdateFlashcardById", () => {
	beforeEach(async () => {
		const fakeData = {
			question: "any_question",
			answer: "any_answer",
		};
		const createFlashCard = CreateFlashCard(repository);
		const flashcard = await createFlashCard(fakeData);
		idFakeFlashcard = flashcard.id;
	});

	test("should return error with invalid parameters", async () => {
		const updateFlashcardById = UpdateFlashcardById(repository);

		const invalidParameters: Partial<FlashCard>[] = [
			{},
			{ answer: `` },
			{ question: `` },
			{ answer: ``, question: `` },
			{ answer: ``, question: "", createdAt: new Date() },
		];

		for (const invalidParameter of invalidParameters) {
			expect(async () => {
				await updateFlashcardById(idFakeFlashcard, invalidParameter);
			}).rejects.toThrow("invalid parameters");
		}
	});

	test("should update a flashcard", async () => {
		const updateFlashcardById = UpdateFlashcardById(repository);
		const getFlashCards = GetFlashCards(repository);

		const data: Partial<FlashCard> = {
			answer: "any_answer_updated",
			question: "any_question_updated",
		};

		const expectedData = data;

		updateFlashcardById(idFakeFlashcard, data);
		const flashCards = await getFlashCards({});
		const flashCardUpdated = flashCards.find(
			(cards) => cards.id === idFakeFlashcard
		);

		expect(flashCardUpdated?.question).toBe(data.question);
		expect(flashCardUpdated?.answer).toBe(data.answer);
	});
});
