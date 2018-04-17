// Initializing the variables.

let minutes = 00,
    seconds = 00,
    addSeconds = document.getElementById("seconds"),
    addMinutes = document.getElementById("minutes"), // All the above was linked to time
    Interval,
    // Link to click buttons
    startButton = document.getElementById("start"),
    pauseButton = document.getElementById("pause"),
    gameArea = document.getElementById("area-of-game"),
    drawingOfTheCard = document.getElementsByClassName(".card fas"),
    drawingOfTheCards = [...drawingOfTheCard],
    // Move related variables
    moves = 0,
    movesCounter = document.getElementById("move"),
    pairToFind = 8, // Because 16 cards.
    // Star related variables
    starsContainer = document.getElementById("rating-star"),
    star = document.getElementsByClassName("star"),
    stars = [...star],
    firstStar = document.getElementById("star1"),
    secondStar = document.getElementById("star2"),
    thirdStar = document.getElementById("star3"),
    // cards related variables
    card = document.getElementsByClassName("card"),
    cards = [...card], // Put the html collection in the Array
    clickedCards = [],
    // Pop up
    popup = document.getElementById("myPopup1"),
    finalMinutes = document.getElementById("final-minutes"),
    finalSeconds = document.getElementById("final-seconds"),
    finalScore = document.getElementById("final-score"),
    finalMoveCount = document.getElementById("final-moves"),
    leavePage = document.getElementById("quit"),
    replayGame = document.getElementById("replay"),
    Quit = document.getElementById("replay");


const fixedStarsContainer = document.getElementById("rating-star"),
      fixedStar = document.getElementsByClassName("star"),
      fixedStars = [...fixedStar];



// Click on a card
for (card of cards) {
  // Get the elements from the are-of-game, cards, etc
 // Store the value of clicked Cards, which will be always [0, 1]
  card.onclick = function cardsWaitingToBeCompared() {  // When a card is clicked on, it calls the function cardsWaitingToBeCompared
  this.classList.toggle("flip");// Use of "this." otherwise, when I click on a card, another one get flipped.
  clickedCards.push(this); // Which stores the clicked card in the clickedCards array

    if (clickedCards.length === 2 && clickedCards[0].innerHTML === clickedCards[1].innerHTML) { // Once two cards are clicked trigger the below actions
      match();
      countAMove();
      clickedCards = []; // empty the clickedCards Array, otherwise it will keep on counting
    }

    else if (clickedCards.length === 2 && clickedCards[0].innerHTML !== clickedCards[1].innerHTML) {
        unMatched();
        countAMove();   // Important as otherwise the clickedCards.length does not reset and go over 2 and countAMove & notMatched() are not triggered
        clickedCards = [];
    }
  }
}

  // Pause button and what it does
pauseButton.onclick = function() {
  clearInterval(Interval); // Pause the timer
  alert("You can come back later, the time has stopped!"); // When window is left, timer start again
  Interval = setInterval(startTimer, 1000)
}

function startTimer() {
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
// No encoding for hours because most of the user will finish before an hour, I might add a rule to loose the game if over 10 mins
}
//
function countAMove() {
  moves++;
  movesCounter.innerHTML = moves;
  if (moves === 10) {
    stars.shift();
    starsContainer.innerHTML = '<li class="star"><span id="star1" class="fas fa-star"></span></li><li class="star"><span id="star2" class="fas fa-star"></span></li>';
  }
  else if (moves === 12) {
    stars.shift();
    starsContainer.innerHTML = '<li class="star"><span id="star1" class="fas fa-star"></span></li>';
  }
  else if (moves === 15) {
    setTimeout (function() {
      loseGame();}, 200); // without this time out, the moves was reaching 15 but did not have time to display.
  }
}

function loseGame() {
  alert("you lost");
  startGame();
}


function match() {
  clickedCards[0].classList.toggle("matched"); // To trigger matched. otherwise, it's half done animation.
  clickedCards[1].classList.toggle("matched");
  pairToFind--;
    if (pairToFind === 0){
      winGame();
    }
}

function unMatched() {
  clickedCards[0].classList.toggle("not-matched");
  clickedCards[1].classList.toggle("not-matched");
}

function winGame() {
  popUp();
}

// Initiate the game
function startGame() {
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

  for (star of stars) { // Looping over our 16 cards
      starsContainer.innerHTML = ""; // empty if you already finished with 1, 2 or 3 starsContainer
       // Empty the board / area of the game
      [].forEach.call(stars, function(inject) { // Tweak from: Learn HTML5 and JavaScript for Android p.98
        starsContainer.appendChild(inject); // Inject the array in the <li>
    });
    starsContainer.innerHTML = '<li class="star"><span id="star1" class="fas fa-star"></span></li><li class="star"><span id="star2" class="fas fa-star"></span></li><li class="star"><span id="star3" class="fas fa-star"></span></li>'; // then reput 3 stars
  }


  // popup reinitialization:

popup.classList.remove("show");

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

function popUp() {
    popup.classList.toggle("show");
    finalMinutes.innerHTML = minutes;
    finalSeconds.innerHTML = seconds;
    finalScore.innerHTML = starsContainer.innerHTML; // to define
    finalMoveCount.innerHTML = moves;
}
