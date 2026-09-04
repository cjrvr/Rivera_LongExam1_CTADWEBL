const express = require("express");

const {
  createReview,
  getAllReviews,
  updateReview,
} = require("../controllers/reviewController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllReviews);

router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  createReview
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateReview
);

module.exports = router;