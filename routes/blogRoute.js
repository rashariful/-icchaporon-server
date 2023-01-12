const express = require("express");
const router = express.Router()
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware")
const { createBlog, getSingleBlog, updateBlog, deleteBlog, getAllBlog } = require("../controllers/blogCtrl");


router.post("/", authMiddleware, isAdmin, createBlog)
router.get("/:id", getSingleBlog)
router.put("/:id", authMiddleware, isAdmin, updateBlog)
router.delete("/:id", authMiddleware, isAdmin, deleteBlog)
router.get("/", getAllBlog)

module.exports = router