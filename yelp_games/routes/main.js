const express = require("express");
const router = express.Router();

// root route
router.get("/", (req, res) => res.render("landing"));

router.get("/account", isLoggedIn, (req, res) => {
    res.render("account");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

router.get("*", (req, res) => res.send("That's a 404"));

module.exports = router;
