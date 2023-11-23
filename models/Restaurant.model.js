const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: Number,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    openingTime: {
      type: String,
    },
    closingTime: {
      type: String,
    },
    typeOfCuisine: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    restaurantOnBoarded: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default: "/images/default-restaurantImg.png", // TODO: will handle images later
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
