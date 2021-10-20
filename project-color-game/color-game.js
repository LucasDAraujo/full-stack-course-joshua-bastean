

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
const message = document.getElementById("message");

/* ------------------------- Helper functions ------------------------ */
const pickColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

/* -------------------------- choose winning color -------------------------- */
//Math.ceil(Math.random() * 6)
let pickedColor = pickColor()

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
            message.textContent = "Correct 😄";
            changeColors(clickedColor);
        } else {
            this.style.backgroundColor = "#000";
            message.textContent = "You suck! 😝";
        }
    });
}

/* ------------------------ Change the squares colors ----------------------- */
const changeColors = (color) => {
    squares.forEach((square) => {
        square.style.backgroundColor = color;
    });
};
