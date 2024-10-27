const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");

/* GET home page. */
indexRouter.get(
  "/",
  function (req, res, next) {
    if (!req.user) {
      return res.render("./views/pages/home", { title: "File Uploader" });
    }
    next();
  },
  function (req, res, next) {
    res.locals.filter = null;
    res.render("./views/pages/home", {
      title: "File Uploader",
      user: req.user,
    });
  }
);

/* GET signUp page. */
indexRouter.get("/signUp", userController.getSignUp);

/* GET logIn page. */
indexRouter.get("/logIn", userController.getLogIn);

module.exports = indexRouter;
