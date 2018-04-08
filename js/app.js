// Initializing the variables.

let minutes = 00,
    seconds = 00,
    addSeconds = document.getElementById("seconds"),
    addMinutes = document.getElementById("minutes"),
    startButton = document.getElementById('start'),
    pauseButton = document.getElementById('pause'),
    Interval;

startButton.onclick = function startGame() {

clearInterval(Interval); // https://www.w3schools.com/jsref/met_win_clearinterval.asp
Interval = setInterval(startTimer, 1000); // start the timer, 1000 = 1 second
seconds = "00";
minutes = "00";
addSeconds.innerHTML = seconds;
addMinutes.innerHTML = minutes;
startButton.innerHTML = "Reset the Game"; // I was thinking about a reset button but I think this is more intuitive to just change start dynamically
}

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

// create the Array of cards

let nl = document.getElementsByClassName('card').querySelectorAll(.fas); //grab the icons in .card, will give a nodeList

// transform the NodeList in an Array ??? Do not know if it works, I get undefined
let Array = [...nl];


// then I want to shuffle the (.fas each time I click on start button).

// I want to click on the .card containing the .fas and a flip animation + a change of class to make the .fas visible happen --> I think I know how change the class in JS

// then I want to compare the clickedCards

// if they have the same class fas fa-bowling(for example), I want to apply a match class which will animate and color the background, the element must disappear, maybe display none

// if they do not match, background becomes red, little animation and the cards turn again
