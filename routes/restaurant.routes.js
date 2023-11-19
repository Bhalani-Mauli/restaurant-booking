const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");

router.get("/", (req, res) =>
  res.render("../views/restaurants/restaurant-create.hbs")
);
router.get("/", (req, res) => res.render("../views/partials/rating.hbs"));

router.post("/", (req, res, next) => {
  const { name, email, street, pincode, city, typeOfCuisine, rating, image } =
    req.body;
  Restaurant.create({
    name,
    email,
    street,
    pincode,
    city,
    typeOfCuisine,
    rating,
    image,
  })
    .then((dbRestaurant) => {
      //TODO: redirect to proper page
      res.send(
        "<h2>Data saved successfully.TODO: create a new page for restaurant/id</h2>"
      );
    })
    .catch((error) => next(error));
});

module.exports = router;
