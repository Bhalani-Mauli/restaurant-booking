const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    noOfPeople: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Number,
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
