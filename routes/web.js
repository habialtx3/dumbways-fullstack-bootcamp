const express = require("express");
const router = express.Router();
const db = require('../config/db.js');
const pool = require("../config/db.js");
const bcrypt = require('bcrypt')
const upload = require('../middlewares/upload.js')

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
    } = req.body

    const techString = Array.isArray(technologies) ? technologies.join(", ") : technologies || "";
    const image = req.file ? `/uploads/${req.file.filename}` : null;

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

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).send("Email dan password wajib diisi");
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).send("Email atau password salah");
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send("Email atau password salah");
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});


router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send("Data tidak lengkap");
        }
        const checkUser = await pool.query(
            "SELECT * FROM users WHERE email = $1 OR username = $2",
            [email, username]
        );
        if (checkUser.rows.length > 0) {
            return res.status(400).send("Email atau username sudah terdaftar");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            `INSERT INTO users (username, email, password)
             VALUES ($1, $2, $3)`,
            [username, email, hashedPassword]
        );
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/logout", async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Gagal Logout');
        }
        res.redirect("/login");
    })
})

module.exports = router;
