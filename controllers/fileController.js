const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getFolders = async (user) => {
  console.log(`getFolders called for user: ${user.username}`);
  const folders = await prisma.folder.findMany({
    where: {
      owner: user,
    },
  });
  console.log(`folders: ${JSON.stringify(folders)}`);
  return folders;
};

exports.createFolder = async (req, res, next) => {
  console.log(`Create folder controller function called`);
  console.log(`req.body.folderName: ${req.body.folderName}`);

  if (
    req.body.folderName === "MAIN" ||
    req.body.folderName === req.user.username + "_main"
  ) {
    res.render("./views/pages/home", {
      title: "Failure",
      message:
        "Cannot create folder. This name is reserved for your main folder.",
    });
    return;
  }
  // Next we'll want to create a new folder in our database. Neither of these attempts worked....
  // We need to figure out how to create the folder in prisma

  //   await prisma.user.upsert({
  //     where: {
  //       id: req.user.id,
  //     },
  //     create: {
  //       Folder: {
  //         base: false,
  //         name: req.body.folderName,
  //       },
  //     },
  //   });

  //   await prisma.folder.create({data: {
  //     owner: req.user,
  //     base: false,
  //     name: req.body.folderName
  //   }})

  next();
};

// We should be able to rename the files that are uploaded as well as direct them to the database we want to
// https://www.youtube.com/watch?v=i8yxx6V9UdM
