// Setup global variables

var currentMove = 1;
var currentPlayer = "X";
var humanPlayer;
var cpuPlayer;
var cpuSymbol;
var corners = ["one", "three", "seven", "nine"];
var winStates = {
  1: ["one", "two", "three"],
  2: ["four", "five", "six"],
  3: ["seven", "eight", "nine"],
  4: ["one", "four", "seven"],
  5: ["two", "five", "eight"],
  6: ["three", "six", "nine"],
  7: ["one", "five", "nine"],
  8: ["three", "five", "seven"]
}

// Function

// Setup game

function gameType(event) {
  var btn = event.target;
  if (btn.tagName == "BUTTON" && btn.id == "1-player") {
    cpuPlayer = true;
    document.getElementById("symbol").style.display = "block";
  }

  if (btn.tagName == "BUTTON" && btn.id == "2-player") {
    cpuPlayer = false;
    document.getElementById("gameBoard").style.display = "table";
    document.getElementById("players").style.display = "block";
  }

  document.getElementById("setup").style.display = "none";
}

function selectSymbol(event) {
  var btn = event.target;

  if (btn.tagName == "BUTTON" && btn.id == "symbol_X") {
    humanPlayer = "X";
    cpuSymbol = "O";
  }

  if (btn.tagName == "BUTTON" && btn.id == "symbol_O") {
    humanPlayer = "O";
    cpuSymbol = "X";
  }

  document.getElementById("symbol").style.display = "none";
  document.getElementById("gameBoard").style.display = "table";
  document.getElementById("players").style.display = "block";

  if (cpuPlayer == true && currentPlayer == cpuSymbol) {
    makeCpuMove();
    changePlayer();

    currentMove += 1;
  }
}

// Main event handler

function toggle(event) {
  var cell = event.target;

  if (cell.tagName == "TH" && cell.innerHTML == "") {
    move: {
      cell.innerHTML = currentPlayer;

      if (isGameOver()) {
        endGame();
        break move;
      }

      changePlayer();
    }
  }

  // CPU move
  if (cpuPlayer == true && currentPlayer == cpuSymbol) {
    move: {
      makeCpuMove();

      if (isGameOver()) {
        endGame();
        break move;
      }

      changePlayer();
    }
  }

  currentMove += 1;
}

// Support functions

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

function isGameOver() {
  if (isWin() || isDraw()) {
    return true;
  }
  else {
    return false;
  }
}

function isDraw() {
  var isNoEmptyCell = true;

  for (cell of document.getElementsByTagName("TH")) {
    if (cell.innerHTML == "") {
      isNoEmptyCell = false;
    }
  }

  return isNoEmptyCell;
}

function isWin() {
  var isWin = false;

  for (var state in winStates) {
    var winState = currentWinState(state);

    if (winState == "XXX" || winState == "OOO") {
      isWin = true;
      break;
    }
  }

  return isWin;
}

function currentWinState(state) {
  var winState = "";

  for (var i = 0; i < winStates[state].length; i++) {
    winState += document.getElementById(winStates[state][i]).innerHTML;
  }

  return winState;
}

function endGame() {
  if (isDraw()) {
    document.getElementById("demo").innerHTML = "It's a Draw";
  }

  if (isWin()) {
    document.getElementById("demo").innerHTML = "Player " + currentPlayer + " has won!";
  }

  document.getElementById("resetBTN").style.display = "block";
  document.getElementById("gameBoard").onclick = "none";
}

function resetGame() {
  // Clear board
  for (cell of document.getElementsByTagName("TH")) {
    cell.innerHTML = "";
  }

  // Reset button
  document.getElementById("demo").innerHTML = "";
  document.getElementById("resetBTN").style.display = "none";
  document.getElementById("gameBoard").onclick = function(){toggle(event)};

  currentMove = 1;
  currentPlayer = "X";

  if (cpuPlayer == true && cpuSymbol == currentPlayer) {
    makeCpuMove();
    changePlayer()
    currentMove += 1;
  }
}

// CPU logic

function makeCpuMove() {
  if (currentMove == 1) {

    if (document.getElementById("five").innerHTML == humanPlayer) {
      document.getElementById("one").innerHTML = cpuSymbol;
    }
    else {
      document.getElementById("five").innerHTML = cpuSymbol;
    }
  }

  if (currentMove == 2) {
    if (isTwoInLine()) {
      document.getElementById(bestCpuMove()).innerHTML = cpuSymbol;
    }
    else if (isCornerEmpty()) {
      var movesList = [];

      for (var i = 0; i < corners.length; i++) {
        if (document.getElementById(corners[i]).innerHTML == "") {
          movesList.push(corners[i]);
        }
      }

      document.getElementById(movesList.shift()).innerHTML = cpuSymbol;
    }
  }

  if (currentMove >= 3) {
    document.getElementById(bestCpuMove()).innerHTML = cpuSymbol;
  }
}

function bestCpuMove() {
  var movesList = [];

  for (var state in winStates) {
    var emptyCell = "";
    var winState = "";

    for (var i = 0; i < winStates[state].length; i++) {
      var cellContent = document.getElementById(winStates[state][i]).innerHTML;
      winState += cellContent;

      if (cellContent == "") {
        emptyCell = winStates[state][i];
      }
    }

    if (winState == cpuSymbol + cpuSymbol) {
      movesList.unshift(emptyCell);
    }

    if (winState == humanPlayer + humanPlayer) {
      movesList.push(emptyCell);
    }
  }

  if (movesList.length == 0) {
    for (cell of document.getElementsByTagName("TH")) {
      if (cell.innerHTML == "") {
        movesList.push(cell.id);
      }
    }
  }

  return movesList.shift();
}

function isTwoInLine() {
  var isTwoInLine = false;

  for (var state in winStates) {
    var winState = currentWinState(state);

    if (winState == "XX" || winState == "OO") {
      isTwoInLine = true;
    }
  }

  return isTwoInLine;
}

function isCornerEmpty() {
  var isCornerTaken = false;

  for (var i = 0; i < corners.length; i++) {
    isCornerTaken = isCornerTaken || document.getElementById(corners[i]).innerHTML == "";
  }

  return isCornerTaken;
}
