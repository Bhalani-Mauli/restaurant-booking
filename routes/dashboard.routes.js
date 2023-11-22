const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking.model");

/* Import auth middleware route */
const { isLoggedIn, isLoggedOut } = require("../middleware/middleware.js");

/* GET dashboard route */
router.get("/", isLoggedIn, (req, res) => {
  Booking.find().then((bookings) => {
    res.render("../views/dashboard/dashboard.hbs", {
      bookings,
      userInSession: req.session.currentUser,
    });
  });
});

module.exports = router;
