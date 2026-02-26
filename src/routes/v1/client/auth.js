const express = require("express");
const router = express.Router();
const { createUser, loginUser, updateUser } = require("../../../controllers/user.controller");
const loginLimiter = require("../../../middlewares/loginLimiter");
const authMiddleware = require("../../../middlewares/authMiddleware");
const validate = require("../../../middlewares/validate.middleware");
const { loginSchema, registerSchema } = require("../../../schemas/user.schema");

// Register (Public)
router.post("/register", validate(registerSchema), createUser);

// Login (Public)
router.post("/login", loginLimiter, validate(loginSchema), loginUser);

// Update Profile (Protected)
router.put("/profile/:id", authMiddleware, updateUser);

module.exports = router;
