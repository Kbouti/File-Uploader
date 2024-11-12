const fileController = require("../controllers/fileController");
const folderController = require("../controllers/folderController");

exports.getHome = async (req, res, next) => {
    if (!req.user) {
      console.log(`get HOME route reached, NO user detected`);
      return res.render("./views/pages/home", { title: "File Uploader" });
    } else {
      console.log(`get HOME route reached, user IS detected`);
      // Commented out below line because I'm not sure what it does and it seems to work fine without it?
      // res.locals.filter = null;
      const folders = await folderController.getFolders(req.user);
      res.render("./views/pages/home", {
        title: "File Uploader",
        user: req.user,
        folders,
      });
    }
    next();
};

exports.getSignUp = (req, res, next) => {
  console.log(`getSignUp route reached`);
  res.render("./views/pages/signUp", { title: "Sign Up" });
  next();
};

exports.getLogin = (req, res, next) => {
  console.log(`getLogIn route reached`);
  res.render("./views/pages/logIn", { title: "Log In" });
  next();
};
