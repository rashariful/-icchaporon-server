const { default: mongoose } = require("mongoose")

const dbConnect = ()=>{
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGODB_URL);
        console.log("Database is Successfully Connected");
    } catch (error) {
        console.log(error.message,"Database error");
    }

}

module.exports = dbConnect


// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = "mongodb+srv://icchaporon:<password>@icchaporon.y5nsbr8.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// const collection = client.db("test").collection("devices");
// client.connect(err => {
//     // perform actions on the collection object
//     client.close();
// });
