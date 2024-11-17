const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getFolders = async (user) => {
  console.log(`getFolders called for user: ${user.username}`);
  const folders = await prisma.folder.findMany({
    where: {
      owner: user,
    },
    orderBy: [
      {
        base: "desc",
      },
      {
        name: "asc",
      },
    ],
  });
  return folders;
};

exports.createFolder = async (req, res, next) => {
  console.log(`Create folder controller function called`);
  if (
    req.body.folderName === "MAIN" ||
    req.body.folderName === req.user.username + "_main"
  ) {
    res.render("./views/pages/home", {
      title: "Prohibited Folder Name",
      message:
        "Cannot create folder. This name is reserved for your default folder.",
    });
    return;
  }
  const usersFolders = await this.getFolders(req.user);
  let folderNames = [];
  usersFolders.forEach((folder) => {
    folderNames.push(folder.name);
  });
  if (folderNames.includes(req.body.folderName)) {
    res.render("./views/pages/home", {
      title: "Duplicate Name Failure",
      message:
        "Cannot create folder. You already have a folder with this name.",
    });
    return;
  }
  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      Folders: {
        create: {
          name: req.body.folderName,
        },
      },
    },
  });
  next();
};

exports.editFolderGet = async (req, res, next) => {
  console.log(`editFolderGet controller function called`);
  const folderId = req.params.folderId;
  console.log(`folderId: ${folderId}`);

  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
  });
  const oldName = folder.name;
  // Need to adapt this if folder is main/base folder
  // Or do we even want the ability to edit the main/base folder?

  res.render("./views/pages/editFolder", {
    title: `Edit ${oldName} Folder`,
    oldName,
  });
};

exports.editFolderPost = async (req, res, next) => {
  console.log(`editFolderPost controller function called`);

  const folderId = req.params.folderId;
  const newName = req.body.folderName;

  console.log(`folderId: ${folderId}`);
// We haven't gotten folderId correctly yet, that's why our prisma operation isn

const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
  });

const userId = folder.ownerId;

console.log(`ownerId: ${userId}`);


//   await prisma.folder.update({
//     where: {
//       id: folderId,
//     },
//     data: {
//       name: newName,
//     },
//   });

res.redirect("/");

//   res.render("./views/pages/home", {
//     title: "Success!",
//     message: "Folder name updated",
//     user: req.user,
//   });

  //   This gets called when the edit folder form gets submitted.
  // First we need to render a form to edit the folder
};
