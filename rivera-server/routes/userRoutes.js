const express = require("express");

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/", createUser);
router.post("/login", loginUser);

// Admin-only routes
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getUsers
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateUser
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;