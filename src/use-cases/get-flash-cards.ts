import { FlashCard, Repository } from "../domain";


export function GetFlashCards(repository: Repository<FlashCard>) {
	return async ({ limit = 15, pagination = 0 }) => {
		const flashcards = await repository.getAll();

		const start = limit * pagination;
		const end = start + limit;

		return flashcards.slice(start, end);
	};
}
