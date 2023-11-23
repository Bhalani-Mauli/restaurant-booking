const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/", (req, res, next) => {
//   res.render("index", {
//     layout: req.session.currentUser ? "layouts/loggedin-layout" : "layout",
//   });
// });

module.exports = router;
