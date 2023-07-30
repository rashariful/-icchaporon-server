const User = require("../models/userModule");
const asynceHandler = require("express-async-handler");
const userModule = require("../models/userModule");
const { get } = require("mongoose");
const { generateToken } = require("../config/jwtToken");


const createUser = asynceHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        // create user
        const newUser = User.create(req.body)
        res.json({
            success: true,
            message: "Successfully Created a User",
            data: newUser
        })
    } else {
        throw new Error('User Already Exist')
    }
})

const loginUserCtrl = asynceHandler(async(req, res)=>{
    const {email, password}= req.body;
   //check email and password
   const findUser = await User.findOne( {email} )
   if(findUser && await findUser.isPasswordMatched(password)){
    res.json({
        _id: findUser._id,
        name:findUser.name,
        email: findUser.email,
        mobile: findUser.mobile,
        token: generateToken(findUser._id)
    })
   }else{
    throw new Error("Invalid Credentials")
   }
})

// get all users
const getAllUser = asynceHandler(async(req, res)=>{
   try {
       const getUsers = await User.find()
       res.json({
        success: true,
        message: "Successfully Get All User",
        data: getUsers
       })
   } catch (error) {
    
   }
})

// get a single user
const getSingleUser = asynceHandler(async(req, res)=>{
    const {id} = req.params;
    try {
        const getaUser = await User.findById(id);
        res.json({
            success: true,
            message: "Successfully Get a User",
            data: getaUser
        })
    } catch (error) {
        throw new Error(error.message)
    }
})

// Delete a user
const deleteSingleUser = asynceHandler(async(req, res)=>{
    const {id} = req.params;
    try {
        const deleteaUser = await User.findByIdAndDelete(id)
        res.json({
            success: true,
            message: "Successfully Deleted User",
            data: deleteaUser
        })
    } catch (error) {
        throw new Error('error.message')
    }
})

// update a user
const updateSingleUser = asynceHandler( async( req, res) =>{
    const {_id} = req.user;
    try {
        const updateaUser = User.findByIdAndUpdate(
            _id,
            {
                name:req?.body?.name,
                email:req?.body?.email,
                mobile:req?.body?.mobile
            },
            {
                new: true
            }
            
            );
            res.json(updateaUser)
        
        
    } catch (error) {
        throw new Error(error.message)
    }
})


module.exports = { 
    createUser, 
    loginUserCtrl, 
    getAllUser, 
    getSingleUser,
    deleteSingleUser,
    updateSingleUser
     }