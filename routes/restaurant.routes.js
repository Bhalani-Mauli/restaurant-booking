const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");

router.get("/create", (req, res) =>
  res.render("../views/restaurants/restaurant-create.hbs")
);

router.post("/create", (req, res, next) => {
  const {
    name,
    email,
    street,
    pincode,
    city,
    typeOfCuisine,
    rating,
    image,
    restaurantOnBoarded,
  } = req.body;
  Restaurant.create({
    name,
    email,
    street,
    pincode,
    city,
    typeOfCuisine,
    rating,
    image,
    restaurantOnBoarded,
  })
    .then((dbRestaurant) => {
      //TODO: redirect to proper page
      res.send(
        "<h2>Data saved successfully.TODO: create a new page for restaurant/id</h2>"
      );
    })
    .catch((error) => next(error));
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .then((dbData) => {
      res.render("../views/restaurants/restaurant-edit.hbs", {
        id,
        name: dbData.name,
        email: dbData.email,
        street: dbData.street,
        city: dbData.city,
        pincode: dbData.pincode,
        rating: dbData.rating,
        typeOfCuisine: dbData.typeOfCuisine,
        restaurantOnBoarded: dbData.restaurantOnBoarded,
      });
    })
    .catch((error) => console.log(error));
});

router.post("/edit/:id", (req, res, next) => {
  const { id } = req.params;

  const {
    name,
    email,
    street,
    pincode,
    city,
    typeOfCuisine,
    rating,
    image,
    restaurantOnBoarded,
  } = req.body;

  Restaurant.findByIdAndUpdate(
    id,
    {
      name,
      email,
      street,
      pincode,
      city,
      typeOfCuisine,
      rating,
      image,
      restaurantOnBoarded,
    },
    { new: true }
  )
    .then((dbRestaurant) => {
      res.send("<h2>Data Updated successfully.");
    })
    .catch((error) => next(error));
});
module.exports = router;
