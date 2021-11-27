const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

//ANCHOR Sign Up - New
router.get("/signup", (req, res) => {
    res.render("signup");
});

//ANCHOR Sign Up - Create
router.post("/signup", async (req, res) => {
    try {
        const newUser = await User.register(
            new User({
                username: req.body.username,
                email: req.body.email,
            }),
            req.body.password
        );
        console.log(newUser);

        passport.authenticate("local")(req, res, () => {
            res.redirect("/games");
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//ANCHOR Login - Show form
router.get("/login", (req, res) => {
    res.render("login");
});

//ANCHOR Login
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/games",
        failureRedirect: "/login",
    })
);

//ANCHOR Logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/games");
});

//ANCHOR Logout

module.exports = router;
