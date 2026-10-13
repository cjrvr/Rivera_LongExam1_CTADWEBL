const validateImageContent = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const buffer = req.file.buffer;

  if (!buffer || buffer.length < 12) {
    return res.status(400).json({
      success: false,
      message: "Invalid image file.",
    });
  }

  const isJPEG =
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff;

  const isPNG =
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a;

  const isWEBP =
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP";

  if (!isJPEG && !isPNG && !isWEBP) {
    return res.status(400).json({
      success: false,
      message: "The uploaded file is not a valid image.",
    });
  }

  next();
};

module.exports = validateImageContent;