import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { FlashCard, Repository } from "../domain";
import { FlashCardRepositoryInMemory } from "../application/repositories/flash-card/inMemory";
import { CreateFlashCard, DeleteFlashCard } from "../use-cases";

describe("DeleteFlashCard", () => {
	let repository: Repository<FlashCard>;
	let fakeFlashCard: FlashCard;
	let sut: { byId(id: string): Promise<void> };

	beforeAll(() => {
		repository = FlashCardRepositoryInMemory();
		sut = DeleteFlashCard(repository);
	});

	beforeEach(async () => {
		const createFlashCard = CreateFlashCard(repository);
		fakeFlashCard = await createFlashCard({
			question: "any_question",
			answer: "any_answer",
		});

		expect(fakeFlashCard).toBeInstanceOf(FlashCard);
	});

	it("should delete the flash card", async () => {
		let flashCards: FlashCard[] = await repository.getAll();

		expect(flashCards.length).toBe(1);

		sut.byId(fakeFlashCard.id);
		flashCards = await repository.getAll();
		expect(flashCards.length).toBe(0);
	});

	it("should return error when not found id in flashcards", async () => {
		expect(async () => {
			await sut.byId("invalid id");
		}).rejects.toThrow("not found");
	});
	it("should return error with invalid parameters", async () => {
		const invalidParameter = "";

		expect(async () => {
			await sut.byId(invalidParameter);
		}).rejects.toThrow("not found");
	});
});
