const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");


indexRouter.get("/", indexController.getIndex);

indexRouter.get("/logUsers", indexController.logUsers)


module.exports = indexRouter;