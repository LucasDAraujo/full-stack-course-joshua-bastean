/* -------------------------------------------------------------------------- */
/*                     //ANCHOR Helper functions                              */
/* -------------------------------------------------------------------------- */

//Change the squares colors
const changeColors = (color) => {
    squares.forEach((square) => {
        square.style.backgroundColor = color;
    });
};

//Pick a random color on the array for being the "you win" color
const pickColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

//Generate a random string "rgb(XXX, XXX, XXX)" value
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

/* ----------------------- //ANCHOR reset squares ---------------------- */
const resetSquares = () => {
    const difficultyButton = document.querySelector(".selected").textContent;

    colors = generateRandomColors(numSquares);

    pickedColor = pickColor();

    resetButton.textContent = "New Colors";

    colorDisplay.textContent = pickedColor;

    title.style.backgroundColor = "steelblue";

    message.textContent = "";

    if (difficultyButton === "Easy") {
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
            squares[i].style.display = "block";
        }
    }
};

/* -------------------------------------------------------------------------- */
/*//ANCHOR                       Init variables                               */
/* -------------------------------------------------------------------------- */

/* --------------------------------- States --------------------------------- */
let numSquares = 6;

//generates the colors array
let colors = generateRandomColors(numSquares);

// create the picked color using an array color
let pickedColor = pickColor();

/* ----------------------------- Select elements ---------------------------- */
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
const modeButtons = document.querySelectorAll(".mode");

/* -------------------------------------------------------------------------- */
/*  //ANCHOR                          MAIN                                    */
/* -------------------------------------------------------------------------- */
function main() {
    //Our color display gains the picked color as text content
    colorDisplay.textContent = pickedColor;

    //reset colors button
    resetButton.addEventListener("click", resetSquares);

    //Switch the mode of the buttons and the difficulty of the game
    modeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            resetSquares();
        });
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
                resetButton.textContent = "Play again?";
            } else {
                this.style.backgroundColor = "#000";
                message.textContent = "You suck! 😝";
            }
        });
    }
}

main();
