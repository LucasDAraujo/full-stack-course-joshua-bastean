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
        req.flash("success", `Signed you up as ${newUser.username}`);

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
        failureFlash: true,
        successFlash: "Logged in successfully!",
    })
);

//ANCHOR Logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success","Logged you out!")
    res.redirect("/games");
});

//ANCHOR Logout

module.exports = router;
