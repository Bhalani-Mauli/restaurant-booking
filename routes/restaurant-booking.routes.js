const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");
const Booking = require("../models/Booking.model");
const { isLoggedIn } = require("../middleware/middleware.js");

router.get("/:id", isLoggedIn, (req, res) => {
  const id = req.params.id;

  Restaurant.findById(id)
    .then((dbData) => {
      res.render("../views/restaurants/restaurant-booking.hbs", {
        layout: req.session.currentUser ? "layouts/loggedin-layout" : "layout",
        id,
        name: dbData.name,
      });
    })
    .catch((error) => console.log(error));
});

router.post("/", isLoggedIn, (req, res) => {
  const { restaurantName, numOfPeople, date, time } = req.body;
  // return res.send(req.body);
  const userEmail = req.session.currentUser.email;

  const newBooking = new Booking({
    restaurantName,
    numOfPeople,
    date,
    time,
    userEmail,
  });
  newBooking
    .save()
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch((error) => console.log(error));
});

module.exports = router;
