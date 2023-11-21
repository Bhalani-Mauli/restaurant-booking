const express = require("express");
const router = express.Router();

/* GET Dashboard */
router.get("/", (req, res) => {
  res.render("../views/dashboard/dashboard.hbs");
});

module.exports = router;
