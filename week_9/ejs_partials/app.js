const express = require("express");
const casual = require("casual");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Home page!"));

app.use(express.static("public"));

app.get("/customers", (req, res) => {
    res.render("customers.ejs", {
        customers: [
            casual.first_name,
            casual.first_name,
            casual.first_name,
            casual.first_name,
        ],
    });
});

app.get("/products/:productId", (req, res) => {
    const product = req.params.productId;
    res.render("products.ejs", { product });
});

app.get("/username/:userId", (req, res) => {
    res.render("username.ejs", { username: req.params.userId });
});

app.get("*", (req, res) => res.send("That's a 404!"));

app.listen(port, () => console.log("Partials app listening on port port!"));
