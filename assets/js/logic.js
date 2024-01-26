// Import the questions array from questions.js
import questions from './questions.js';

const startButton = document.getElementById("start");
const timerElement = document.getElementById("time");
const questionTitleElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const endScreenElement = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
let currentQuestionIndex = 0;
let timeLeft = 60; // Set the initial time

// Event listener for starting the quiz
startButton.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  timerElement.textContent = timeLeft;
  startTimer();
  showQuestion();
}

// Function to start the timer
function startTimer() {
  const timerInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Function to display a question
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionTitleElement.textContent = question.question;
  choicesElement.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", () => checkAnswer(index));
    choicesElement.appendChild(choiceButton);
  });
}

// Function to check the user's answer
function checkAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];

  if (question.correctIndex === selectedIndex) {
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = "Wrong!";
    timeLeft -= 10; // Penalty for incorrect answer
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  endScreenElement.style.display = "block";
  finalScoreElement.textContent = timeLeft;
}

// Event listener for submitting high score
submitButton.addEventListener("click", saveHighScore);

// Function to save high score
function saveHighScore() {
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    // Save the initials and score to localStorage or another storage method
    // Display high scores
  }
}
