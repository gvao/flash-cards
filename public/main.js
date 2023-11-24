const form = document.querySelector("#form-flashcards");


async function getFlashcards() {
	const URL_BASE = 'http://localhost:3333'
	const res = await fetch(URL_BASE + "/api/flashcards");

	if (!res.ok) throw new Error("bad request");

	return await res.json();
}

async function insertCard() {
	const cards = await getFlashcards();

	console.log(cards)
}

insertCard()	

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const {target} = event
	console.log(target.answer)
	alert(`submit`);
});
