const { NO_CARDS, ONE_CARD } = require('./consts')
const Card = require('./Card')
const { randomNegPos } = require('./utils')

class Board {
  constructor(size, cardsArray) {
    this._size = size
    this._cardsArray = cardsArray
    this._board = []
    this._guesses = 0
    this._score = 0
    this._openCard = null

    this._currentNumberOfMatches = 0
    this._allMatchesSize = size / 2
    this.openCards = [null, null]
  }

  get score() {
    this.calculateScore()
    return  this._score <= 0 ? 0 : this._score
  }

  get guesses() {
    return this._guesses
  }

  get board() {
    return this._board
  }

  flipCard(position) {
    // ignore card if clicked more than once
    
    
    
    if (this._board.find(card => card.dataIndex === position).isOpen) {
      
      return
    } 

    
    this._board.find(card => card.dataIndex === position).flip()
    
    if (this.openCards[0] === null) {
      this.openCards[0] = this.board.find(card => card.dataIndex === position)
    } else if (this.openCards[1] === null) {
      this.openCards[1] = this.board.find(card => card.dataIndex === position)
    }
    
    return true
  }

  checkMatch() {
    // if openCards is not full, return false
    if (this.openCards[1] === null) return false

    // if openCards is full:
    //  1. check if equal
    this._guesses++
    if (this.openCards[0].equals(this.openCards[1])) {
      this.openCards[0].matched = true
      this.openCards[1].matched = true
      this.openCards.fill(null)
      return true
    }
    this.openCards[0].flip()
    this.openCards[1].flip()
    this.openCards.fill(null)
    return false
    //      if equal -> match (return true), else flip both and return false 
  }

  fillBoard() {
    let index = 0
    while (this._board.length < this._size) {
      for (let card of this._cardsArray) {
        this._board.push(new Card(card.id, card.url))
        this._board.push(new Card(card.id, card.url))
        if (this._board.length === this._size) {
          break
        }
      }
    }
    this._shuffle()
    this._board.forEach((card, index) => card.dataIndex = index)
    
  }

  calculateScore() {
    let matches = 0
    for(let card of this._board) {
      if(card.matched) matches++
    }
    this._score = this._size * (matches / 2) - this._guesses
  }

  isGameWin() {
    if (this._board.every(card => card.matched)) {
      this.onWin()
    }
  }

  isMatch(card) {

    // check if there is an open card, if not, then set then opened first card
    if (this.openCards[0] === null) {
      
      this.openCards[0] = card
      
      // return 
    } else { // atleast one card is opened
      
      this._guesses++
      const openedCard = this.openCards[0]
      if (openedCard.id === card.id) {  // check if current cards id is the same as the open card
        this._currentNumberOfMatches++
        if (this._currentNumberOfMatches === this._allMatchesSize) {  //check if the game is won
          this.onWin()
        }
      } else {  // no match, and reset open card state
        this.openCards.fill(null)
      }
    }
  }

  _shuffle() {
    this._board.sort(randomNegPos) // Fisher-Yates Algorithm for unbiased permutation
  }
}

module.exports = Board