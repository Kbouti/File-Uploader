const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgduxhvpu",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
// This works!! If we redirect to this url it will display our image.
// So we need to combine our multer and cloudinary code to upload our files to cloudinary and then store the link url in our database.

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
  // req.file should be the file that was uploaded

  const originalName = req.file.originalname;
  const folderId = req.body.folder;
  const fileType = req.file.mimetype;
  const size = req.file.size;

  // We need to upload our file to cloudinary here
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path, {
      public_id: originalName,
    })
    .catch((error) => {
      console.log(error);
    });


  // This Successfully creates a file entry in our database. It stores the url for the image on cloudinary
  await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      Files: {
        create: {
          name: originalName,
          url: uploadResult.url,
          fileType: fileType,
          fileSize: size,
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
