const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all users
const getAllUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching users");
        } else {
            res.json(result);
        }
    });
};

// Create a new user
const createUser = (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).send("Email already exists");
            }
            res.status(500).send("Error creating user");
        } else {
            res.json(result);
        }
    });
};

// Update a user
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [name, email, hashedPassword, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error updating user");
        } else {
            res.json(result);
        }
    });
};

// Delete a user
const deleteUser = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting user");
        } else {
            res.json(result);
        }
    });
};

// Login
const loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }
    // check if user exists
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error");
        }

        if (result.length === 0) {
            return res.status(401).send("Invalid credentials");
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Server error");
            }

            if (!isMatch) {
                return res.status(401).send("Invalid password");
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            // Refresh Token
            const refreshToken = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    email: user.email
                },
                token,
                refreshToken
            });
        });
    });
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};
