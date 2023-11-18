import { beforeEach, expect, test } from "vitest";
import { FlashCardRepositoryInMemory } from "../application/repositories/flash-card/inMemory";
import { FlashCard, Repository } from "../domain";
import { CreateFlashCard, GetFlashCards } from "../use-cases";

let  repository: Repository<FlashCard>

beforeEach(() => {
    repository = FlashCardRepositoryInMemory();
})

test("Should create a new instance of get flashCards", async () => {
	const getFlashCards = GetFlashCards(repository);
	const flashCards = await getFlashCards({});

	expect(flashCards.length).toBe(0);
});

test("should get 2 flashcards", async () => {
	const getFlashCards = GetFlashCards(repository);
	const createFlashCards = CreateFlashCard(repository);

	await createFlashCards({ question: "any_question", answer: "any_answer" });
	await createFlashCards({ question: "any_question", answer: "any_answer" });

	const flashCards = await getFlashCards({});

	expect(flashCards.length).toBe(2);
});

test("Should get flashcard with pagination", async () => {
	const getFlashCards = GetFlashCards(repository);
	const createFlashCards = CreateFlashCard(repository);

	await createFlashCards({ question: "any_question01", answer: "any_answer" });
	await createFlashCards({ question: "any_question02", answer: "any_answer" });
	await createFlashCards({ question: "any_question03", answer: "any_answer" });
	await createFlashCards({ question: "any_question04", answer: "any_answer" });

	const flashCards = await getFlashCards({ pagination: 1, limit: 2 });

	expect(flashCards.length).toBe(2);
	expect(flashCards[0].question).toBe('any_question03');
});

test('should return limit default', async () => {
    const getFlashCards = GetFlashCards(repository);
	const createFlashCards = CreateFlashCard(repository);

    const quantityFlashCards = 20

    for (let i = 0; i < quantityFlashCards; i++) {
        await createFlashCards({ question: `any_question_${i}`, answer: "any_answer" });
    }

	const flashCards = await getFlashCards({})

    expect(flashCards.length).toBe(15)
	
})
