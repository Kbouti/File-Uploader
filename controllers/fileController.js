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

    // Next we'll want to create a new folder in our database. BUUUUUT we should make sure we don't name it the same as our base folder to avoid confusion. 


    next()
}

