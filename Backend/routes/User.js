const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const your_jwt_secret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
    if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
    try {
    const existingUser = await User.find ({ $or: [{ username }, { email }] });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username or email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
        email,
        password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
    }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }       
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user, username: user.username }, your_jwt_secret,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email,isAdmin:user.isAdmin } });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  } 
});

module.exports = router;
