const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");
//games GET route
router.get("/", (req, res) => {
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
router.post("/", (req, res) => {
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
router.get("/new", (req, res) => {
    res.render("games_new");
});

//Game show route
router.get("/:id", (req, res) => {
    Game.findById(req.params.id)
        .exec()
        //Search the comments related to the specific game ID and shows the page
        .then((game) => {
            Comment.find({ gameId: req.params.id }, (err, comments) => {
                //"game" comes from .then((game)), and comments is the callback argument
                err
                    ? res.send(err)
                    : res.render("games_show", { game, comments });
            });
        })
        .catch((err) => res.send(err));
});

router.get("/:id/edit", (req, res) => {
    //Get the game from the database
    Game.findById(req.params.id)
        .exec()
        .then((game) => {
            //Render de the edit form, passing in that game
            res.render("games_edit", { game });
        });
});

module.exports = router;
