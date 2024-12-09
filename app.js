const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "I don't know :(", correct: false },
    ],
  },
  {
    question: "Who is making the Web standards?",
    answers: [
      { text: "Mozilla", correct: false },
      { text: "Microsoft", correct: false },
      { text: "Google", correct: false },
      { text: "The World Wide Web Consortium", correct: true },
    ],
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    answers: [
      { text: "h6", correct: false },
      { text: "heading", correct: false },
      { text: "head", correct: false },
      { text: "h1", correct: true },
    ],
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    answers: [
      { text: "break", correct: false },
      { text: "br", correct: true },
      { text: "lb", correct: false },
      { text: "endl", correct: false },
    ],
  },
  {
    question: "Choose the correct HTML element to define important text",
    answers: [
      { text: "i", correct: false },
      { text: "strong", correct: true },
      { text: "important", correct: false },
      { text: "b", correct: false },
    ],
  },
  {
    question: "Choose the correct HTML element to define emphasized text",
    answers: [
      { text: "italic", correct: false },
      { text: "em", correct: true },
      { text: "i", correct: false },
      { text: "bold", correct: false },
    ],
  },
  {
    question: "What is the correct HTML for creating a hyperlink?",
    answers: [
      { text: "a name='link'>Site", correct: false },
      { text: "a href='link'>Site", correct: true },
      { text: "a url='link'>Site", correct: false },
      { text: "link", correct: false },
    ],
  },
  {
    question: "How can you make a numbered list?",
    answers: [
      { text: "list", correct: false },
      { text: "dl", correct: false },
      { text: "ol", correct: true },
      { text: "ul", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
