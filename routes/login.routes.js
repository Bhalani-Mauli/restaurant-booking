const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;

// GET route to display the login form to users
router.get("/login", (req, res) => res.render("auth/login"));

// POST login route to process form data
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("Email not registered. ");
        res.render("auth/signup", {
          errorMessage: "Please register first",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.currentUser = user; //save user in session
        res.redirect("/dashboard");
      } else {
        console.log("Incorrect password!!!");
        res.render("auth/login", {
          errorMessage: "Incorrect password!!!",
        });
      }
    })
    .catch((error) => next(error));
});

// import auth middleware route
const { isLoggedIn, isLoggedOut } = require("../middleware/middleware.js");

// dashboard route
router.get("/dashboard", isLoggedIn, (req, res) => {
  console.log("User in session:", req.session.currentUser);
  res.render("../dashboard/dashboard.hbs", {
    userInSession: req.session.currentUser,
  });
});

router.get("/login", isLoggedOut, (req, res) => res.render("auth/login"));

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
