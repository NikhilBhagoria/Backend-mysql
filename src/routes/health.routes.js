const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/db", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      return res.status(500).json({
        status: "DOWN",
        database: "NOT CONNECTED",
        error: err.code
      });
    }
    res.json({
      status: "UP",
      database: "CONNECTED"
    });
  });
});

module.exports = router;
