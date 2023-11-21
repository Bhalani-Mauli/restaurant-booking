const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");

router.get("/", (req, res, next) => {
  const perPage = 5;
  const page = Math.max(0, req.query.page || 0);

  Restaurant.find()
    .limit(perPage)
    .skip(perPage * page)
    .then((allrestaurantsFromDB) => {
      const countPromise = Restaurant.countDocuments();
      return Promise.all([allrestaurantsFromDB, countPromise]);
    })
    .then(([allrestaurantsFromDB, totalRestaurants]) => {
      const totalPages = Math.ceil(totalRestaurants / perPage);
      const prevPage = Math.max(0, page - 1);
      const nextPage = Math.min(totalPages - 1, page + 1);
      const isAdmin = true; //TODO: change this when login and signup is done
      res.render("restaurants/restaurant-list.hbs", {
        restaurants: allrestaurantsFromDB,
        page: page,
        pages: totalPages,
        nextPage,
        prevPage,
        isAdmin,
      });
    })
    .catch((error) => {
      console.error("Error while getting the restaurant from the DB:", error);
      next(error);
    });
});

module.exports = router;
