import { beforeEach, test } from "vitest";
import { CreateFlashCard, UpdateFlashcardById } from "../use-cases";
import { FlashCardRepositoryInMemory } from "../application/repositories/flash-card/inMemory";

const repository = FlashCardRepositoryInMemory();

let idFakeFlashcard: string;

beforeEach(async () => {
	const fakeData = {
		question: "any_question",
		answer: "any_answer",
	};
	const createFlashCard = CreateFlashCard(repository);
	const flashcard = await createFlashCard(fakeData);
	idFakeFlashcard = flashcard.id;
});

test("", () => {
	const updateFlashcardById = UpdateFlashcardById(repository);

	const data = {
		question: ``,
	};

	updateFlashcardById(idFakeFlashcard, data);
});
