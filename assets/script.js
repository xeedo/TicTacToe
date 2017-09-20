// Setup global variables

var playerTurn = "X";
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

// ------
// Functions

function toggle(event) {
  var cell = event.target;

  // Make sure that trigers only on cell
  if (cell.tagName == "TH") {
    makeMove(cell);
  }

  // Check if game is over
  if (isGameOver()) {
    document.getElementById("demo").innerHTML = playerTurn + " has won!";
    resetGame(); 
  }

  changePlayer();
}

function makeMove(cell) {
  // make move only on empty cell
  if (cell.innerHTML == "") {
    cell.innerHTML = playerTurn;
    currentState[cell.id] = playerTurn;
  }
}

function changePlayer() {
  if (playerTurn == "X") {
    playerTurn = "O";
  }
  else {
    playerTurn = "X";
  }
}

function isGameOver() {
  var aCells = document.getElementsByTagName("TH");
  var isOver = true;

  if (isWin()) {
    return isOver;
  }
  else {
    for (cell of aCells) {
      if (cell.innerHTML == "") {
        isOver = false;
      }
    }
    return isOver;
  }
}

function isWin() {
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
  for (cell of document.getElementsByTagName("TH")) {
    cell.innerHTML = "";
  }
}
