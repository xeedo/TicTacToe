function toggle(event) {
  // document.getElementById("demo").innerHTML = cell.innerHTML;

  var cell = event.target;

  if (cell.innerHTML == "") {
    cell.innerHTML = "X";
  }
  else if (cell.innerHTML == "X") {
    cell.innerHTML = "O";
  }
  else if (cell.innerHTML = "O") {
    cell.innerHTML = ""
  }
}
