const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// *****************************************************************************************************************************************************************
// Delete functions for maintaining dev database
exports.clearAllData = async () => {
  console.log(`CLEARING ALL DATA`);
  await prisma.folder.deleteMany();
  await prisma.user.deleteMany();
};
exports.deleteAllFolders = async (user) => {
  console.log(`Deleting non-base folders for: ${user.username}`);
  await prisma.folder.deleteMany({
    where: {
      base: false,
      owner: user,
    },
  });
};
// *****************************************************************************************************************************************************************

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

exports.createFile = async (req, res, next) => {
  console.log(`Create file controller function called`);

  const folderId = req.body.folder;
  console.log(`folderId: ${folderId}`);

  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
  });

  console.log(`json.folder: ${JSON.stringify(folder)}`);

  const originalName = req.file.originalname;
  console.log(`originalName: ${originalName}`);

  const fileType = req.file.mimetype;
  console.log(`fileType: ${fileType}`);

  const size = req.file.size;
  console.log(`size: ${size}`);


// This create query still doesn't work, but I think I'm getting closer. 
// I need to "connect" the appropriate folder and user? 

  await prisma.file.create({
    data: {
      name: originalName,
      folder: {
        connect:  {
            id: folderId
        }
      },
      owner: req.user,
    },
  });

  //   await prisma.folder.update({
  //     where: {
  //       Folders: {
  //         id: folderId,
  //       },
  //       data: {
  //         File: {
  //           create: {
  //             name: originalName,
  //           },
  //         },
  //       },
  //     },
  //   });

  next();
};

// We should be able to rename the files that are uploaded as well as direct them to the database we want to
// https://www.youtube.com/watch?v=i8yxx6V9UdM
