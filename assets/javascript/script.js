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
const questionDiv = document.getElementById("question-div");
const questionP = document.getElementById("question");

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

function showEndGameForm() {
    mainDiv.textContent = "";

    const h1 = document.createElement("h1");
    h1.textContent = "Well done!"
    const p = document.createElement("p");
    p.textContent = `Your final score is: ${secondsLeft}`;
    mainDiv.append(h1, p);
}

displayQuestion();

