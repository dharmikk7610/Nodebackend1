// add to cart  
// -->> prodect id 
//     user id 



// product:
import mongoose from "mongoose";
import { User } from "./user";
import { product } from "./Product";

const cartschema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:product
    },
    quantity: {
    type: Number,
    required: true,
    default: 1
  }


},{timestamps:true});

export const carts = mongoose.model("carts",cartschema); 
