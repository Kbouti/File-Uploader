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
    console.log('logout called')
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = authRouter;
