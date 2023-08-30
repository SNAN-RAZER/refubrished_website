const mongoose = require('mongoose');

const  productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
        default :[],
        required:true
    },
    billAvailable:{
        type:Boolean,
        default: false,
        
    },
    warrantyAvailable:{
        type:Boolean,
        default: false,
        
    },
    accessoriesAvailable:{
        type:Boolean,
        default: false,
        
    },
    boxAvailable:{
        type:Boolean,
        default: false,
        
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    status:{
        type:String,
        default :"pending",
        required: true
    }     
},{
    timestamps: true
});


const productModel = mongoose.model('product', productSchema);


module.exports = productModel;




