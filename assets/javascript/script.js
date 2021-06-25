const questionsArray = [
    {
        question: "1. Which HTML element tag can you put JavaScript inside?",
        a: "<javascript>",
        b: "<script>",
        c: "<js>",
        d: "<java>",
        correctAnswer: "b"
    },
    {
        question: "2. Where should the JavaScript be referenced in the HTML?",
        a: "The <head> section",
        b: "The bottom of the <body> section",
        c: "Below the <body> section",
        d: "Either the <head> or the <body> section",
        correctAnswer: "b"
    },
    {
        question: "3. How do you add a comment in JavaScript?",
        a: "// This is a comment",
        b: "<!-- This is a comment -->",
        c: "```This is a comment",
        d: "** This is a comment **",
        correctAnswer: "a"
    },
    {
        question: "4. Which of these expressions is truthy?",
        a: "3 > 5",
        b: "'eight' == 8",
        c: "'5' === 5",
        d: "1 + 1 == 2",
        correctAnswer: "d"
    },
    {
        question: "5. Which of the following is an example of a JavaScript array?",
        a: "var numbers = [1, 2, 3, 4]",
        b: "var numbers = {1, 2, 3, 4}",
        c: "var numbers = (1, 2, 3, 4)",
        d: "var numbers = <1, 2, 3, 4>",
        correctAnswer: "a"
    }
];

const mainDiv = document.querySelector("main");

// Questions page
const highscoresEl = document.getElementById("highscores");
const questionDiv = document.getElementById("question-div");
const questionP = document.getElementById("question");

// Score form page
const scoreForm = document.getElementById("score-form");
const span = document.getElementById("score-text");
const nameInput = document.getElementById("leaderboard-input");
const submitButton = document.getElementById("submit");

// High scores table page
const highscoresDiv = document.getElementById("highscores-div");
const tableBody = document.querySelector("tbody");
const clearButton = document.getElementById("clear-button");
const restartButton = document.getElementById("restart-button");

let index = 0;

// Timer function

let secondsLeft = 20;
function timerFunction() {
    if (secondsLeft <= 0) {
        document.getElementById("timer").innerHTML = "Time's up!";
        secondsLeft = 0;
        showEndGameForm();
    } else {
        document.getElementById("timer").innerHTML = `Time left: ${secondsLeft}`;
        secondsLeft -= 1;
    }
}

// Stop timer at end of game

function stopTimer() {
    window.clearInterval(timer);  
    document.getElementById("timer").innerHTML = `Time left: ${secondsLeft}`;
}

var timer = setInterval(timerFunction, 1000);

// Determine if button clicked was correct answer or not

function clickButton() {
    const currentQuestion = questionsArray[index];
    if (index == questionsArray.length - 1 && this.classList.contains(currentQuestion.correctAnswer)) {
        showEndGameForm();
    } else if (this.classList.contains(currentQuestion.correctAnswer)) {
        secondsLeft += 10;
        index++;
        displayQuestion();
    } else {
        secondsLeft -= 5;
    }
}

// Function to automate creation of buttons

function createButton(currentQuestion, prop) {
    const button = document.createElement("button");
    button.textContent = currentQuestion[prop];
    button.setAttribute("class", prop);
    button.addEventListener('click', clickButton);
    return button;
}

// Function to display question in questionDiv

function displayQuestion() {
    questionDiv.textContent = "";
    const currentQuestion = questionsArray[index];
    questionP.textContent = currentQuestion.question;
    const buttons = [
        createButton(currentQuestion, "a"),
        createButton(currentQuestion, "b"),
        createButton(currentQuestion, "c"),
        createButton(currentQuestion, "d")
    ];
    questionDiv.append(...buttons);
}

// Show the form to submit your score

function showEndGameForm() {
    stopTimer();
    span.textContent = secondsLeft;  
    scoreForm.classList.remove("hidden");
    questionDiv.textContent = "";
    questionP.textContent = "";
}

// Get scores from local storage

function getHighscores() {
    const scores = localStorage.getItem("scores");
    if(!scores) {
        return [];
    }
    const scoresParsed = JSON.parse(scores);
    return scoresParsed;
}

// Add score to local storage

function addHighscore(newScore) {
    const scores = getHighscores();
    scores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(scores));
}

// Constructor function to create score objects

function Score(name, score) {
    this.name = name,
    this.score = score
}

// Displays high scores in highscore table 

function createScoreEntry(newScore, prop) {
    let td = document.createElement("td");
    td.textContent = newScore[prop];
    return td;
}


function displayHighscores() {
    const scores = getHighscores();
    tableBody.textContent = "";
    highscoresDiv.classList.remove("hidden");
    for (let i = 0; i < scores.length; i++) {
        let scoreEntry = document.createElement("tr");
        tableBody.appendChild(scoreEntry);
        const newScore = scores[i];
        const entries = [
            createScoreEntry(newScore, "name"),
            createScoreEntry(newScore, "score")
        ];
        // Turns entries array into comma separated values
        scoreEntry.append(...entries);
    }
}

// Creates new score object based on current time left and name entered

function createNewScore(event) {
    event.preventDefault();
    // If no name input, send error message
    if (!nameInput.value) {
        alert("Please enter your name!");
        return;
    };
    // Otherwise, add new score
    const name = nameInput.value.trim();
    const newScore = new Score(name, secondsLeft);
    addHighscore(newScore);

    scoreForm.classList.add("hidden");
    displayHighscores();
}

// Displays high scores when you click the high score button

function viewScores() {
    questionDiv.textContent = "";
    questionP.textContent = "";
    stopTimer();
    displayHighscores();
}

// Delete button for high scores

function clearHighscores() {
    localStorage.clear();
    displayHighscores();
}

// Restart game

function restartGame() {
    secondsLeft = 20;
    index = 0;
    timer = setInterval(timerFunction, 1000);
    scoreForm.classList.add("hidden");
    highscoresDiv.classList.add("hidden");
    displayQuestion();
}

displayQuestion();

highscoresEl.addEventListener("click", viewScores);
submitButton.addEventListener("click", createNewScore);
clearButton.addEventListener("click", clearHighscores);
restartButton.addEventListener("click", restartGame);