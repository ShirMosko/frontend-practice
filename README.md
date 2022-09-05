# Memory Game - Part 1

Classes  
1. Board

Create a Memory board using the Board class

### Technologies
JSON server to fetch the cards from.

## Board

### Attributes

1. `board` - Array - represents the board.

2. `score` - Number - represents the score of the current game.

3. `guesses` - Number - represents the number of guesses.

4. `cardsArray` - Array - holds an array of the card ids.

5. `openCard` - Object - holds the index and the id of the current open card.

6. `size` - Number - the size of the board, representing the number of cards.


### Methods

1. `constructor(size, cardsArr)` - create a new Board Object of size `size` 

2. `fillBoard()` - fills the board with the cards array

3. `calculateScore` - calculates the score after each move.

4. *`_isGameWin()` - returns true if no cards are left on the board.

5. `_isMatch(card)` - returns true if both cards are the same and marks the cards as matched in the cardsArr

6. `shuffle()` - shuffles cards before inserting to board


#### Getters
1. `board` - returns the board  

2. `score` - returns the score of the current game

3. `size` - returns the length of the board

#### Setters - N/A


### Events

`onMatch` - occurs when a pair of cards have been matched.

`onWin` - occurs when all the cards have been matched.

`onMiss` - occurs when a pair of cards have been miss-matched


# Memory Game - Part 2

Write the `index.js` file:
- When new game button is clicked:
  * fetch cards from server cards array
  * create a new board
  * reset timer, scoreboard, guesses
  * render the board
  
- `renderBoard()` - render the board as a css grid and hook `Board`.
  * set handles for each card on the board.
    * handler for the events of the board.
    * handler `flipCard` card 
    * `onMatch()` - sets matched cards to zero and changes display of matched cards to none.
    * `onGameOver` - opens GameOver Modal and resets, timer.
    * `onGameWin` - opens modal and displays current score.
  