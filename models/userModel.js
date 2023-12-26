const mongoose = require("mongoose");

const userScheema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name must exists!"],
    },
    email: {
      type: String,
      required: [true, "Email must exists!"],
      uniq: [true, "Email already taken!"],
    },
    password: {
      type: String,
      required: [true, "Password must exists!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userScheema);
