const express = require("express");
const path = require("path");
const ejs = require("ejs"); // <-- WAJIB

const app = express();
const port = 3000;

// View engine HTML dengan EJS render
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

// Public folder

app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const webRoutes = require("./routes/web");
app.use("/", webRoutes);

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
