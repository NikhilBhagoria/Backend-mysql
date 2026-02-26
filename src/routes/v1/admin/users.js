const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../../../controllers/user.controller");
const authMiddleware = require("../../../middlewares/authMiddleware");
const roleMiddleware = require("../../../middlewares/roleMiddleware");

// Get all users (Admin only)
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllUsers);

// Delete a user (Admin only)
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
