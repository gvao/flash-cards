import express from "express";
import cors from "cors";
import path from "path";
import { FlashCardRepositoryInMemory } from "../repositories/flash-card/inMemory";
import {
	CreateFlashCard,
	DeleteFlashCard,
	GetFlashCards,
	UpdateFlashcardById,
} from "../../use-cases";

const app = express();

const pathPublic = path.join(__dirname, "..", "..", "..", "public");

app.use(express.static(pathPublic));
app.use(express.json());
app.use(cors());

const repository = FlashCardRepositoryInMemory();

app.get("/api/flashcards", async (req, res) => {
	const getFlashCards = GetFlashCards(repository);
	const flashcards = await getFlashCards({}).catch(console.error)

	res.status(200).json(flashcards);
});

app.post("/api/flashcards", async (req, res) => {
	const {
		body: { question, answer },
	} = req;

	const createFlashcards = CreateFlashCard(repository);
	const flashcard = await createFlashcards({ question, answer }).catch(console.error)

	res.status(201).json(flashcard);
});

app.get("/api/flashcards/:id", async (req, res) => {
	const { params } = req;

	const getFlashCards = GetFlashCards(repository);
	const flashcards = await getFlashCards({});

	const flashcard = flashcards.find((card) => card.id === params.id);

	res.status(200).json(flashcard);
});

app.put("/api/flashcards/:id", async (req, res) => {
	const { params, body } = req;
	const { id } = params;
	const { question, answer } = body;

	const updateFlashcardById = UpdateFlashcardById(repository);
	await updateFlashcardById(id, { question, answer });

	res.status(201).json({});
});

app.delete("/api/flashcards/:id", async (req, res) => {
	const {
		params: { id },
	} = req;

	try {
		const deleteFlashCard = DeleteFlashCard(repository);
		await deleteFlashCard.byId(id);
		res.status(201).json({
			idDeleted: id,
			message: "deleted successfully",
		});
	} catch (err) {
		const error = err as Error;

		if (error.message === "not found") {
			res.status(404).json({
				idDeleted: id,
				message: `deleted error: ${error.message}`,
			});
		}
	}
});

export { app };
