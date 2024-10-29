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
  console.log("logout called");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

authRouter.post("/signUp", async (req, res, next) => {
  console.log(`postSignUp controller function called`);

  const prismaOperation = async () => {
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
  };

  prismaOperation()
    .catch((e) => {
      console.error(e.message);
      console.log(`caught error`);
      //   Need to handle this error. This is getting triggered if we try to violate the unique constraint on username. This is a good thing. But the question is..... How do we report that back to the user
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  // 1. Need password encryption
  // 2. Need error handling if passwords don't match/username is already taken
  // 3. Need to log the new user in

// req.redirect("logIn", {username: req.username, password: req.password})

  res.redirect("/");
});

module.exports = authRouter;


// using video playlist from Odin to better understand cookies and session. On video 3:
// https://www.youtube.com/watch?v=J1qXK66k1y4&list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK&index=3

// documentation on express session stores: talking about session stores @ 8.5 minutes
// https://www.npmjs.com/package/express-session

// Session store we'll be using for our prisma database connection:
// https://www.npmjs.com/package/@quixo3/prisma-session-store