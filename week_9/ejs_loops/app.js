const casual = require("casual");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/customers", (req, res) => {
    const customers = [
        casual.first_name,
        casual.first_name,
        casual.first_name,
        casual.first_name,
    ];
    res.render("customers.ejs", { customers });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
