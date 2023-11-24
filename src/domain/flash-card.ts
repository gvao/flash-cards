import { InvalidParameter } from "../error";
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
		this.createdAt = new Date();
	}

	updateQuestion(newQuestion: string) {
		if (!newQuestion || newQuestion!.length < 3) new InvalidParameter();
		this.question = newQuestion;
	}
	updateAnswer(newAnswer: string) {
		if (!newAnswer || newAnswer.length < 3) new InvalidParameter();
		this.answer = newAnswer;
	}
}
