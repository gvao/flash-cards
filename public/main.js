
const form = document.querySelector("#form-flashcards");

async function getFlashcards(){
	const res = await fetch('api/flashcards')

	console.log(await res.json())
}

getFlashcards()

form.addEventListener("submit", (event) => {
	event.preventDefault();
	alert(`submit`);
});
