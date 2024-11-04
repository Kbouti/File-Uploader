const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

// From multer documentation:
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

fileRouter.get("/newFile", async (req, res) => {
  console.log("newFile page reached");
  const folders = await fileController.getFolders(req.user);
  res.render("./views/pages/newFile", { title: "Upload New File", folders });
});

fileRouter.get("/newFolder",  (req, res) => {
  console.log("newFolder page reached");
  res.render("./views/pages/newFolder", { title: "New Folder" });
});

fileRouter.post("/newFolder", fileController.createFolder, async (req, res) => {
  res.render("./views/pages/home", {title: "Success!", message: "Created new folder", user: req.user});
});

fileRouter.post("/newFile", upload.single("newFile"), async (req, res) => {

// Add prisma operation to save file. 

// console.log(`req.body: ${req.body}`);
console.log(`req.body json: ${JSON.stringify(req.body)}`)
console.log(`req.file: ${JSON.stringify(req.file)}`);
// ^^ Excellent! THIS is our file. 

const file = req.file;


  res.redirect("/");
});

module.exports = fileRouter;
