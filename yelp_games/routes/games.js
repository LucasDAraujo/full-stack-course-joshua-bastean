const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");

const fixForm = (reqBody) => {
    reqBody.genre = reqBody.genre.toLowerCase().replace(" ", "");
    return reqBody;
};

//games GET route
router.get("/", (req, res) => {
    Game.find()
        .exec()
        .then((foundGames) => {
            res.render("games", {
                games: foundGames,
            });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

//games form POST route
router.post("/", (req, res) => {
    const newGame = fixForm(req.body);

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
    const id = req.params.id;
    Game.findById(id)
        .exec()
        //Search the comments related to the specific game ID and shows the page
        .then((game) => {
            Comment.find(
                {
                    gameId: id,
                },
                (err, comments) => {
                    //"game" comes from .then((game)), and comments is the callback argument
                    err
                        ? res.send(err)
                        : res.render("games_show", {
                              game,
                              comments,
                          });
                }
            );
        })
        .catch((err) => res.send(err));
});

router.get("/:id/edit", (req, res) => {
    const id = req.params.id;

    //Get the game from the database
    Game.findById(id)
        .exec()
        .then((game) => {
            //Render de the edit form, passing in that game
            res.render("games_edit", {
                game,
            });
        });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const game = fixForm(req.body);
    Game.findByIdAndUpdate(id, game, {
        new: true,
    })
        .exec()
        .then((updatedComic) => {
            console.log(updatedComic);
            res.redirect(`/games/${id}`);
        })
        .catch((err) => res.send(`ERROR:${err}`));
});

module.exports = router;
