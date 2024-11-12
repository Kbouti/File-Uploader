const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");


folderRouter.get("/newFolder",  (req, res) => {
  console.log("newFolder get route reached");
  res.render("./views/pages/newFolder", { title: "New Folder" });
});

folderRouter.post("/newFolder", folderController.createFolder, async (req, res) => {
  res.render("./views/pages/home", {title: "Success!", message: "Created new folder", user: req.user});
});

module.exports = folderRouter;
