const deck = document.getElementById('deck');
const cards = Array.from(deck.children)

cards.forEach((card, i) => {
    const { width } = getComputedStyle(card)

    console.log(card, { width })

    card.style.position = 'absolute'
    card.style.width = '50%'
    card.style.marginLeft = `${10 * i}px`
    card.style.marginTop = `${5 * i}px`
})
