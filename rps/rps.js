const CHOICE = ['rock', 'paper', 'scissors']
const pScore = document.getElementById('p-score')
const cScore = document.getElementById('c-score')
const pChoice = document.getElementById('player-choice')
const cChoice = document.getElementById('computer-choice')
const winner = document.getElementById('winner')
const rounds = document.getElementById('rounds')
const images = document.querySelectorAll('img')
const cta = document.querySelector('.calltoaction')
const container = document.querySelector('.flex-cont')

let roundsPlayed = 1;

let score = {
    'p-score': 0,
    'c-score': 0
}

function reset() {
    score = {
        'p-score': 0,
        'c-score': 0
    }
    roundsPlayed = 0;
    clearText = [pScore, cScore, pChoice, cChoice, winner, rounds]
    for (elem of clearText) {
        elem.textContent = ''
    }

    cta.setAttribute('style', 'display: block;')
    pScore.textContent = cScore.textContent = winner.textContent = rounds.textContent = cChoice.textContent = ''
    pChoice.textContent = ''
    cta.textContent = 'Make your choice!'
}

function getComputerChoice() {
    const index = Math.floor(Math.random() * CHOICE.length);
    cChoice.textContent = `Computer chose ${CHOICE[index]}`
    return CHOICE[index];
}

function rps_round(playerSelection, computerSelection, curScore) {

    cta.setAttribute('style', 'display: none;');

    rounds.textContent = `Round ${roundsPlayed}`

    if (playerSelection== computerSelection) {
        winner.textContent = "it's a tie"
    }
    else if ((playerSelection === 'rock' && computerSelection === 'scissors') ||
             (playerSelection === 'paper' && computerSelection === 'rock') ||
             (playerSelection === 'scissors' && computerSelection === 'paper')) {
        
        winner.textContent = "You win!"
        curScore['p-score']++
    }
    else {
        winner.textContent = "Computer wins!"
        curScore['c-score']++
    }
    pScore.textContent = `Player: ${curScore['p-score']}`
    cScore.textContent = `Computer: ${curScore['c-score']}`
    score = curScore
    roundsPlayed ++

    if ((score["c-score"] == 5) || (score["p-score"] == 5)) {
        if (score['c-score'] > score['p-score']) {
            var gameover = new CustomEvent('gameover', {detail: 'computer'})
        } else {
            var gameover = new CustomEvent('gameover', {detail: 'player'})
        }
        reset()
        winner.dispatchEvent(gameover)
    }

}


const rockBtn = document.querySelector('#rock img')
const paperBtn = document.querySelector('#paper img')
const scissorsBtn = document.querySelector('#scissors img')

rockBtn.addEventListener('click', () => {
    pChoice.textContent = 'You chose rock'
    rps_round('rock', getComputerChoice(), score)
})

paperBtn.addEventListener('click', () => {
    pChoice.textContent = 'You chose paper'
    rps_round('paper', getComputerChoice(), score)
})

scissorsBtn.addEventListener('click', () => {
    pChoice.textContent = 'You chose scissors'
    rps_round('scissors', getComputerChoice(), score)
})

winner.addEventListener('gameover', function handler(e) {
    if (e.detail == 'player') {
        alert('player wins!')
    } else {
        console.log(e.detail)
        alert('computer wins!')
    }
})