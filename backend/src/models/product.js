const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["running", "casual", "sports", "formal", "mens", "womens", "kids"]
    },
    stock:{
        type:Number,
        required:true,
        default: 0
    },
    imageUrl:{
        type:String,
        required:true
    },
    publicId: {
        type: String,
        required: true
    },
        
}, {timestamps:true});

module.exports = mongoose.model("Product", productSchema);