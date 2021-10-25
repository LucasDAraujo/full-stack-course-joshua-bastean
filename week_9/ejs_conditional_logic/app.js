const express = require("express");
const app = express();

// routes

app.get("/", (req, res) => {
    res.send("This is the root route");
});

app.get("/login", (req, res) => {
    res.send("This is the login route");
});

//Embedded javascript(you need to create a views directory)
app.get("/users/:username", (req, res) => {
    res.render("username.ejs");
}); //With a colon, you can define route parameters

app.get("/products/:productId", (req, res) => {
    const product = req.params.productId;
    res.render("products.ejs", { product: product });
});

app.get("/products/:id/comments/:commentId", (req, res) => {
    res.send(
        `This is the page for the product ${req.params.id} and the comment id is ${req.params.commentId}`
    );
});

app.get("*", (req, res) => res.send("That's a 404")); //Wildcard character

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
