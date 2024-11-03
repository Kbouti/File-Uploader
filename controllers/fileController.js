const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getFolders = async (user) => {
  console.log(`getFolders called for user: ${user.username}`);
  const folders = await prisma.folder.findMany({
    where: {
      owner: user,
    },
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




// We should be able to rename the files that are uploaded as well as direct them to the database we want to
// https://www.youtube.com/watch?v=i8yxx6V9UdM
