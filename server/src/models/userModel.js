const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default : "user"
    },
    status:{
        type:String,
        default : "active"
    },
    profilePicture:{
        type:String,
        default : ""
    },
   
},{
    timestamps: true
});


const userModel = mongoose.model('user',userSchema);

module.exports = userModel;

