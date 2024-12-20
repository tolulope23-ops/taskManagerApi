const express = require('express');
const cors = require("cors");

const connectDB = require('./db/config');
const todoRoutes = require("./router/todo");
const userRoutes = require("./router/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v2", userRoutes);
app.use("/api/v2", todoRoutes);

const PORT = 3000;
const server = async() => {
    try {
        await connectDB();
        app.listen(PORT, ()=>{
            console.log(`Server Listening at port ${PORT}`);
        })
    } catch (error) {
        console.log(error.message);
           
    }
}

server();