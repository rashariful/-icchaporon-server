const express = require("express")
const router = express.Router()
const { 
    createProduct,
    getSingleProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productCtrl")

router.post("/", createProduct)
router.get("/:id", getSingleProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)
router.get("/", getAllProduct)

module.exports = router