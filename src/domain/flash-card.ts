import Entity from "./entity";

type FlashCardProps = {
	id?: string;
	question: string;
	answer: string;
};

export class FlashCard extends Entity {
	question: string;
	answer: string;
    createdAt: Date;

	constructor({ id, question, answer }: FlashCardProps) {
		super(id);
		this.question = question;
		this.answer = answer;
        this.createdAt = new Date()
	}
}
