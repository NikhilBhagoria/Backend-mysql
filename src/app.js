require('dotenv').config({ override: true });
const express = require('express');
const app = express();
const healthRoutes = require("./routes/health.routes");
const v1Routes = require("./routes/v1");

app.use(express.json());
app.use("/health", healthRoutes);

// V1 API Routes
app.use("/api/v1", v1Routes);

app.get("/", (req, res) => {
    res.send("Hello World!");
})
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
