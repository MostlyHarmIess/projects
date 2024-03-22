let currColour;

function changeColour() {
  currColour =
    `#` +
    Math.floor(Math.random() * 16).toString(16) +
    Math.floor(Math.random() * 16).toString(16) +
    Math.floor(Math.random() * 16).toString(16) +
    Math.floor(Math.random() * 16).toString(16) +
    Math.floor(Math.random() * 16).toString(16) +
    Math.floor(Math.random() * 16).toString(16);
  document.getElementById(`body`).style.backgroundColor = currColour;
  document.getElementById("h1").innerHTML = `Background Colour: ${currColour}`;
  console.log(currColour);
}

document.getElementById(`myBtn`).addEventListener(`click`, function () {
  changeColour();
});
