const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking.model");
const { isLoggedIn } = require("../middleware/middleware.js");
const cities = require("../constants/cities");

/* GET dashboard route */
router.get("/", isLoggedIn, (req, res) => {
  Booking.find({
    userEmail: req.session.currentUser.email,
  }).then((bookings) => {
    res.render(
      "../views/dashboard/dashboard.hbs",
      // {
      //   layout: req.session.currentUser ? "layouts/loggedin-layout" : "layout",
      // },
      {
        layout: req.session.currentUser ? "layouts/loggedin-layout" : "layout",
        bookings,
        userInSession: req.session.currentUser,
        cities,
      }
    );
  });
});

router.post("/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Booking.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch((error) => next(error));
});

module.exports = router;
