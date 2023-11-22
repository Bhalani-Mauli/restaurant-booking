const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");
const Booking = require("../models/Booking.model");

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Restaurant.findById(id)
    .then((dbData) => {
      res.render("../views/restaurants/restaurant-booking.hbs", {
        id,
        name: dbData.name,
      });
    })
    .catch((error) => console.log(error));
});

router.post("/", (req, res) => {
  const { numOfPeople, date, time } = req.body;

  const newBooking = new Booking({
    numOfPeople,
    date,
    time,
  });

  newBooking
    .save()
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch((error) => console.log(error));
});

module.exports = router;
