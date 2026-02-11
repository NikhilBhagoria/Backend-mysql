const express = require("express");
const router = express.Router();
const { createUser, loginUser, updateUser } = require("../../../controllers/user.controller");
const loginLimiter = require("../../../middlewares/loginLimiter");
const authMiddleware = require("../../../middlewares/authMiddleware");

// Register (Public)
router.post("/register", createUser);

// Login (Public)
router.post("/login", loginLimiter, loginUser);

// Update Profile (Protected)
router.put("/profile/:id", authMiddleware, updateUser);

module.exports = router;
