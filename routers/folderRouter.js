const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

folderRouter.get("/newFolder", (req, res) => {
  console.log("newFolder get route reached");
  res.render("./views/pages/newFolder", { title: "New Folder" });
});

folderRouter.post(
  "/newFolder",
  folderController.createFolder,
  async (req, res) => {
    res.render("./views/pages/home", {
      title: "Success!",
      message: "Created new folder",
      user: req.user,
    });
  }
);

folderRouter.get("/openFolder/:folderId", (req, res) => {
  console.log("openFolder get route reached");
  const folderId = req.params.folderId;
  console.log(`folderId: ${folderId}`);
  res.send("open folder with id: " + folderId);
});

folderRouter.get("/editFolder/:folderId", (req, res) => {
  console.log("editFolder get route reached");
  const folderId = req.params.folderId;
  console.log(`folderId: ${folderId}`);
  res.send("edit folder");
});


folderRouter.post("/editFolder/:folderId", (req, res) => {
  console.log("editFolder post route reached");
  const folderId = req.params.folderId;
  console.log(`folderId: ${folderId}`);
  res.send("edit folder");
});

folderRouter.post("/deleteFolder/:folderId", (req, res) => {
  console.log("deleteFolder post route reached");
  const folderId = req.params.folderId;
  console.log(`folderId: ${folderId}`);
  res.send("delete folder");
});

module.exports = folderRouter;
