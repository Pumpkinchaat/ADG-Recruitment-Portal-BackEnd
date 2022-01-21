const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_NAME,
  api_secret: process.env.CLOUD_NAME,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ADG_Questions",
    format: ['jpeg' , 'png']
  },
});

module.exports = {
  storage,
  cloudinary
};