const config = require("../config");
const mongoose = require("mongoose");
mongoose.connect(config.database.connection());

const express = require("express");
const app = express();
const port = 3000;

const Game = require("./models/game");


//Sets ejs
app.set("view engine", "ejs");

//Makes the public folder visible
app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

//root route
app.get("/", (req, res) => res.render("landing"));

//games GET route
app.get("/games", (req, res) => {
    Game.find()
        .exec()
        .then((foundGames) => {
            res.render("games", { games: foundGames });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

//games POST route
app.post("/games", (req, res) => {
    //Using spread operator to catch the form values
    const newGame = {
        ...req.body,
    };
    Game.create(newGame)
        .then((game) => {
            console.log(game);
            res.redirect("/games");
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

//form GET route
app.get("/games/new", (req, res) => {
    res.render("games_new");
});

//404 route
app.get("*", (req, res) => res.send("That's a 404"));

app.listen(port, () => console.log(`Yelp_games is working on port ${port}`));
