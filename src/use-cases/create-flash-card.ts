import { FlashCard } from "../domain/flash-card";
import { Repository } from "../domain/repository";

type Props = {
	id?: string;
	question: string;
	answer: string;
};

export function CreateFlashCard(repository: Repository<FlashCard>) {
	return async ({ id, question, answer }: Props): Promise<FlashCard> => {
		const flashCard = new FlashCard({ id, question, answer });
		await repository.add(flashCard);
		return flashCard;
	};
}