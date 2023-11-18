import { FlashCard, Repository } from "../domain";

export const UpdateFlashcardById =
	(repository: Repository<FlashCard>) =>
	async (id: string, dataToUpdate: Partial<FlashCard>): Promise<void> => {
		const flashcard = await repository.getById(id);

		const keys = Object.keys(dataToUpdate);

		if (keys.length === 0) throw new Error("invalid parameters");

		keys.forEach((key) => {
			if (key === "question")
				flashcard.updateQuestion(dataToUpdate[key]!);
			if (key === "answer") flashcard.updateAnswer(dataToUpdate[key]!);
		});
	};
