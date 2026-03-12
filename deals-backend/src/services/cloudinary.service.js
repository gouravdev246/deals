const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Ensure Cloudinary is configured
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "deals_products", // The folder name in your Cloudinary account
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
});

const uploadImage = multer({ storage: storage });

module.exports = uploadImage;