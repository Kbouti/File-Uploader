const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
// const userController = require("../controllers/userController");

/* GET home page. */
indexRouter.get(
  "/",
  function (req, res, next) {
    console.log(`getSignUp route reached, NO user detected`);
    if (!req.user) {
      return res.render("./views/pages/home", { title: "File Uploader" });
    }
    next();
  },
  function (req, res, next) {
    console.log(`getSignUp route reached, user IS detected`);
    res.locals.filter = null;
    res.render("./views/pages/home", {
      title: "File Uploader",
      user: req.user,
    });
  }
);

/* GET signUp page. */
indexRouter.get("/signUp", function (req, res, next) {
  console.log(`getSignUp route reached`);
  res.render("./views/pages/signUp", { title: "Sign Up" });

});

/* GET logIn page. */
indexRouter.get("/logIn", function (req, res, next) {
  console.log(`getLogIn route reached`);
  res.render("./views/pages/logIn", { title: "Log In" });

});

module.exports = indexRouter;
