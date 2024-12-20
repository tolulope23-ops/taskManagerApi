const mongoose = require('mongoose');

const connectDB = async (req, res) =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/Todo");
        console.log("Connected to Database");
    } catch (error) {
        console.log(error.message);
           
    }
}

module.exports = connectDB;