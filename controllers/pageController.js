const path = require("path");

exports.index = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

exports.project = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/project.html"));
};

exports.contact = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/contact.html"));
};

exports.detail = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/detail.html"));
};
