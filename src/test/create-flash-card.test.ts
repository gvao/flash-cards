import { expect, test } from "vitest";
import { FlashCard } from "../domain/flash-card";
import { FlashCardRepositoryInMemory } from "../application/repositories/flash-card/inMemory";
import { CreateFlashCard } from "../use-cases/create-flash-card";

test("create a new flash card", async () => {
	const repository = FlashCardRepositoryInMemory();
	const createFlashCard = CreateFlashCard(repository);

	const flashCard = await createFlashCard({
		answer: "any_answer",
		question: "any_question",
	});

    expect(flashCard).toBeInstanceOf(FlashCard)
});
