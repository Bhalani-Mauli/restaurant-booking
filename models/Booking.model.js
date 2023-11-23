const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    restaurantName: String,
    numOfPeople: {
      type: Number,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    occasion: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
