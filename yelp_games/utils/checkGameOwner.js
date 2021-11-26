const Game = require("../models/game");

//Check if the user is logged in
const checkGameOwner = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const game = await Game.findById(req.params.id).exec();

        //If logged in , check if he they own the game
        if (game.owner.id.equals(req.user._id)) {
            next();
        } else {
            //If not, redirect back to the show page
            res.redirect("back");
        }
    } else {
        //If not logged in, redirect to /login
        res.redirect("/login");
    }
};

module.exports = checkGameOwner;
