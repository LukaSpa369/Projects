const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choices-text'))
console.log(choices);
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')
const loader = document.querySelector('#loader')
const game = document.querySelector('#game')

let currentQuestions = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []
let questions = []

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
.then(x => x.json())
.then(loadedQuestionObj => {
    questions = loadedQuestionObj.results.map(element => {
        //console.log(element)
        const formattedQuestion = {
            question: element.question
        }
        const answerChoices = [...element.incorrect_answers]
        //console.log(answerChoices);
        formattedQuestion.answer = Math.floor(Math.random()*4) + 1
        answerChoices.splice(formattedQuestion.answer - 1,0,element.correct_answer)
        // console.log(answerChoices);
        answerChoices.map((choice,index)=>{
            formattedQuestion[`choice${index+1}`] = choice
        })
        // console.log(formattedQuestion);
        return formattedQuestion
    })

    startGame()
})


const CORRECT_BONUS = 10
const MAX_QUESTIONS = 5

const startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    game.classList.remove('hidden')
    loader.classList.add('hidden')
}

const getNewQuestion = () => {
    if(availableQuestions === 0 || questionCounter>=MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('end.html')
    }
    questionCounter++

    progressText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`
    const questionIndex = Math.floor(Math.random()*availableQuestions.length)

    currentQuestions = availableQuestions[questionIndex]
    //question.innerHTML =
    console.log(currentQuestions);

    question.innerHTML = currentQuestions.question

    choices.map(ch => {
        console.log(ch)
        const br = ch.getAttribute('data-number')
        ch.innerHTML = currentQuestions[`choice${br}`]
    })

    availableQuestions.splice(questionIndex,1)
    acceptingAnswers = true
}

choices.map(choice => {
    choice.addEventListener('click', e => {
        console.log(e.target);
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target

        const selectedAnswer = selectedChoice.dataset['number']

        const classToApply = selectedAnswer == currentQuestions.answer 
        ? 'correct' 
        : 'incorrect'

        if(classToApply == 'correct'){
            incrementScore(CORRECT_BONUS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)

    })
})

const incrementScore = number => {
    score += number
    scoreText.innerHTML = score
}



