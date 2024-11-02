const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

fileRouter.get("/newFile", function (req, res) {
  console.log("newFile page reached");
  fileController.getFolders(req.user);
  res.render("./views/pages/newFile", { title: "Upload New File" });
});

module.exports = fileRouter;
