//!requiring

const cloudinary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary")
//!config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
}
)
//!setting up cloudinary

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "Tentra",
        allowed_formats: ["jpeg", "png", "jpg"]
    }
})

module.exports = {
    cloudinary,storage
}