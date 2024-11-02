const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

fileRouter.get("/newFile", function (req, res) {
  console.log("newFile page reached");
  fileController.getFolders(req.user);
  res.render("./views/pages/newFile", { title: "Upload New File" });
});

fileRouter.get("/newFolder", function (req, res) {
    console.log("newFolder page reached");
    res.render("./views/pages/newFolder", { title: "New Folder" });
  });



module.exports = fileRouter;
