const { default: mongoose } = require("mongoose")

const dbConnect = ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database is Successfully Connected");
    } catch (error) {
        console.log(error.message,"Database error");
    }

}

module.exports = dbConnect