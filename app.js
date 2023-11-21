// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "restaurant-booking";

app.locals.appTitle = `${capitalize(projectName)}`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const restaurantRoutes = require("./routes/restaurant.routes");
const restaurantListRoutes = require("./routes/restaurant-list.routes");

app.use("/restaurants", restaurantRoutes);
app.use("/restaurants/list", restaurantListRoutes);

const signUpRoutes = require("./routes/signup.routes");
app.use("/auth", signUpRoutes);

const loginRoutes = require("./routes/login.routes");
app.use("/auth", loginRoutes);

const dashboardRoutes = require("./routes/dashboard.routes");
app.use("/dashboard", dashboardRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
