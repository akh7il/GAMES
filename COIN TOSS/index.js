let userChoice = document.querySelectorAll(".option")
let coin = document.getElementById("coin")
let showWinner = document.getElementById("the_winner")
let playerScore = document.getElementById("player_score")
let computerScore = document.getElementById("computer_score")
let showRemainingRounds = document.getElementById("remaining_rounds")
let theWinner = document.getElementById("winner")
let reset = document.getElementById("reset_button")
let theCoinFace
let theUserChoiceIs
let thePlayerScore = 0
let theComputerScore = 0
let rounds = 5

showRemainingRounds.textContent = rounds
userChoice.forEach((choice) => {
    choice.addEventListener("click", () => {
        theUserChoiceIs = choice.textContent.toLowerCase().trim()
        coinFlip()
        checkRounds()
    })
})

function coinFlip() {
    userChoice.forEach((btn) => { btn.disabled = true })
    let faceIs = Math.floor(Math.random() * 2)
    if (faceIs) {
        coin.style.setProperty("--final-rotation", "0deg")
        theCoinFace = "head"
    }
    else {
        coin.style.setProperty("--final-rotation", "180deg")
        theCoinFace = "tail"
    }
    coin.classList.remove("flip")
    void coin.offsetWidth
    coin.classList.add("flip")
}

coin.addEventListener("animationend", () => {
    rounds--
    showRemainingRounds.textContent = rounds
    if (theUserChoiceIs == theCoinFace) {
        showWinner.textContent = "you won this round"
        thePlayerScore++
        playerScore.textContent = thePlayerScore
    }
    else {
        showWinner.textContent = "computer won this round"
        theComputerScore++
        computerScore.textContent = theComputerScore
    }
    theUserChoiceIs = null
    if (rounds === 0) {
        theWinnerIs()
        userChoice.forEach((btn) => { btn.disabled = true })
    }
    else {
        userChoice.forEach((btn) => { btn.disabled = false })
    }
})

function theWinnerIs() {
    if (rounds == 0 && thePlayerScore > theComputerScore) {
        theWinner.classList.add("displaythewinner")
        theWinner.textContent = "you won🥇"
        theWinner.style.color = "green"
    }
    else {
        theWinner.classList.add("displaythewinner")
        theWinner.textContent = "computer won❗"
        theWinner.style.color = "red"
    }
}

reset.addEventListener("click", () => {
    theWinner.classList.remove("displaythewinner")
    coin.style.setProperty("--final-rotation", "0deg")
    theCoinFace = null
    theUserChoiceIs = null
    thePlayerScore = 0
    theComputerScore = 0
    rounds = 5
    playerScore.textContent = 0
    computerScore.textContent = 0
    showRemainingRounds.textContent = rounds
    showWinner.textContent = "choose your option"
    theWinner.textContent = ""
    userChoice.forEach((btn) => { btn.disabled = false })
})
