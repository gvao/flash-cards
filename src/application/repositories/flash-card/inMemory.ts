import { FlashCard } from "../../../domain/flash-card";
import { Repository } from "../../../domain/repository";

export function FlashCardRepositoryInMemory(): Repository<FlashCard> {
    const flashCards: FlashCard[] = []

    const getAll = async (): Promise<FlashCard[]> => flashCards

    const add = async (item: FlashCard): Promise<void> => {flashCards.push(item)}

    const getById = async (id: string) => {
        const card = flashCards.find(card => card.id === id)
        if(!card) throw new Error(`flashcard by id ${id} not found`)
        return card
    }

	return {
        add,
        getAll, 
        getById,
	};
}
