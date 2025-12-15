const express = require("express");
const router = express.Router();
const db = require('../config/db.js')

router.get("/", (req, res) => {
    res.render("index");
    // res.send('hello world')
});

router.get("/project", async (req, res) => {
    const result = await db.query("SELECT * FROM projects ORDER BY id");
    res.render("project", { 
        title: "My Project Page",
        projects : result.rows 
    });

});

router.get("/contact", (req, res) => {
    res.render("contact");
});

module.exports = router;
