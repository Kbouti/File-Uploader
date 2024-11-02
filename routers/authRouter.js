const { Router } = require("express");
const authRouter = Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

passport.serializeUser(function (user, done) {
  done(null, user);
});
// I suspect I need to add some logic to my deserialize user function below, re-reading the authentication lesson and passport documentation:
// https://www.theodinproject.com/lessons/node-path-nodejs-authentication-basics
// http://www.passportjs.org/concepts/authentication/
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(`localStrategy triggered`);
    try {
      // Find user with prisma query
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        console.log(`No user found with username: ${username}`);
        return done(null, false, { message: "Incorrect username" });
        // I'd really like to know how to render the above message^^^ It's stored in the session, yes??
      }
      if (user.password !== password) {
        console.log(`User found with username: ${username}`);
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

authRouter.post(
  "/logIn",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/logIn",
  })
);

authRouter.post("/logOut", function (req, res, next) {
  console.log("logout called");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

authRouter.post("/signUp", async (req, res, next) => {
  console.log(`signUp function called`);

  const newUser = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
      is_admin: false,
      Folders: {
        create: {
          name: req.body.username + "_main",
          base: true,
        },
      },
    },
  });
  console.log(`newUser created: ${JSON.stringify(newUser)}`);
  // So newUser here is indeed the user object we're trying to login

  req.user = newUser;

  // This login function is called but it does not do what we want.
  // We get the error: Cannot set headers after the request has already been sent
  // ...No longer getting that error message
  req.login(req.user, function (err) {
    console.log("Trying to login new user");
    console.log(`req.user: ${JSON.stringify(req.user)}`);

    if (err) {
      console.error(err);
      return next(err);
    }
  });

  res.render("views/pages/home", { user: req.user });
});

module.exports = authRouter;

// 1. Need password encryption
// 2. Need error handling if passwords don't match/username is already taken
// 3. Need to log the new user in

// using video playlist from Odin to better understand cookies and session. On video 3:
// https://www.youtube.com/watch?v=J1qXK66k1y4&list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK&index=3

// documentation on express session stores: talking about session stores @ 8.5 minutes
// https://www.npmjs.com/package/express-session

// Session store we'll be using for our prisma database connection:
// https://www.npmjs.com/package/@quixo3/prisma-session-store
