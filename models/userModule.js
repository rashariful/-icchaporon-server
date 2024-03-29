const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
   role: {
       type: String,
       default: 'user'
    },
    cart:{
        type: Array,
        default: []
    },
    address: [{ type: mongoose.Schema.ObjectId, ref: "Address"}],
    wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Product"}]
},
{
    timestamps: true,
}
);

userSchema.pre("save", async function(next){
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
//Export the model
module.exports = mongoose.model('User', userSchema);