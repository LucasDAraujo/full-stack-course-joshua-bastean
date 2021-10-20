/* -------------------------------------------------------------------------- */
/*                              Helper functions                              */
/* -------------------------------------------------------------------------- */

//ANCHOR Chance buttons class
function changeButtonClass(buttonType, selectedButton, inverseButton) {
    if (buttonType === "easy") {
        numSquares = 3;
    } else {
        numSquares = 6;
    }
    colors = generateRandomColors(numSquares);

    selectedButton.classList.add("selected");

    inverseButton.classList.remove("selected");

    colors = generateRandomColors(numSquares);

    pickedColor = pickColor();

    colorDisplay.textContent = pickedColor;
    if (buttonType === "easy") {
        //update colors on easy
        for (let i = 0; i < squares.length; i++) {
            if (colors[i]) {
                squares[i].style.backgroundColor = colors[i];
            } else {
                squares[i].style.display = "none";
            }
        }
    } else {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = 'block';

        }
    }
}
//Change the squares colors
const changeColors = (color) => {
    squares.forEach((square) => {
        square.style.backgroundColor = color;
    });
};

//Pick a random color on the array
const pickColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

//Generate a random rgb value
const generateRandomColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    return randomColor;
};

//Generate random colors for the entire array
const generateRandomColors = (num) => {
    let arrayColors = [];
    for (let i = 0; i < num; i++) {
        arrayColors.push(generateRandomColor());
    }
    return arrayColors;
};

/* -------------------------------------------------------------------------- */
/*//ANCHOR                       Init variables                               */
/* -------------------------------------------------------------------------- */

//State
let numSquares = 6;

//Picks the squares on the html
const squares = document.querySelectorAll(".square");

//Picks the span with RGB inside
const colorDisplay = document.getElementById("colorDisplay");

//Picks the span with nothing inside
const message = document.getElementById("message");

//Picks the title
const title = document.querySelector("h1");

//Picks the reset button
const resetButton = document.getElementById("resetButton");

//Picks the 2 buttons of difficulty
const easyButton = document.getElementById("easyButton");
const hardButton = document.getElementById("hardButton");

/* -------------------------------------------------------------------------- */
/*  //ANCHOR                          MAIN                                    */
/* -------------------------------------------------------------------------- */

//generates the colors array
let colors = generateRandomColors(numSquares);

// create the picked color using an array color
let pickedColor = pickColor();

//Our color display gains the picked color as text content
colorDisplay.textContent = pickedColor;

/* ------------------------------ reset colors button ------------------------------ */
resetButton.addEventListener("click", function () {
    colors = generateRandomColors(numSquares);

    pickedColor = pickColor();

    colorDisplay.textContent = pickedColor;

    title.style.backgroundColor = "black";

    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
});

/* ------------------------------- ANCHOR easy button ------------------------------ */
easyButton.addEventListener("click", function () {
    changeButtonClass("easy", this, hardButton);
});

/* ------------------------------- hard button ------------------------------ */
hardButton.addEventListener("click", function () {
    changeButtonClass("hard", this, easyButton);
});

/* --------------------------- set up the squares --------------------------- */
for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener("click", function () {
        const clickedColor = this.style.backgroundColor;

        if (clickedColor === pickedColor) {
            message.textContent = "Correct 😄";
            changeColors(clickedColor);
            title.style.backgroundColor = clickedColor;
        } else {
            this.style.backgroundColor = "#000";
            message.textContent = "You suck! 😝";
        }
    });
}
