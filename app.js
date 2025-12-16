const express = require("express");
const path = require("path");
const ejs = require("ejs");
const db = require('./config/db.js')
const session = require('express-session')

const app = express();
const port = 3000;

app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: "secret-key-project",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

const webRoutes = require("./routes/web");
app.use("/", webRoutes);

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
