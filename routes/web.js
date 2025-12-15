const express = require("express");
const router = express.Router();
const db = require('../config/db.js');
const pool = require("../config/db.js");

router.get("/", (req, res) => {
    res.render("index");
    // res.send('hello world')
});

router.get("/project", async (req, res) => {
    const result = await db.query("SELECT * FROM projects ORDER BY id DESC");
    res.render("project", {
        title: "My Project Page",
        projects: result.rows
    });

});

router.post("/project", async (req, res) => {
    const {
        name,
        start_date,
        end_date,
        description,
        technologies,
        image
    } = req.body

    const techString = Array.isArray(technologies) ? technologies.join(", "): technologies ||"";

    await pool.query(
        `INSERT INTO projects
        (name, start_date,end_date,description,technologies,image)
        VALUES ($1,$2,$3,$4,$5,$6)`, [
        name,
        start_date,
        end_date,
        description,
        techString,
        image || null
    ]
    )
    res.redirect("/project")
})

router.get("/contact", (req, res) => {
    res.render("contact");
});

module.exports = router;
