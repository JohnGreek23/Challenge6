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
let timerInterval; // Variable to hold the timer interval

// Event listener for starting the quiz
startButton.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  timerElement.textContent = timeLeft;
  startTimer();
  // Remove the "hide" class from the questions div to display it
  document.getElementById("questions").classList.remove("hide");
  showNextQuestion(); // Updated to show the first question
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0 || currentQuestionIndex >= window.questions.length) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Function to display the next question
function showNextQuestion() {
  if (currentQuestionIndex < window.questions.length) {
    const question = window.questions[currentQuestionIndex];
    questionTitleElement.textContent = question.question;
    choicesElement.innerHTML = "";

    question.choices.forEach((choice, index) => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", () => checkAnswer(index));
      choicesElement.appendChild(choiceButton);
    });
  } else {
    endQuiz();
  }
}

// Function to check the user's answer
function checkAnswer(selectedIndex) {
  const question = window.questions[currentQuestionIndex];

  if (question.correctIndex === selectedIndex) {
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = "Wrong!";
    timeLeft -= 10; // Penalty for incorrect answer
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < window.questions.length) {
    showNextQuestion();
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
