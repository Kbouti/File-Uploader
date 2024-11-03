const { Router } = require("express");
const indexRouter = Router();

const fileController = require("../controllers/fileController");

/* GET home page. */
indexRouter.get(
  "/",
  (req, res, next) => {
    if (!req.user) {
      console.log(`get HOME route reached, NO user detected`);
      return res.render("./views/pages/home", { title: "File Uploader" });
    }
    next();
  },
  async (req, res, next) => {
    console.log(`get HOME route reached, user IS detected`);
    // Commented out below line because I'm not sure what it does and it seems to work fine without it?
    // res.locals.filter = null;
    const folders = await fileController.getFolders(req.user);
    res.render("./views/pages/home", {
      title: "File Uploader",
      user: req.user,
      folders,
    });
  }
);

/* GET signUp page. */
indexRouter.get("/signUp", (req, res, next) => {
  console.log(`getSignUp route reached`);
  res.render("./views/pages/signUp", { title: "Sign Up" });
});

/* GET logIn page. */
indexRouter.get("/logIn", (req, res, next) => {
  console.log(`getLogIn route reached`);
  res.render("./views/pages/logIn", { title: "Log In" });
});

module.exports = indexRouter;
