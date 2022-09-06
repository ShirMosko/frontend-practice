const Board = require('./Board')
const Card = require('./Card')
const { CARDS_URL, CARDS, MIN_CARDS, SHORT_DELAY, LONG_DELAY, DELAY, NO_CARDS, ONE_CARD} = require('./consts')
const { randomIntBetween } = require('./utils')

let board
let timerHandle
const cardsContainer = document.getElementById('cardsContainer')
const btnStartGame = document.getElementById('btnStartGame')
const ddLevel = document.getElementById('ddLevel')
const timeWrapper = document.getElementById('timeWrapper')
const movesWrapper = document.getElementById('movesWrapper')
const scoreWrapper = document.getElementById('scoreWrapper')

const winModal = document.getElementById('winModal')
const winScoreWrapper = document.getElementById('winScoreWrapper')
const gameOverModal = document.getElementById('gameOverModal')
const popup = document.querySelector('.popup');
const close = document.querySelector('#close');


window.onload = function(){
  debugger;
    setTimeout(function(){
        popup.style.display = "block"
    }, 2000)
}

close,addEventListener('click',()=>{
    popup.style.display = "none";
} )

document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

btnStartGame.onclick = () => {
  if(!ddLevel.value) return
  getCards()
  startTimer()
}

function flipCard() {

  const flipped = board.flipCard(parseInt(this.dataset.index))
  if (!flipped) return
  
  
  this.classList.toggle('flipped')
  const isMatch = board.checkMatch()
  if (isMatch) {
    board.onMatch()
    board.isGameWin()
  } else {
    if(board.openCards[0] === null && board.openCards[1] === null) {
      board.onMiss()
    }
  }
}

function getCards() {
  createBoard(CARDS.cards)
  // if not local and fetching from server
//   fetch(CARDS_URL, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin':'*'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     }
//   })
//     .then(response => response.json())
//     .then(json => createBoard(json))
}

function createBoard(cardsArray) {
  const numOfCards = randomIntBetween(MIN_CARDS, cardsArray.length)
  let chosenCards = cardsArray.slice(0, numOfCards)
  chosenCards = chosenCards.map(function(card) {
    return new Card(card.id, card.url)
  })
  
  board = new Board(+ddLevel.value, chosenCards)

  movesWrapper.innerHTML = board.guesses
  scoreWrapper.innerText = board.score

  board.onMatch = () => {
    let matchedArray = board.board.filter(card => card.matched)
    matchedArray.forEach(item => {
      document.querySelector(`[data-index="${item.dataIndex}"]`).removeEventListener('click', flipCard, true)
      setTimeout(function() {
        document.querySelector(`[data-index="${item.dataIndex}"]`).classList.add('matched')
      }, SHORT_DELAY)
    })
    movesWrapper.innerHTML = board.guesses
    scoreWrapper.innerHTML = board.score
    
    // board.isGameWin()
  }

  board.onMiss = () => {
    setTimeout(() => {
      let matchedArray = board.board.filter(card => !card.matched)
      matchedArray.forEach(card => {
        document.querySelector(`[data-index="${card.dataIndex}"]`).className = 'card'
      })}, DELAY)
    movesWrapper.innerHTML = board.guesses
    scoreWrapper.innerHTML = board.score
  }

  board.onWin = () => {
    clearInterval(timerHandle)
    winScoreWrapper.innerText = board.score
    winModal.style.display = 'block'
    setTimeout(() => {
      winModal.style.display = 'none'
    }, LONG_DELAY)
  }

  board.fillBoard()
  renderBoard()
}

function renderBoard() {
  const cardsContainer = document.getElementById('cardsContainer')
  cardsContainer.innerHTML = ''
  
  let cardIndex = 0
  board._board.forEach(card => {


    const currentCardElm = document.createElement('div')
    currentCardElm.classList.add('card')
    currentCardElm.dataset.id = card.id
    currentCardElm.dataset.index = cardIndex++
  
    const currentCardBack = document.createElement('div')
    currentCardBack.classList.add('back')
    currentCardBack.style.backgroundImage = `url(${card.url})`
  
    const currentCardFront = document.createElement('div')
    currentCardFront.classList.add('front')

    currentCardElm.addEventListener('click', flipCard) 
    
    currentCardElm.appendChild(currentCardBack)
    currentCardElm.appendChild(currentCardFront)

    cardsContainer.appendChild(currentCardElm)

  })
}

function gameOver() {
  gameOverModal.style.display = 'block'
  setTimeout(() => {
    cardsContainer.innerHTML = ''
    gameOverModal.style.display = 'none'
  }, LONG_DELAY)
}

function startTimer() {
  if (timerHandle) clearInterval(timerHandle)
  
  let duration = 60
  timerHandle = setInterval(() => {
    duration--
    if(duration === 0) {
      gameOver()
      clearInterval(timerHandle)
    }
    timeWrapper.innerHTML = `${duration}s`

  }, DELAY)
}