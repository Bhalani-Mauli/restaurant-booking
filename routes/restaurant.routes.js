const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");
const { isLoggedIn } = require("../middleware/middleware.js");
const fileUploader = require("../config/cloudinary.config");

router.get("/create", isLoggedIn, (req, res) =>
  res.render("../views/restaurants/restaurant-create.hbs", {
    layout: req.session.currentUser ? "layouts/loggedin-layout" : "layout",
  })
);

router.post("/create", fileUploader.single("image"), (req, res, next) => {
  const {
    name,
    email,
    street,
    pincode,
    city,
    openingTime,
    closingTime,
    typeOfCuisine,
    rating,
    image,
    restaurantOnBoarded,
  } = req.body;

  const reqBody = {
    name,
    email,
    street,
    pincode,
    city,
    openingTime,
    closingTime,
    typeOfCuisine,
    rating,
    restaurantOnBoarded,
  };

  if (req.file?.path) {
    reqBody.image = req.file.path;
  }
  Restaurant.create(reqBody)
    .then((dbRestaurant) => {
      //TODO: redirect to proper page
      res.redirect("/dashboard");
    })
    .catch((error) => next(error));
});

router.get("/edit/:id", isLoggedIn, (req, res) => {
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

router.post("/edit/:id", isLoggedIn, (req, res, next) => {
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
      res.redirect("/restaurants/list/");
    })
    .catch((error) => next(error));
});
module.exports = router;
