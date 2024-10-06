const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the directory for EJS templates

// Serve static files from the "assets" and "vendor" directories
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/vendor", express.static(path.join(__dirname, "vendor")));

// Serve HTML files for specific routes
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/browse", (req, res) => {
    res.render("browse", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/details", (req, res) => {
    res.render("details", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/profile", (req, res) => {
    res.render("profile", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/streams", (req, res) => {
    res.render("streams", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
