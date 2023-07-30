const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");


// create product
const createProduct = asyncHandler (async(req, res)=>{
   try {
    const newProduct = await Product.create(req.body)
    res.json({
        success: true,
        message: "Successfully created a Product",
        data: newProduct
    })
   } catch (error) {
       throw new Error(error.message)
   }
})
// Get product by id
const getSingleProduct = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json({
            success: true,
            message: "Get a single Product",
            data: findProduct
        })
    } catch (error) {
        throw new Error(error.message)
    }
})
// // Get all product
// const getAllProduct = asyncHandler(async(req, res)=>{
//     try {
//         const getallProduct = await Product.find()
//         res.json({
//             success: true,
//             message: "Get All Product",
//             data: getallProduct
//         })
//     } catch (error) {
//         throw new Error(error.message)
//     }
// })
// update product
const updateProduct = asyncHandler(async( req, res)=>{
    const {id} = req.params;
    try {
        const updateaProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,

        })
        res.json({
            success: true,
            message: "Successfully updated Product",
            data: updateaProduct
        })
    } catch (error) {
        throw new Error(error.message)
    }
})
// Delete Product by id
const deleteProduct = asyncHandler(async ( req, res)=>{
    const {id} = req.params;
    try {
        const deleteaProduct = await Product.findByIdAndDelete(id)
        res.json({
            success: true,
            message: "Successfully Deleted Product",
            data: deleteaProduct
        })
    } catch (error) {
        throw new Error(error.message)

    }
})
// Filter products
const getAllProduct = asyncHandler(async( req, res)=>{
    try {
        const queryObj = {...req.query}
         const excludeFeilds = ["page","sort","limit", "fields"];
         excludeFeilds.forEach((el)=> delete queryObj[el]);
         let queryStr = JSON.stringify(queryObj);
         queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) =>`$${match}`);

         let query = Product.find(JSON.parse(queryStr))

         // Sorting
         if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
           query = query.sort(sortBy)
         }else{
             query = query.sort("-createdAt");
         }

         // Limiting the fields

         if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ")
             query = query.select(fields);

         }else{
             query = query.select("-__v");
         }

         // Pagination
         const page = req.query.page;
         const limit = req.query.limit;
         const skip =(page - 1)* limit;
         query = query.skip(skip).limit(limit);

         if(req.query.page){
            const productCount = await Product.countDocuments();
             if (skip >= productCount)
             throw new Error("THis page does not exists");
         }
      
         const product = await query;
         res.json(product)
    } catch (error) {
        
    }
})

module.exports = { 
    createProduct, 
    getSingleProduct,
    getAllProduct,
    updateProduct,
    deleteProduct 
    }