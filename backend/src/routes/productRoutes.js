const express = require("express");
const router = express.Router();

const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} = require("../controllers/productController");
const {authMiddleware, authorizeRole} = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, authorizeRole("Admin"), createProduct);
router.get("/all", authMiddleware, authorizeRole("Admin", "User"), getAllProducts);
router.get("/:productId", authMiddleware, authorizeRole("Admin", "User"), getProductById);
router.put("/:productId", authMiddleware, authorizeRole("Admin"), updateProduct);
router.delete("/:productId", authMiddleware, authorizeRole("Admin"), deleteProduct);

module.exports = router;