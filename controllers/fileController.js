const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dgduxhvpu",
});

// This is an example from the cloudinary tutorial, it should fetch the url from our ebikeBeach image.
// A good next step would be to try to render this image. Then we can focus on actually uploading and fetching our files here in the backend
// https://www.youtube.com/watch?v=2Z1oKtxleb4
const url = cloudinary.url("eBikeBeach_copy_lo6zga", {
  transformations: [
    {
      fetch_format: "auto",
    },
    { quality: "auto" },
    { width: 1200 },
  ],
});

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

  // This Successfully creates a file entry in our database. It's unclear if it's actually storing the file in the database or just the metadata.
  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      Files: {
        create: {
          name: originalName,
          folder: {
            connect: {
              id: folderId,
            },
          },
        },
      },
    },
  });

  next();
};

// We should be able to rename the files that are uploaded as well as direct them to the database we want to
// https://www.youtube.com/watch?v=i8yxx6V9UdM
