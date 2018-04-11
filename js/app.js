// Initializing the variables.

let minutes = 00,
    seconds = 00,
    addSeconds = document.getElementById("seconds"),
    addMinutes = document.getElementById("minutes"),
    startButton = document.getElementById("start"),
    pauseButton = document.getElementById("pause"),
    gameArea = document.getElementById("area-of-game"),
    card = document.getElementsByClassName("card"),
    cards = [...card], // put the html collection in the Array
    clickedCards = [], // store the value of clicked Cards, which will be always [0, 1]
    drawingOfTheCard = document.getElementsByClassName(".card fas"),
    moves = 0,
    movesCounter = document.getElementById("move"),
    pairToFind = 8, // because 16 cards.
    drawingOfTheCards = [...drawingOfTheCard],
    Interval;

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Initiate the game

startButton.onclick = function startGame() {
  startButton.innerHTML = "Reset the Game"; // I was thinking about a reset button but I think this is more intuitive to just change start dynamically
  // mix the deck by calling the shuffle function
  shuffle(cards);
  clearInterval(Interval); // https://www.w3schools.com/jsref/met_win_clearinterval.asp
  pairToFind = 8;
  Interval = setInterval(startTimer, 1000); // start the timer, 1000 = 1 second
  seconds = "00";
  minutes = "00";
  addSeconds.innerHTML = seconds;
  addMinutes.innerHTML = minutes;
    for (card of cards) { // looping over our 16 cards
      gameArea.innerHTML = ""; // empty the board / area of the game
      [].forEach.call(cards, function(inject) { // tweak from: Learn HTML5 and JavaScript for Android p.98
        gameArea.appendChild(inject); // inject the array in the <li>
    });
  }
}

for (card of cards) {
  card.onclick = function cardsWaitingToBeCompared() {  // when a card is clicked on, it calls the function cardsWaitingToBeCompared
  this.classList.toggle("flip");// use of "this." otherwise, when I click on a card, another one get flipped.
  clickedCards.push(this); // which store the clicked card in the clickedCards array

    if (clickedCards.length === 2 && clickedCards[0].innerHTML === clickedCards[1].innerHTML) { // Once two cards are clicked trigger the below actions
      countAMove();
      match();
    } else { // remove the flip
      countAMove();
      notMatched();
    }
    clickedCards = [];    // important as otherwise the clickedCards.length does not reset and go over 2 and countAMove & notMatched() are not triggered
    }
  }
}

  // pause button and what it does
pauseButton.onclick = function() {
  clearInterval(Interval); // pause the timer
  alert("You can come back later, the time has stopped!"); // when window is left, timer start again
  Interval = setInterval(startTimer, 1000)
}

function startTimer () {
  seconds++;

  if(seconds < 10){
    addSeconds.innerHTML = "0" + seconds; // if seconds is inferior to 10 add a 0 in front --> so
  }

  if (seconds > 9){
    addSeconds.innerHTML = seconds; // remove the 0 as it will be replaced by the tenths
  }

  if (seconds > 59) { // once 60 seconds is reached, a minute is added
    minutes++;
    addMinutes.innerHTML = "0" + minutes; // preceded by a 0, otherwise it is ugly
    seconds = 0; // seconds is reset
    addSeconds.innerHTML = "0" + seconds;
  }

  if (minutes > 9){
    addMinutes.innerHTML = minutes;
  }
// no encoding for hours because most of the user will finish before an hour, I might add a rule to loose the game if over 10 mins
}

function countAMove() {
  moves++;
  movesCounter.innerHTML = moves;
}

function endGame() {
  if (pairToFind === 0) {
    console.log("The game ends open a Windows to show the stats and ask if he wants to reset");
  }
  return false;
}

function match() {
  clickedCards[0].classList.toggle("matched"); // to trigger matched. otherwise, it's half done animation.
  clickedCards[1].classList.toggle("matched");
  pairToFind--;
  endGame();
}

function notMatched() {
  clickedCards[0].classList.toggle("not-matched");
  clickedCards[1].classList.toggle("not-matched");
}
