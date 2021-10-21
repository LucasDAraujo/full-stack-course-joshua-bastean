/* -------------------------------------------------------------------------- */
/*               //ANCHOR       HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

const toggleDisabled = () => {
    document.querySelector("input").disabled
        ? (document.querySelector("input").disabled = false)
        : (document.querySelector("input").disabled = true);
};

const addItem = () => {
    //If the text is undefined, enable the button and changes the color
    if (!inputElement.value) {
        toggleDisabled();
    } else {
        localStorage.setItem(
            `${Math.floor(Date.now() * Math.random())}`,
            JSON.stringify(inputElement.value)
        );
        inputElement.value = "";
        window.location.reload();
    }
};
const getItemsFromLocalStorage = () => {
    const todoList = [];

    for (let i = 0; i < localStorage.length; i++) {
        //GET THE ITEMS FROM LOCAL STORAGE AND THEY ID
        todoList.push(
            `${JSON.parse(
                localStorage.getItem(localStorage.key(i))
            )}|${JSON.parse(localStorage.key(i))}`
        );
    }

    return todoList;
};
const removeItem = (id)=>{
    localStorage.removeItem(id)
}
const addValueToTable = () => {
    const tableItems = getItemsFromLocalStorage();
    tableItems.forEach((item) => {
        const tableData = tableBody.insertRow();

        //picks just the text, not the included id
        tableData.insertCell(0).textContent = item.substr(
            0,
            item.indexOf("|")
        );

        const btn = document.createElement("button");

        btn.classList.add("btn", "btn-danger",'text-end');

        btn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

        //PICKS JUST THE ID. IGNORING THE LETTERS
        btn.id = `${item.substr(item.indexOf("|")+1, item.length)}`;

        // Exclude the cell when clicked
        btn.addEventListener("click", function () {
            removeItem(this.id)
            this.id.replace(this.id,'')
            window.location.reload()
        });
        tableData.insertCell(1).append(btn)
    });
};

/* -------------------------------------------------------------------------- */
/*                                   DECLARATIONS                             */
/* -------------------------------------------------------------------------- */

const inputElement = document.querySelector("input");
const buttonElement = document.querySelector("button");
const tableBody = document.querySelector("tbody");
let todoList = [];

/* -------------------------------------------------------------------------- */
/*                                MAIN FUNCTION                               */
/* -------------------------------------------------------------------------- */
function main() {
    addValueToTable();
    buttonElement.addEventListener("click", () => {
        addItem();
    });
}
main();
