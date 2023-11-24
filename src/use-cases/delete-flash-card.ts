import { FlashCard, Repository } from "../domain";

export function DeleteFlashCard(repository: Repository<FlashCard>) {
	return {
		async byId(id: string) {
			await repository.deleteById(id);
		},
	};
}
