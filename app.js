const express = require("express");
const session = require("express-session");
const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
// require("dotenv").config();

const indexRouter = require("./routers/indexRouter");
const authRouter = require("./routers/authRouter");

const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

// I kinda don't think we need the below line here, since we're not accessing prisma anywhere. Just prisma-session-store
// const prisma = new PrismaClient()

const app = express();

app.use(express.static("public"));
app.set("views", __dirname);
app.set("view engine", "pug");

const secret = process.env.SECRET;
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
    // My attempt to add a cookie:
    cookie: {
      value: "This is the cookie I set. It lasts one day. ",
      maxAge: 1000 * 60 * 60 * 24, //miliseconds/second times seconds/minute times minutes/hour times hours/day
    },
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => console.log("app listening on port 3000!"));

app.use("/", indexRouter);
app.use("/", authRouter);
