const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");


/* GET home page. */
indexRouter.get('/', function(req, res, next) {
    if (!req.user) { return res.render("./views/pages/home", { title: "File Uploader" }); }
    next();
  }, function(req, res, next) {
    res.locals.filter = null;
    res.render("./views/pages/home", { title: "File Uploader", user: req.user });
  });

// ***** Refactored *****
// Now we're getting our index route here, but we ar egoing to try to move authorization routes to routers/authRouter file


// Some Success!! We have successfully logged in a user in the authRouter. Can't logout. But logged in! 




indexRouter.get("/signUp", userController.getSignUp)

indexRouter.post("/signUp", userController.postSignUp)

indexRouter.get("/logIn", userController.getLogIn)

// indexRouter.post("/logIn", userController.postLogin)


module.exports = indexRouter;