const express = require("express");
const router = express.Router();

// root route
router.get("/", (req, res) => res.render("landing"));

router.get("*", (req, res) => res.send("That's a 404"));

module.exports = router;
