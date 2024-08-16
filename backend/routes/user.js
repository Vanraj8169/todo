const express = require("express");
const router = express.Router();
const zod = require("zod");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signupBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signInBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid Input Data",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  if (existingUser) {
    return res.status(411).json({
      message: "Username already taken",
    });
  }

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );

  return res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signInBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid User Inputs",
    });
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).json({
      message: "Invalid Username or password",
    });
  }

  // Comparing the password
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return res.json({
    message: "Sign-in successfull",
    token: token,
  });
});
module.exports = router;
