const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");

// Create blog
const createBlog = asyncHandler( async (req, res)=>{
    try {
        const newBlog = await Blog.create(req.body)
        res.json({
            success: true,
            message: "Successfully created a Blog",
            data: newBlog
        })
    } catch (error) {
        throw new Error(error.message)

    }
})
// Get Blog by id
const getSingleBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findBlog = await Blog.findById(id);
        res.json({
            success: true,
            message: "Get a single Blog",
            data: findBlog
        })
    } catch (error) {
        throw new Error(error.message)
    }
})
// Get all Blog
const getAllBlog = asyncHandler(async (req, res) => {
    try {
        const getallBlog = await Blog.find()
        res.json({
            success: true,
            message: "Get All Blog",
            data: getallBlog
        })
    } catch (error) {
        throw new Error(error.message)
    }
})
// update Blog
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateaBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,

        })
        res.json({
            success: true,
            message: "Successfully updated Blog",
            data: updateaBlog
        })
    } catch (error) {
        throw new Error(error.message)
    }
})
// Delete Blog by id
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteaBlog = await Blog.findByIdAndDelete(id)
        res.json({
            success: true,
            message: "Successfully Deleted Blog",
            data: deleteaBlog
        })
    } catch (error) {
        throw new Error(error.message)

    }
})
module.exports = {
    createBlog,
    getSingleBlog,
    getAllBlog,
    updateBlog,
    deleteBlog
}