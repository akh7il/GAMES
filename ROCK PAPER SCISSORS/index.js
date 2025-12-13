let humanScore = document.getElementById("human_score")
let computerScore = document.getElementById("computer_score")
let displayUserChoice = document.getElementById("display_user_choice")
let displayComputerChoice = document.getElementById("display_computer_choice")
let selectChoice = document.querySelectorAll(".choice_button")
let rounds = document.getElementById("select_rounds")
let showResult = document.getElementById("show_result")
let reset = document.getElementById("reset")
let choiceCard = document.querySelectorAll(".choice_card")
const choices = ["✊", "🤚", "✌️"]
let theUserChoiceName = document.getElementById("the_user_choice")
let theComputerChoiceName = document.getElementById("the_computer_choice")
let theWinnerDiv = document.getElementById("round_winners")
let hScore = 0
let cScore = 0
let draw = 0
let totalRoundsPlayed = 0
let roundNumber = 1
let theRound
let roundWinner
let theComputerChoice


selectChoice.forEach((choice) => {
    choice.addEventListener("click", async () => {
        if (displayUserChoice.textContent !== "🤜" || displayComputerChoice.textContent !== "🤜") {
            displayUserChoice.textContent = "🤜"
            displayComputerChoice.textContent = "🤛"
        }
        await shake()
        displayUserChoice.textContent = choice.textContent
        if (choice.textContent == "✊") {
            theUserChoiceName.textContent = "rock"
        }
        else if (choice.textContent == "🤚") {
            theUserChoiceName.textContent = "paper"
        }
        else {
            theUserChoiceName.textContent = "scissors"
        }
        computerChoice()
        checkWinner()
        theRoundsLimit()
        totalRoundPlayed()
        showHistory()
    })
})

function shake() {
    return new Promise((resolve) => {
        let finished = 0
        const numberOfCards = choiceCard.length

        choiceCard.forEach((card) => {
            card.classList.remove("shake")
            void card.offsetWidth;
            card.classList.add("shake")
        })

        choiceCard.forEach((card) => {
            card.addEventListener("animationend", () => {
                finished++
                if (finished === numberOfCards) {
                    resolve()
                }
            })
        })

    })
}

function computerChoice() {
    theComputerChoice = Math.floor(Math.random() * selectChoice.length)
    displayComputerChoice.textContent = choices[theComputerChoice]
    if (choices[theComputerChoice] == "✊") {
        theComputerChoiceName.textContent = "rock"
    }
    else if (choices[theComputerChoice] == "🤚") {
        theComputerChoiceName.textContent = "paper"
    }
    else {
        theComputerChoiceName.textContent = "scissors"
    }
}

function checkWinner() {
    if (theComputerChoiceName.textContent === theUserChoiceName.textContent) {
        showResult.textContent = "its a draw"
        roundWinner = showResult.textContent
        showResult.style.color = "yellow"
        draw++
    }
    else if (theComputerChoiceName.textContent == "rock" && theUserChoiceName.textContent == "paper" ||
        theComputerChoiceName.textContent == "paper" && theUserChoiceName.textContent == "scissors" ||
        theComputerChoiceName.textContent == "scissors" && theUserChoiceName.textContent == "rock") {
        showResult.textContent = "you won this round"
        roundWinner = showResult.textContent
        showResult.style.color = "rgb(34, 197, 94)"
        ++hScore
        humanScore.textContent = hScore
    }
    else if (theComputerChoiceName.textContent == "rock" && theUserChoiceName.textContent == "scissors" ||
        theComputerChoiceName.textContent == "paper" && theUserChoiceName.textContent == "rock" ||
        theComputerChoiceName.textContent == "scissors" && theUserChoiceName.textContent == "paper") {
        showResult.textContent = "computer won this round"
        roundWinner = showResult.textContent
        showResult.style.color = "red"
        ++cScore
        computerScore.textContent = cScore
    }
}

function theRoundsLimit() {
    theRound = Number(rounds.value)
    rounds.addEventListener("change", () => {
        theRound = Number(rounds.value)
    })
}

function totalRoundPlayed() {
    totalRoundsPlayed = (draw + cScore + hScore)
    if (totalRoundsPlayed >= theRound) {
        selectChoice.forEach((choice) => {
            choice.disabled = true
        })
    }
}

function showHistory() {
    const roundDiv = document.createElement("div");
    roundDiv.classList.add("round_history_item");

    roundDiv.innerHTML = `
        <p class="round_name">Round ${roundNumber}</p>
        <p class="round_winner">${roundWinner}</p>
    `
    theWinnerDiv.appendChild(roundDiv);
    roundNumber++;
}

reset.addEventListener("click", () => {
    hScore = cScore = draw = 0
    roundNumber = 1

    humanScore.textContent = 0
    computerScore.textContent = 0
    showResult.textContent = ""
    theWinnerDiv.innerHTML = ""

    displayUserChoice.textContent = "🤜"
    displayComputerChoice.textContent = "🤛"

    totalRoundsPlayed = 0

    rounds.selectedIndex = 0
    theRound = Number(rounds.value)

    selectChoice.forEach(btn => btn.disabled = false)
})
