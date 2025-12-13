let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8],
]

let theWinnerIs = document.getElementById("player_name")

const form = document.getElementById("submit_name")

let player1WinCount = document.getElementById("player1_win_count")

let player1LossCount = document.getElementById("player1lose_count")

let player2WinCount = document.getElementById("player2_win_count")

let player2LossCount = document.getElementById("player2lose_count")

let playAgain = document.getElementById("play_again")

let winNotification = document.getElementById("win_notification")

let playerOneWinCount = 0

let playerOneLossCount = 0

let playerTwoWinCount = 0

let playerTwoLossCount = 0

let tieNotification = document.getElementById("tie_notification")

let tiePlayAgain = document.getElementById("tieplay_again")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const player1Name = document.getElementById("player1").value
    const player2Name = document.getElementById("player2").value

    let playerTurn = player1Name

    console.log(player1Name)
    console.log(player2Name)

    form.style.display = "none"

    let player1name = document.getElementById("player1name")
    let player2name = document.getElementById("player2name")

    player1name.textContent = player1Name
    player2name.textContent = player2Name

    let playerCard = document.querySelectorAll(".player_card")

    playerCard.forEach((x) => {
        x.classList.add("active")
    })

    let resetButton = document.getElementById("reset")
    resetButton.style.display = "block"

    let buttons = document.querySelectorAll(".play_button")
    console.log(buttons)

    player1name.style.color = "black"

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (playerTurn == player1Name) {
                player2name.style.color = "black"
                button.textContent = "x"
                button.disabled = true
                playerTurn = player2Name
                player1name.style.color = "white"
                checkWinner()
                checkTie()
            }
            else {
                player1name.style.color = "black"
                button.textContent = "o"
                button.disabled = true
                playerTurn = player1Name
                player2name.style.color = "white"
                checkWinner()
                checkTie()
            }
        })
    })

    function checkWinner() {
        winPatterns.forEach((pattern) => {
            let positionOne = buttons[pattern[0]].textContent
            let positionTwo = buttons[pattern[1]].textContent
            let positionThree = buttons[pattern[2]].textContent
            if (positionOne !== "" && positionTwo !== "" && positionThree !== "") {
                if (positionOne == positionTwo && positionTwo == positionThree) {
                    if (positionOne == "x") {
                        theWinnerIs.textContent = player1Name
                        player1WinCount.innerText = ++playerOneWinCount
                        player2LossCount.innerText = ++playerTwoLossCount
                        showWinner()
                    }
                    else {
                        theWinnerIs.textContent = player2Name
                        player2WinCount.innerText = ++playerTwoWinCount
                        player1LossCount.innerText = ++playerOneLossCount
                        showWinner()
                    }
                }
            }
        })
    }

    function checkTie() {
        let allFilled = true
        buttons.forEach((button) => {
            if (button.textContent === "") {
                allFilled = false;
            }
        })
        if (allFilled && !tieNotification.classList.contains("active") && !winNotification.classList.contains("active")) {
            tieNotification.classList.add("active")
        }
    }

    function showWinner() {
        winNotification.classList.add("active")
    }

    playAgain.addEventListener("click", () => {
        buttons.forEach((text) => {
            text.textContent = ""
            text.disabled = false
            winNotification.classList.remove("active")
        })
    })

    resetButton.addEventListener("click", () => {
        buttons.forEach((text) => {
            text.textContent = ""
            text.disabled = false
            winNotification.classList.remove("active")
        })
    })

    tiePlayAgain.addEventListener("click", () => {
        buttons.forEach((text) => {
            text.textContent = ""
            text.disabled = false
            winNotification.classList.remove("active")
            tieNotification.classList.remove("active")
        })
    })
})