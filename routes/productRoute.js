const express = require("express")
const router = express.Router()
const { 
    createProduct,
    getSingleProduct,
    getAllProduct
} = require("../controllers/productCtrl")

router.post("/", createProduct)
router.get("/:id", getSingleProduct)
router.get("/", getAllProduct)

module.exports = router