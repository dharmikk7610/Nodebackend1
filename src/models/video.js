import mongoose from "mongoose";

const videoschema  = ({
    videofile:{
        type:String,
        required :true
    },
    thimbnail:{
        type:String ,
        required :true 
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId ,
        ref : "User"
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    duration :{
        type:Number
    },
    views :{
        type:Number
    },
    ispublised:{
        type:false
    }


}, {timestamps:true})