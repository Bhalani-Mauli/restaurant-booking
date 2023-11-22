const express = require("express");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

const isLoggedIn = (req, res, next) => {
  // check if the user is logged in
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  // if an already logged in user tries to access the login page
  if (req.session.currentUser) {
    return res.redirect("/"); // redirects the user to the home page
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
