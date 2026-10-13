const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/octet-stream",
    ];

    const allowedExtensions = /\.(jpg|jpeg|png|webp)$/i;

    const validMimeType = allowedMimeTypes.includes(file.mimetype);
    const validExtension = allowedExtensions.test(
      path.extname(file.originalname)
    );

    if (validMimeType && validExtension) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, PNG, and WEBP images are allowed."));
    }
  },
});

module.exports = upload;