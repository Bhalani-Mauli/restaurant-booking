const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .then((dbData) => {
      console.log(dbData);
      res.render("../views/restaurants/restaurant-details.hbs", {
        layout: req.session.currentUser ? "layouts/loggedin-layout" : "layout",
        id,
        name: dbData.name,
        typeOfCuisine: dbData.typeOfCuisine,
        rating: dbData.rating,
        street: dbData.street,
        city: dbData.city,
        pincode: dbData.pincode,
        image: dbData.image,
      });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
