const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
// require("dotenv").config();


const app = express();

app.use(express.static("public"));
app.set("views", __dirname);
app.set("view engine", "pug");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.listen(3000, () => console.log("app listening on port 3000!"));

// app.use("/", indexRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
})
