const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')

const mostRecentScore = localStorage.getItem('mostRecentScore')

const highscores = JSON.parse(localStorage.getItem('highscores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerHTML = mostRecentScore

username.addEventListener('keyup', e => {
    saveScoreBtn.disabled = !username.value
})

const saveHighScore = e => {
    e.preventDefault()
    console.log(e)

    const scoreObj = {
        name: username.value,
        score: mostRecentScore
    }

    highscores.push(scoreObj)
    highscores.sort((a,b) => b.score - a.score)
    highscores.splice(MAX_HIGH_SCORES)
    localStorage.setItem('highscores',JSON.stringify(highscores))
    window.location.assign('index.html')
}