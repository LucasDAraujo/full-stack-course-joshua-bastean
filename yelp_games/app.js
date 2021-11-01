const config = require("./config");
const mongoose = require("mongoose");
mongoose.connect(config.database.connection());

const express = require("express");
const app = express();
const port = 3000;

const Game = require("./models/game");
const Comment = require("./models/comment");

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

//games form POST route
app.post("/games", (req, res) => {
    //Using spread operator to catch the form values

    const newGame = {
        ...req.body,
    };
    newGame.genre = newGame.genre.toLowerCase();
    Game.create(newGame)
        .then((game) => {
            res.redirect("/games");
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

//games form GET route
app.get("/games/new", (req, res) => {
    res.render("games_new");
});

//Game show route
app.get("/games/:id", (req, res) => {
    Game.findById(req.params.id)
        .exec()
        .then((game) => res.render("games_show", { game }))
        .catch((err) => res.send(err));
});

//new comments show form
//We're going to render a page passing in the game ID
app.get("/games/:id/comments", (req, res) => {
    res.render("comments_new", { gameId: req.params.id });
});

//Create comments  - Actually update DATABASE
app.post("/games/:id/comments", (req, res) => {
    //Create the comment
    Comment.create({
        ...req.body,
    })
        .then((newComment) => {
            res.redirect(`/games/${req.body.gameId}`);
        })
        .catch((err) => {
            console.log(err);
            res.redirect(`/games/${req.body.gameId}`);
        });
});

//404 route
app.get("*", (req, res) => res.send("That's a 404"));

app.listen(port, () => console.log(`Yelp_games is working on port ${port}`));
