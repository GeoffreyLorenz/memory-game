// Initializing the variables.

let minutes = 00,
    seconds = 00,
    addSeconds = document.getElementById("seconds"),
    addMinutes = document.getElementById("minutes"), // All the above was linked to time
    Interval,
    // Link to click buttons
    startButton = document.getElementById("start"),
    pauseButton = document.getElementById("pause"),

    // Get the elements from the are-of-game, cards, etc
    gameArea = document.getElementById("area-of-game"),
    card = document.getElementsByClassName("card"),
    cards = [...card], // Put the html collection in the Array
    clickedCards = [], // Store the value of clicked Cards, which will be always [0, 1]
    drawingOfTheCard = document.getElementsByClassName(".card fas"),
    drawingOfTheCards = [...drawingOfTheCard],
    // Move related variables
    moves = 0,
    movesCounter = document.getElementById("move"),
    pairToFind = 8; // Because 16 cards.

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
  // Mix the deck by calling the shuffle function
  shuffle(cards);
  // Remove the cards content for people who would have started the game without click on start. Indeed, the cards would have stayed unflipped / already counted
  for (card of cards) { // Looping over our 16 cards
      gameArea.innerHTML = ""; // Empty the board / area of the game
      [].forEach.call(cards, function(inject) { // Tweak from: Learn HTML5 and JavaScript for Android p.98
        gameArea.appendChild(inject); // Inject the array in the <li>
    });
  card.classList.remove("matched", "not-matched", "flip");
  }
  // Start the timer
  clearInterval(Interval); // https://www.w3schools.com/jsref/met_win_clearinterval.asp
  Interval = setInterval(startTimer, 1000); // Start the timer, 1000 = 1 second
  seconds = "00";
  minutes = "00";
  addSeconds.innerHTML = seconds;
  addMinutes.innerHTML = minutes;
  // re/initiate move-related variables
  pairToFind = 8;
  moves = 0;
  movesCounter.innerHTML = moves;
}

// Click on a card
for (card of cards) {
  card.onclick = function cardsWaitingToBeCompared() {  // When a card is clicked on, it calls the function cardsWaitingToBeCompared
  this.classList.toggle("flip");// Use of "this." otherwise, when I click on a card, another one get flipped.
  clickedCards.push(this); // Which store the clicked card in the clickedCards array

    if (clickedCards.length === 2 && clickedCards[0].innerHTML === clickedCards[1].innerHTML) { // Once two cards are clicked trigger the below actions
      match();
    } else { // Remove the flip
      notMatched();
    }
    countAMove();
    clickedCards[0].classList.remove("flip", "not-matched");
    clickedCards[1].classList.remove("flip", "not-matched");
    clickedCards = [];    // Important as otherwise the clickedCards.length does not reset and go over 2 and countAMove & notMatched() are not triggered
    }
  }

  // Pause button and what it does
pauseButton.onclick = function() {
  clearInterval(Interval); // Pause the timer
  alert("You can come back later, the time has stopped!"); // When window is left, timer start again
  Interval = setInterval(startTimer, 1000)
}

function startTimer () {
  seconds++;

  if(seconds < 10){
    addSeconds.innerHTML = "0" + seconds; // If seconds is inferior to 10 add a 0 in front --> so
  }

  if (seconds > 9){
    addSeconds.innerHTML = seconds; // Remove the 0 as it will be replaced by the tenths
  }

  if (seconds > 59) { // Once 60 seconds is reached, a minute is added
    minutes++;
    addMinutes.innerHTML = "0" + minutes; // Preceded by a 0, otherwise it is ugly
    seconds = 0; // Seconds is reset
    addSeconds.innerHTML = "0" + seconds;
  }

  if (minutes > 9){
    addMinutes.innerHTML = minutes;
    loseGame();
  }
// So encoding for hours because most of the user will finish before an hour, I might add a rule to loose the game if over 10 mins
}

function countAMove() {
  moves++;
  movesCounter.innerHTML = moves;
  if (moves > 12) {
    star--;
  }
  else if (move > 15) {
    star--;
  }
  else if (move > 20) {
    star--;
  }
  else {
    loseGame();
  }
}

function loseGame()
{
  console.log("you lost");
}

function winGame() {
  if (pairToFind === 0) {
    console.log("The game ends open a Windows to show the stats and ask if he wants to reset");
  }
  return false;
}

function match() {
  clickedCards[0].classList.toggle("matched"); // To trigger matched. otherwise, it's half done animation.
  clickedCards[1].classList.toggle("matched");
  pairToFind--;
  winGame();
}

function notMatched() {
  clickedCards[0].classList.toggle("not-matched");
  clickedCards[1].classList.toggle("not-matched");
}
