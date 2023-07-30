const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    brand: {
        type: String,
        required: true,
       
    },
    description: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        
    },
    sold: {
        type: Number,
       
    },
    images: {
        type: Array,
    },
    ratings: [
        {
            star: Number,
            postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
        }
    ]
},
    {
        timestamps: true
    }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);