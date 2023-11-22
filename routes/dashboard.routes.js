const express = require("express");
const router = express.Router();

/* Import auth middleware route */
const { isLoggedIn, isLoggedOut } = require("../middleware/middleware.js");

/* GET dashboard route */
router.get("/", isLoggedIn, (req, res) => {
  res.render("dashboard/dashboard.hbs", {
    userInSession: req.session.currentUser,
  });
});

module.exports = router;
