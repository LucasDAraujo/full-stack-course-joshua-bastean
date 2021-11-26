const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/isLoggedIn")
// root route
router.get("/", (req, res) => res.render("landing"));

router.get("/account", isLoggedIn, (req, res) => {
    res.render("account");
});


router.get("*", (req, res) => res.send("That's a 404"));

module.exports = router;
