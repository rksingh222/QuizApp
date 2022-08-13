const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questioncounter");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressbarfull");
const spinner = document.getElementById("spinner");
const game = document.getElementById("game");
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let currentQuestion = {};
let acceptingAnswers = false;

let questions = [];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple").then(
    res => {
        return res.json();
    }).then((loadedQuestions) => {
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question : loadedQuestion.question
            };
            //formattedQuestion["question"] = loadedQuestion.question;
            const answers = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answers.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

            answers.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });
           
            console.log(formattedQuestion);
            return formattedQuestion;
        });
        console.log(question);
        console.log(questions);
        
        startgame();
    }
    );
/*fetch("questions.json").then(
    res => {
        return res.json();
    }).then(
        loadedquestions => {
            console.log(loadedquestions);
            questions = loadedquestions;
            console.log("question");
            console.log(questions);
            startgame();
        }
    );*/

startgame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);

    getNewQuestion();
    game.classList.remove("hidden");
    spinner.classList.add("hidden")
};

getNewQuestion = () => {

    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostrecentscore", score);
        return window.location.assign("end.html");
    }

    questionCounter++;
    console.log("question counter");
    console.log(questionCounter);
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    /*let xyz = ((questionCounter/MAX_QUESTIONS)*100);
    progressBarFull.style.width = xyz.toString() + "%";*/

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];
            console.log(selectedAnswer);
            const classToApply = (selectedAnswer == currentQuestion.answer) ? "correct" : "incorrect";
            selectedChoice.parentElement.classList.add(classToApply);

            if (classToApply == "correct") {
                incrementScore(CORRECT_BONUS);
            }
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);

        });
    });
};

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

