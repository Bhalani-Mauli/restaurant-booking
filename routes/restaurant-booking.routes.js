const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");
const Booking = require("../models/Booking.model");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .then((dbData) => {
      res.render("../views/restaurants/restaurant-booking.hbs", {
        id,
        // name: dbData.name,
        // noOfPeople: dbData.noOfPeople,
      });
    })
    .catch((error) => console.log(error));
});

router.post("/dashboard", (req, res) => {
  const { noOfPeople, date, time, occasion } = req.body;

  const newBooking = new Booking({
    noOfPeople,
    date,
    time,
    occasion,
  });

  newBooking
    .save()
    .then(() => {
      // Redirect the user to the dashboard page
      res.redirect("/dashboard");
    })
    .catch((error) => console.log(error));
});

module.exports = router;
