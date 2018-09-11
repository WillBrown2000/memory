// initialize variables

var count = 0
var firstCard = null
var secondCard = null
var turn = 0
var turnElement = document.getElementsByClassName('moves')[0]
var matches = 0
var listOfItems = ['fa fa-diamond',
                   'fa fa-paper-plane-o',
                   'fa fa-anchor',
                   'fa fa-bolt',
                   'fa fa-cube',
                   'fa fa-car',
                   'fa fa-leaf',
                   'fa fa-bicycle',
                   'fa fa-diamond',
                   'fa fa-paper-plane-o',
                   'fa fa-anchor',
                   'fa fa-bolt',
                   'fa fa-cube',
                   'fa fa-car',
                   'fa fa-leaf',
                   'fa fa-bicycle'
                 ]
var fragment = document.createDocumentFragment()
var htmlListItems = document.getElementById('board')
var allCards;
var resetButton = document.getElementsByClassName('restart')[0]
var resetButtonEnd = document.getElementsByClassName('restart')[1]
var starsElement = document.getElementsByClassName('fa-star')
var timer = 0
var timerElement = document.getElementsByClassName('timer')[0]
var timerId;
var modalElement = document.getElementById('modal')
var endTimeElement = document.getElementById('elapsed-time')
console.log('starsElement: ', starsElement)
/*
 * Create a list that holds all of your cards
 */

 // setupElements

let resetGame = () => {
  let cards = document.getElementsByClassName('card')
  console.log('timerId here: ', timerId)
  clearInterval(timerId)
  modalElement.style.display = 'none'

  console.log('cards length: ',cards.length)
  for (let i = cards.length-1; i > -1; i--) {  //loop this way to get around glitch with appending elements to fragment

        console.log('card being removed: ',cards[i])
        console.log('parentNode: ', cards[i].parentNode)
        cards[i].parentNode.removeChild(cards[i])

    }

  console.log('cards remaining: ',cards)

  startGame()

}

let startTimer = () => {
  timerId = setInterval( () => {
    timer++
    timerElement.innerText = timer

  }, 1000)

  console.log('startId ', timerId)
}

let startGame = () => {

  //reinitalize start variables

  matches = 0
  turn = 0
  firstCard = null
  secondCard = null
  starsElement[0].setAttribute('class', 'fa fa-star gold')
  starsElement[1].setAttribute('class', 'fa fa-star gold')
  starsElement[2].setAttribute('class', 'fa fa-star gold')
  starsElement[3].setAttribute('class', 'fa fa-star')
  starsElement[4].setAttribute('class', 'fa fa-star')
  starsElement[5].setAttribute('class', 'fa fa-star')
  timer = 0
  turnElement.innerText = 0
  timerElement.innerText = 0


shuffle(listOfItems).forEach( (item) => {

  let li = document.createElement('li')
  let i = document.createElement('i')
  li.appendChild(i)

  li.className = 'card'
  li.firstElementChild.className = item

  fragment.appendChild(li)

})

htmlListItems.appendChild(fragment)
setupCards()

}




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let setupCards = () => {setTimeout( () => {

    allCards = document.getElementsByClassName('card')
    console.log('allCards', allCards)
    for (card of allCards) {

      card.onclick = (event) => { flip(event) }
    }

  }, 0);
}


let matchCards = (cardOne, cardTwo) => {

  if (cardOne.firstElementChild.className === cardTwo.firstElementChild.className) {

    cardOne.className = 'card match'
    cardTwo.className = 'card match'

  }

}

let checkMatch = (cardOne, cardTwo) => {

  setTimeout( () => {

    if (firstCard.firstElementChild.className === secondCard.firstElementChild.className) {

      firstCard.className = 'card open match'
      secondCard.className = 'card open match'

      matches++

    }
    else {

        firstCard.className = 'card'
        secondCard.className = 'card'

    }

    firstCard = null
    secondCard = null
    console.log('matches: ', matches)

    if (matches === 8) {

      clearInterval(timerId)

        if (turn < 22) {
          starsElement[3].setAttribute('class', 'fa fa-star gold')
          starsElement[4].setAttribute('class', 'fa fa-star gold')
          starsElement[5].setAttribute('class', 'fa fa-star gold')
        }
        if (turn < 30) {
          starsElement[3].setAttribute('class', 'fa fa-star gold')
          starsElement[4].setAttribute('class', 'fa fa-star gold')
        }
        if (turn > 35) {
          starsElement[3].setAttribute('class', 'fa fa-star gold')
        }
      modalElement.style.display = 'block'
      endTimeElement.innerText = timer;


    }
  },500)

}


let setCards = (card) => {

    if (firstCard === card || card.className === 'card open match') return false //user clicked on same card 2x
    if (firstCard === null) { firstCard = card }
      else { secondCard = card }

    return true

}

let openCard = (card) => {

  if (card.className === 'card') {
    card.className = 'card open show'
  }
}

let setTurn = () => {

  if (count === 1) {
    turn++
    count = 0;
    turnElement.innerText = turn
  }
    else {count++}

  switch (turn) {

    case 0:
      startTimer()
      break
    case 22:
      starsElement[2].setAttribute('class', 'fa fa-star')
      break
    case 30:
      starsElement[1].setAttribute('class', 'fa fa-star')
      break
    case 35:
      starsElement[0].setAttribute('class', 'fa fa-star')

  }

}

let flip = ({target}) => {

  let card = target.firstElementChild === null ? target.parentElement : target
   // ^ set card correctly if user clicks in the middle of the card.
  if (setCards(card) === false) return
  openCard(card)
  setTurn()

  if (firstCard != null && secondCard != null) {checkMatch(firstCard, secondCard)}

  console.log('cardOne: ', firstCard)
  console.log('cardTwo: ', secondCard)
  console.log('count: ', count)
  }




console.log('turnElement, ', turnElement)

startGame()



resetButton.onclick = resetGame

resetButtonEnd.onclick = resetGame
