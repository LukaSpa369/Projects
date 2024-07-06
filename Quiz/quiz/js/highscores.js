const highScoresList = document.querySelector('#highScoresList')
const highscores = JSON.parse(localStorage.getItem('highscores')) || []

highScoresList.innerHTML = highscores.map( sc => {
    return `<li>${sc.name} - ${sc.score}</li>`
}).join('')