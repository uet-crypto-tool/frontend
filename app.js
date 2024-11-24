const express = require("express");
const path = require("path");
require('dotenv').config();

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
    res.render("crypto-systems", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/algorithms", (req, res) => {
    res.render("crypto-algorithms", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/signatures", (req, res) => {
    res.render("crypto-signatures", {
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

app.get("/crypto-systems/rsa", (req, res) => {
    res.render("crypto-systems/rsa", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/crypto-systems/elgamal", (req, res) => {
    res.render("crypto-systems/elgamal", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/crypto-systems/ecc", (req, res) => {
    res.render("crypto-systems/ecc", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/crypto-signatures/rsa", (req, res) => {
    res.render("crypto-signatures/rsa", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/crypto-signatures/elgamal", (req, res) => {
    res.render("crypto-signatures/elgamal", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});

app.get("/crypto-signatures/ecc", (req, res) => {
    res.render("crypto-signatures/ecc", {
        title: "Home Page",
        message: "Welcome to my EJS site!",
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
