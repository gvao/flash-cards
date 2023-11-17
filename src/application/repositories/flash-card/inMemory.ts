import { FlashCard } from "../../../domain/flash-card";
import { Repository } from "../../../domain/repository";

export function FlashCardRepositoryInMemory(): Repository<FlashCard> {
    const flashCards: FlashCard[] = []

	return {
		add(item: FlashCard): void {
            flashCards.push(item)
        },
	};
}
