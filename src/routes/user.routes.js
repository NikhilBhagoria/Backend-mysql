const express = require("express");
const router = express.Router();
const { getAllUsers, createUser, updateUser, deleteUser, loginUser } = require("../controllers/user.controller");
const loginLimiter = require("../middlewares/loginLimiter");
const authMiddleware = require("../middlewares/authMiddleware");

// Get all users
router.get("/", getAllUsers);

// Create a new user
router.post("/", createUser);

// Update a user
router.put("/:id", authMiddleware, updateUser);

// Delete a user
router.delete("/:id", authMiddleware, deleteUser);

// Login
router.post("/login", loginLimiter, loginUser);

module.exports = router;