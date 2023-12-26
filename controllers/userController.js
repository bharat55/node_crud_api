const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/userModel");

//@desc To fetch current USer
//@route get /api/users/current
//aceess public

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//@desc POST create a user
//@route POST /api/users/register
//access public

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) {
    res.status = 400;
    throw new Error("All fields are mandatory");
  }

  const userAvailable = User.findOne({ email: email });

  if (userAvailable) {
    res.status = 400;
    throw new Error("User with email already exists!");
  }

  const encryptesPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: encryptesPassword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc Log In User
//route POST /api/users/login
//access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status = 400;
    throw new Error("Email and password required");
  }

  const user = User.findOne({ email: email });
  if (!user) {
    res.status = 400;
    throw new Error("User not exists with provided email");
  }

  if (await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "20m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status = 400;
    throw new Error("Invalid Password");
  }
});

module.exports = { currentUser, loginUser, registerUser };
