const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }
  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual a capital do Brasil ?",
    answers: [
      { text: "Belo Horizonte", correct: false },
      { text: "Sao Paulo", correct: false },
      { text: "Brasilia", correct: true },
      { text: "Rio de Janeiro", correct: false }
    ]
  },
  {
    question: "Qual desses numeros e primo ?",
    answers: [
      { text: "3", correct: true },
      { text: "6", correct: false },
      { text: "10", correct: false },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Qual a data comemora a independencia do Brasil ?",
    answers: [
      { text: "7 de setembro", correct: true },
      { text: "12 de novembro", correct: false },
      { text: "15 de novembro", correct: false },
      { text: "25 de dezembro", correct: false }
    ]
  },
  {
    question: "O Brasil foi descoberto por Cristovao Colombo",
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: "quantos dias sao nescessarios para terra orbiar o sol ?",
    answers: [
      { text: "380 dias", correct: false },
      { text: "365 dias", correct: true },
      { text: "335 dias", correct: false },
      { text: "300 dias", correct: false }
    ]
  },
  {
    question: "Quantos estados tem o Brasil contando o destrito federal ?",
    answers: [
      { text: "30", correct: false },
      { text: "27", correct: true },
      { text: "25", correct: false },
      { text: "29", correct: false }
    ]
  },
  {
    question: "qual a materia prima para fabricaçao do plastico",
    answers: [
      { text: "madeira", correct: false },
      { text: "areia", correct: false },
      { text: "niobio", correct: false },
      { text: "derivados do petroleo", correct: true },
    ]
  },
]