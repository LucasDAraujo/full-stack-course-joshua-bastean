/* -------------------------------- constants declarations -------------------------------- */
const colors = [
    "rgb(255, 0, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 0, 255)",
    "rgb(255, 255, 0)",
    "rgb(255, 0, 255)",
    "rgb(0, 255, 255)",
];

/* --------------------------- elements selection --------------------------- */
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");

/* -------------------------- choose winning color -------------------------- */
//Math.ceil(Math.random() * 6)
let pickedColor = colors[3];

//Update colorDisplay
colorDisplay.textContent = pickedColor;

/* --------------------------- set up the squares --------------------------- */
for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];

    //Add click listeners
    squares[i].addEventListener("click", function () {
        //Get the color of the clicked square
        const clickedColor = this.style.backgroundColor;

        //Compare that color to picked color
        if (clickedColor === pickedColor) {
            alert("You're right");
        } else {
            alert("You suck");
        }
    });
}
