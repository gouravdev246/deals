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
        folder: "deals_products",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        resource_type: "auto",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
    },
});

const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB max per file
    },
});

module.exports = uploadImage;