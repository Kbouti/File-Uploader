const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");


indexRouter.get("/", indexController.getIndex);

indexRouter.get("/logUsers", indexController.logUsers)

indexRouter.get("/signUp", indexController.getSignUp)

indexRouter.post("/signUp", indexController.postSignUp)

indexRouter.get("/logIn", indexController.getLogIn)



module.exports = indexRouter;