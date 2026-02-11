const express = require("express");
const router = express.Router();

const adminUserRoutes = require("./admin/users");
const clientAuthRoutes = require("./client/auth");

// Admin Routes
router.use("/admin/users", adminUserRoutes);

// Client Routes
router.use("/client/auth", clientAuthRoutes);

module.exports = router;
