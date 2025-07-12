import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userschema = mongoose.Schema({
    Name:{
        type:String,
    },
    Email:{
        type:String,
        unique:true,
        index:true
    },
    Password:{
        type:String
    },
    avter :{
        type:String
    },
    refreshToken:{
        type:String
    }

},{timestamps:true})

userschema.pre("save",async function (next) {
    if(!this.isModified("Password"))
        return next();

    this.Password = await bcrypt.hash(this.Password,10);
    return next();
})

userschema.methods.ispasswordcorrect = 
async function(Password){
    return await bcrypt.compare(Password,this.Password)
}




const User = mongoose.model("User",userschema)
export default User ;