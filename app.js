const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
// require("dotenv").config();

const indexRouter = require("./routers/indexRouter");

const app = express();

app.use(express.static("public"));
app.set("views", __dirname);
app.set("view engine", "pug");


// Secret copied from setup tutorial is "cats". I changed this and set it in .env
// Not sure if this will break things....
const secret = process.env.SECRET;

app.use(session({ secret, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));



// const { PrismaClient } = require('@prisma/client')

// const prisma = new PrismaClient()
// // use `prisma` in your application to read and write data in your DB




app.listen(3000, () => console.log("app listening on port 3000!"));

app.use("/", indexRouter);
