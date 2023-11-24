import { FlashCard, Repository } from "../domain";
import { InvalidParameter } from "../error";

export const UpdateFlashcardById =
	(repository: Repository<FlashCard>) =>
	async (id: string, dataToUpdate: Partial<FlashCard>): Promise<void> => {
		const flashcard = await repository.getById(id);

		const keys = Object.keys(dataToUpdate);

		if (keys.length === 0 || !dataToUpdate) new InvalidParameter();

		for (const key of keys) {
			if (key === "question") {
				flashcard.updateQuestion(dataToUpdate[key]!);
			}

			if (key === "answer") {
				const value = dataToUpdate[key]!;

				flashcard.updateAnswer(value);
			}
		}
	};
