const express = require("express");
const session = require("express-session");
const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
// require("dotenv").config();

const indexRouter = require("./routers/indexRouter");
const authRouter = require("./routers/authRouter")

const app = express();

app.use(express.static("public"));
app.set("views", __dirname);
app.set("view engine", "pug");

const secret = process.env.SECRET;
app.use(session({ secret, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// ******************************************************************************************
// From prisma session store setup:

const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);






// ******************************************************************************************

// const { PrismaClient } = require('@prisma/client')

// const prisma = new PrismaClient()
// // use `prisma` in your application to read and write data in your DB

app.listen(3000, () => console.log("app listening on port 3000!"));

app.use("/", indexRouter);
app.use('/', authRouter);