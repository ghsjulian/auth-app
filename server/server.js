require("dotenv").config("../.env");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const PORT = 3000;

// Setup Express Middlewares
app.use(express.json({ limit: "800MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5000"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        maxAge: 86400
    })
);

app.use(express.static(path.join(__dirname, "../dist")));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "../public")));
// Define the index route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Rwequiring all the routes
// Defined All the endpoints of API...
const userRoutes = require("./routes/user.routes");
app.use("/api/v1/user", userRoutes);

// Rwequiring Database connection
// And call this method directly...
require("./configs/db.connection")();
app.listen(PORT, () => {
    console.log(`\n[+] Server Listening On Port -- ${PORT}\n`);
});
