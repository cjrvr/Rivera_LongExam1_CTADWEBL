const express = require("express");

const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("customer"),
  getCart
);

router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  addToCart
);

router.delete(
  "/:productId",
  protect,
  authorizeRoles("customer"),
  removeFromCart
);

module.exports = router;