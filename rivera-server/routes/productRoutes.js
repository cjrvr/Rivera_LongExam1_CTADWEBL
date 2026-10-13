const express = require("express");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  uploadProductImage,
} = require("../controllers/productController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadImageMiddleware");
const validateImageContent = require("../middleware/validateImageContent");

const router = express.Router();

router.get("/", getAllProducts);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  validateImageContent,
  createProduct
);

router.get("/:id", getProductById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  validateImageContent,
  updateProduct
);

router.post(
  "/:id/upload-image",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  validateImageContent,
  uploadProductImage
);

module.exports = router;