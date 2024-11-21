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

  // req/file should be the file that was uploaded
  console.log(`req.file: ${req.file}`);

  const originalName = req.file.originalname;
  console.log(`originalName: ${originalName}`);

  // We need to upload our file to cloudinary here
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path, {
      public_id: originalName,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(`uploadResult: ${uploadResult}`);
  // I believe this seems to have worked..... We need to get a url from cloudinary to store in our database.

  console.log(`JSON.stringify(uploadResult.url): ${JSON.stringify(uploadResult)}`);

  console.log(`uploadResult.url: ${uploadResult.url}`);

// *****************************************************************************************************************************************************************
// Continue here




  const folderId = req.body.folder;
  console.log(`folderId: ${folderId}`);

  // const folder = await prisma.folder.findUnique({
  //   where: {
  //     id: folderId,
  //   },
  // });
  // console.log(`json.folder: ${JSON.stringify(folder)}`);


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
          url: uploadResult.url,
          fileType: fileType,
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
