const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

// document structure
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!isEmail(value)) {
        throw new Error("Invalid Email ID");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
  },
  message: {
    type: String,
    required: true,
    min: 3,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// create collections
const User = mongoose.model("User", userSchema);

module.exports = User;
