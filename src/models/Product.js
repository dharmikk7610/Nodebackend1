import mongoose from "mongoose";

const productschema  =  mongoose.Schema({

    productname:{
        type:String ,
        lowercase:true ,
        index:true,
        required:true
    } ,
    price:{
        type:Number ,
        required:true 
    },
    status: {
        type: String,
        enum: ["active", "inactive", "archived"],
        default: "active"
},
    quantity:{
        type:Number,
        
    }


},{timestamps:true});

export const product = mongoose.model("product",productschema) ;