let cards = document.querySelectorAll(".card")
let moveCount = document.getElementById("move_count")
let matchCount = document.getElementById("match_count")
let reset = document.getElementById("reset")
let moveCountIs = document.getElementById("move_count_is")
let matchCountIs = document.getElementById("match_count_is")
let cardIs = null
let firstCard = null
let secondCard = null
let boardDisable = false
let moveIs = 0
let matchIs = 0

window.addEventListener("load", () => {
    shuffle();
});

cards.forEach((card) => {
    card.addEventListener("click", () => {
        if (boardDisable || card === firstCard || card.classList.contains("flip")) return
        card.classList.remove("unflip")
        card.classList.add("flip")
        card.addEventListener("animationend", () => {
            card.textContent = card.dataset.value
            if (!firstCard) {
                firstCard = card
            }
            else {
                secondCard = card
                boardDisable = true
                ++moveIs
                moveCount.textContent = moveIs
                moveCountIs = moveIs
                checkMatch()
            }
        }, { once: true })
    })
})

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        ++matchIs
        matchCount.textContent = matchIs
        matchCountIs = matchIs
        setTimeout(() => {
            firstCard.style.background = "rgba(52, 51, 77, 1)"
            secondCard.style.background = "rgba(52, 51, 77, 1)"
            firstCard = null
            secondCard = null
            boardDisable = false
        }, 200)
    }
    else {
        setTimeout(() => {
            firstCard.classList.remove("flip")
            secondCard.classList.remove("flip")
            firstCard.classList.add("unflip")
            secondCard.classList.add("unflip")
            firstCard.textContent = ""
            secondCard.textContent = ""
            firstCard = null
            secondCard = null
            boardDisable = false
        }, 1000)
    }
}

reset.addEventListener("click", () => {
    boardDisable = true

    cards.forEach(card => {
        card.classList.remove("unflip")
        void card.offsetWidth
        card.classList.remove("flip")
        card.classList.add("unflip")
        card.style.background = "rgb(149, 147, 198)"
        card.textContent = ""

        card.addEventListener("animationend", () => {
            card.classList.remove("unflip")
        }, { once: true })
    })
    shuffle()
    firstCard = null
    secondCard = null
    moveIs = 0
    matchIs = 0
    moveCount.textContent = 0
    matchCount.textContent = 0
    setTimeout(() => {
        boardDisable = false
    }, 500)
})

function shuffle() {
    let parent = cards[0].parentElement;
    let cardsArray = Array.from(parent.children);
    for (let i = cardsArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    cardsArray.forEach(card => parent.appendChild(card));
}