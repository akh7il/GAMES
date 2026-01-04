const API_URL = "https://opentdb.com/api.php?amount=10&category=21&type=multiple"
let showQuestions = document.getElementById("show_questions")
let options = document.querySelectorAll(".options")
const reset = document.getElementById("reset")
let score = 0
let highScoreIs
let showCurrentScore = document.getElementById("current_score")
let showHighScore = document.getElementById("high_score")
let questionNumber = 0
let questions
let optionsAre = []

if (!localStorage.getItem("GAMEON")) {
    localStorage.setItem("GAMEON", JSON.stringify({ HIGHSCORE: { SPORTIQ: 0 } }));
}
let gameData = JSON.parse(localStorage.getItem("GAMEON"));
if (!gameData.HIGHSCORE) gameData.HIGHSCORE = { SPORTIQ: 0 };
if (gameData.HIGHSCORE.SPORTIQ === undefined) gameData.HIGHSCORE.SPORTIQ = 0;
localStorage.setItem("GAMEON", JSON.stringify(gameData));
let highScore = gameData.HIGHSCORE.SPORTIQ;
showHighScore.textContent = highScore;


window.addEventListener("load", fetchQuestions)

async function fetchQuestions() {
    try {
        let result = await fetch(API_URL)
        let resultIs = await result.json()
        questions = resultIs.results
        reset.textContent = "reset"
        displayQuestions()
    }
    catch {
        showQuestions.textContent = "oops!\nfailed to load questions try again"
        options.forEach((option) => { option.textContent = "-" })
        reset.textContent = "refresh"
    }
}

function displayQuestions() {

    if (questionNumber === 10) {
        fetchQuestions()
    }
    else {
        nextQuestion()

        showQuestions.textContent = questions[questionNumber].question

        let currectAnswer = questions[questionNumber].correct_answer
        let wrongAnswer = questions[questionNumber].incorrect_answers

        optionsAre = [...wrongAnswer, currectAnswer]

        for (let i = optionsAre.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
                ;[optionsAre[i], optionsAre[j]] = [optionsAre[j], optionsAre[i]]
        }

        options.forEach((option, index) => {
            option.textContent = optionsAre[index]
            option.disabled = false
            option.style.background = ""
            option.style.color = ""
        })
    }
}

options.forEach((option) => {
    option.addEventListener("click", () => {
        let answer = questions[questionNumber].correct_answer
        options.forEach(opt => opt.disabled = true)
        if (option.textContent === answer) {
            option.style.background = "green"
            option.style.color = "#fff"
            score++
            showCurrentScore.textContent = score
            highScoreIs = score
            if (score > highScore) {
                let scores = JSON.parse(localStorage.getItem("highscore"))
                scores.SPORTIQ = score
                localStorage.setItem("highscore", JSON.stringify(scores))

            }
            setTimeout(() => {
                questionNumber++
                displayQuestions()
            }, 1000)
        } else {
            option.style.background = "red"
            option.style.color = "#fff"
            showQuestions.style.color = "#4d0000ff"
            if (score > highScore) {
                gameData.HIGHSCORE.SPORTIQ = score
                localStorage.setItem("GAMEON", JSON.stringify(gameData))
                showQuestions.textContent = "wrong answer !\n you lost your streak new high score is - " + highScore
                showHighScore.textContent = highScore
            }
            else {
                showQuestions.textContent = "wrong answer !\n you lost your streak"
            }

        }
    })
})

function nextQuestion() {
    showQuestions.textContent = ""
    showQuestions.style.color = ""
    options.forEach((option) => {
        option.style.color = ""
        option.style.background = ""
    })
}

reset.addEventListener("click", () => {
    questionNumber = 0
    score = 0
    showCurrentScore.textContent = 0
    fetchQuestions()
})