import { FlashCard } from "../../../domain/flash-card";
import { Repository } from "../../../domain/repository";

export function FlashCardRepositoryInMemory(): Repository<FlashCard> {
    const flashCards: FlashCard[] = []

    const getAll = async (): Promise<FlashCard[]> => flashCards

	return {
		async add(item: FlashCard): Promise<void> {
            flashCards.push(item)
        },
        getAll, 
	};
}
