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

folderRouter.get("/openFolder", (req, res) => {
  console.log("openFolder get route reached");
  // res.render("./views/pages/openFolder", { title: "New Folder" });

  console.log(`req.params: ${JSON.stringify(req.params)}`);
  // This is an empty object, trying to get folder id

  // console.log(`json(req): ${JSON.stringify(req)}`)
  // This^^ gets error. Below gets [object Object]
  console.log(`req: ${req}`);
  res.send("open folder");
});

folderRouter.get("/editFolder", (req, res) => {
  console.log("editFolder get route reached");
  // res.render("./views/pages/openFolder", { title: "New Folder" });
  res.send("edit folder");
});

module.exports = folderRouter;