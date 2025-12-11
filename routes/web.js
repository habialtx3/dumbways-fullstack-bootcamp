const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/project", (req, res) => {
    res.render("project", { title: "My Project Page" });
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

module.exports = router;
