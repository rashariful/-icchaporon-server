const express = require("express")
const router = express.Router()
const { 
    createProduct,
    getSingleProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productCtrl")

const { authMiddleware , isAdmin} = require ("../middleware/authMiddleware")

router.post("/", createProduct)
router.get("/:id", authMiddleware, isAdmin, getSingleProduct)
router.put("/:id", authMiddleware, isAdmin, updateProduct)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct)
router.get("/", getAllProduct)

module.exports = router