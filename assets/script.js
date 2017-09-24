// Setup global variables

var currentMove = 1;
var currentPlayer = "X";
var player = "X";
var currentState = {
  "one": "",
  "two": "",
  "three": "",
  "four": "",
  "five": "",
  "six": "",
  "seven": "",
  "eight": "",
  "nine": ""
};

var winStates = {
  1: ["one", "two", "three"],
  2: ["four", "five", "six"],
  3: ["seven", "eight", "nine"],
  4: ["one", "four", "seven"],
  5: ["two", "five", "eight"],
  6: ["three", "six", "nine"],
  7: ["one", "five", "nine"],
  8: ["three", "five", "seven"]
};

// ------
// Functions

// TO-DO: Set human player sign.

// Main event handler
function toggle(event) {
  var cell = event.target;

<<<<<<< HEAD
  // Make make move on an empty cell
  if (cell.tagName == "TH" && cell.innerHTML == "") {
    makeMove(cell);
    changePlayer();
  }

  // Make CPU move
  if (true) {
    makeMove(CPUmove());
    if (!(isWin())) {
      changePlayer();
    }
  }

  currentMove += 1;

  // Check if game is over
  if (isDraw()) {
    document.getElementById("demo").innerHTML = "It's a Draw";
  }

  if (isWin()) {
    document.getElementById("demo").innerHTML = "Player " + currentPlayer + " has won!";
  }

  if (isDraw() || isWin()) {
    document.getElementById("resetBTN").style.display = "block";
    document.getElementById("gameBoard").onclick = "none";
  }
=======
  // Make sure that trigers only on empty cell
  if (cell.tagName == "TH" && cell.innerHTML == "") {
    makeMove(cell);
    changePlayer();
  }

  // Make CPU move
  if (true) {
    makeMove(CPUmove());
    changePlayer();
  }

  currentMove += 1;

  // Check if game is over
  if (isGameOver()) {
    document.getElementById("demo").innerHTML = "Player " + currentPlayer + " has won!";
    document.getElementById("resetBTN").style.display = "block";
    document.getElementById("gameBoard").onclick = "none";
  }
>>>>>>> 0b709a1778f2ff56de3e2997c89c6be696858e5c
}

// Supporting functions

function makeMove(cell) {
  // make move only on empty cell
  if (cell.innerHTML == "") {
    cell.innerHTML = currentPlayer;
    currentState[cell.id] = currentPlayer;
  }
}

function changePlayer() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
    document.getElementById("Player2").style.textShadow = "2px 2px 8px green";
    document.getElementById("Player1").style.textShadow = "none";
  }
  else {
    currentPlayer = "X";
    document.getElementById("Player2").style.textShadow = "none";
    document.getElementById("Player1").style.textShadow = "2px 2px 8px green";
  }
}

function isDraw() {
  var aCells = document.getElementsByTagName("TH");
  var isEmpty = true;

  for (cell of aCells) {
    if (cell.innerHTML == "") {
      isEmpty = false;
    }
  }

  return isEmpty;
}

function isWin() {
  var states = "";
  var win = false;

  for (var state in winStates) {
    states = "";

    for (var i = 0; i < winStates[state].length; i++) {
      states += currentState[winStates[state][i]];
    }

    if (states == "XXX" || states == "OOO") {
      win = true;
      break;
    }
  }

  return win;
}

function resetGame() {
  // Clear board
  for (cell of document.getElementsByTagName("TH")) {
    cell.innerHTML = "";
  }

  // Clear variable
  for (var cell in currentState) {
    if (currentState.hasOwnProperty(cell)) {
      currentState[cell] = "";
    }
  }

  // Reset button
  document.getElementById("demo").innerHTML = "";
  document.getElementById("resetBTN").style.display = "none";
  document.getElementById("gameBoard").onclick = function(){toggle(event)};
<<<<<<< HEAD
  currentMove = 1;
=======
>>>>>>> 0b709a1778f2ff56de3e2997c89c6be696858e5c
}

// CPU logic

<<<<<<< HEAD
=======
// TO-DO: Add more logic

>>>>>>> 0b709a1778f2ff56de3e2997c89c6be696858e5c
function CPUmove() {
    if (currentMove == 1) {

      if (currentState["five"] == player) {
        return document.getElementById("one");
      }
      else {
        return document.getElementById("five");
      }

    }

    if (currentMove == 2) {
<<<<<<< HEAD
      return hasTwo();
    }

    if (currentMove >= 3) {
      return hasTwo();
    }
}

function hasTwo() {
  var states = "";
  var whereMove = "";

  for (var state in winStates) {
    states = "";

    for (var i = 0; i < winStates[state].length; i++) {
      states += currentState[winStates[state][i]];

      if (currentState[winStates[state][i]] == "") {
        whereMove = document.getElementById(winStates[state][i]);
      }
    }

    if (states == "XX") {
      break;
    }
  }

  return whereMove;
=======

    }

    if (currentMove >= 3) {

    }
>>>>>>> 0b709a1778f2ff56de3e2997c89c6be696858e5c
}
