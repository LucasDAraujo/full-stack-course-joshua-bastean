const express = require("express");
const app = express();
const port = 3001;

//THIS IS JUST A SIMULATION OF A DATABASE, I'M NOT DOING THINGS LIKE THIS ON THE FUTURE!!!
const books = [
    { title: "Animal Farm ", author: "George Orwell" },
    { title: "Harry Potter ", author: "J.K Rowling" },
    { title: "Hunger Games ", author: "I don't know" },
    { title: "Nineteen Eighty-Four", author: "George Orwell" },
];

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/books", (req, res) => {
    res.render("books", { books });
});

app.post("/books", (req, res) => {
    // res.send('You hit the post route')
    // console.log(req.body);
    books.push(req.body);
    res.redirect("/books" );
});

app.get("*", (req, res) => {
    res.send("That's a 404");
});

app.listen(port, () =>
    console.log(`Express route app is listening on port ${port}!`)
);
