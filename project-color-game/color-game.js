/* ------------------------- Helper functions ------------------------ */
const pickColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

const generateRandomColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    return randomColor;
};

const generateRandomColors = (num) => {
    let arrayColors = [];
    for (let i = 0; i < num; i++) {
        arrayColors.push(generateRandomColor());
    }
    return arrayColors;
};
colors = generateRandomColors(6)
/* --------------------------- elements selection --------------------------- */
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const message = document.getElementById("message");
const title = document.querySelector('h1')

/* -------------------------- choose winning color -------------------------- */
let pickedColor = pickColor();

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
            title.style.backgroundColor = clickedColor
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
