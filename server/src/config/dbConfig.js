const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;


connection.on('connected',()=>{
    console.log("MongoDB connected successfully");
});

connection.on('error',(err)=>{
    console.log(`Mongo Error ${err}`);
});



module.exports = connection;


