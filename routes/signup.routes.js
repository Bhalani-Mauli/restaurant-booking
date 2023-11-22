const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");
const mongoose = require("mongoose");

// GET route to display the signup form to users
router.get("/signup", (req, res) => res.render("../views/auth/signup.hbs"));

// POST route to process form data
router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  // mandatory fields
  if (!username || !email || !password) {
    res.render("../views/auth/signup.hbs", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render("../views/auth/signup.hbs", {
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword,
      });
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      res.render("../views/auth/login.hbs");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(500)
          .render("../views/auth/signup.hbs", { errorMessage: error.message });
      } else if (error.code === 11000) {
        console.log(
          " Username and email need to be unique. Either username or email is already used. "
        );

        res.status(500).render("../views/auth/signup.hbs", {
          errorMessage: "User not found and/or incorrect password.",
        });
      } else {
        next(error);
      }
    });
});

module.exports = router;
