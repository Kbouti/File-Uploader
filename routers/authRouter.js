const { Router } = require("express");
const authRouter = Router();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(`localStragegy triggered`);

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

module.exports = authRouter;
