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
    //get info from the database
    const product = {
        name: "Chew toy",
        price: 4.99,
    };
    const comments = [
        "This product is incredible!",
        "I love this toy",
        "My dog hated it",
    ];
    //This info can come from a database
    //Sends to the template
    res.render("products.ejs", { item: product, comments: comments });
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
