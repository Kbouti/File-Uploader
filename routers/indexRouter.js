const { Router } = require("express");
const indexRouter = Router();

const fileController = require("../controllers/fileController");

/* GET home page. */
indexRouter.get(
  "/",
  function (req, res, next) {
    if (!req.user) {
      console.log(`get HOME route reached, NO user detected`);
      return res.render("./views/pages/home", { title: "File Uploader" });
    }
    next();
  },
  function (req, res, next) {
    console.log(`get HOME route reached, user IS detected`);
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
  res.render("./views/pages/logIn", { title: "Log In"});
});

module.exports = indexRouter;
