const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");

indexRouter.get("/", indexController.getIndex);

indexRouter.get("/signUp", userController.getSignUp)

indexRouter.post("/signUp", userController.postSignUp)

indexRouter.get("/logIn", userController.getLogIn)

indexRouter.post("/logIn", userController.postLogin)


module.exports = indexRouter;