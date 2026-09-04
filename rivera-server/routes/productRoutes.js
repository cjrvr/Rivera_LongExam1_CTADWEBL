const express = require("express");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require("../controllers/productController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllProducts);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createProduct
);

router.get("/:id", getProductById);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateProduct
);

module.exports = router;