const form = document.querySelector('#form-flashcards')

form.addEventListener('submit', event => {
    event.preventDefault();
    alert(`submit`)
})