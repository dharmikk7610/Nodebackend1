import mongoose from "mongoose";

const subscribeuser = mongoose.Schema({

    subscriber : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    } ,
    channel :{
        type:Schema.Types.ObjectId,
        ref:"USer"
    }

},{timestamps:true});

const subscribe = mongoose.model("subscribe",subscribeuser)
export default subscribe ;