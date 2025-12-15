const express = require("express");
const path = require("path");
const ejs = require("ejs");
const db = require('./config/db.js')

const app = express();
const port = 3000;

app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const webRoutes = require("./routes/web");
app.use("/", webRoutes);


app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
