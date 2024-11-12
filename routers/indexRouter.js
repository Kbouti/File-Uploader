const { Router } = require("express");
const indexRouter = Router();

const indexController = require("../controllers/indexController");

/* GET home page. */
indexRouter.get("/", indexController.getHome);

/* GET signUp page. */
indexRouter.get("/signUp", indexController.getSignUp);

/* GET logIn page. */
indexRouter.get("/logIn", indexController.getLogin);

module.exports = indexRouter;
