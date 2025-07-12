import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt' ;
import cloudinary from 'cloudinary' ;

const  userschema  = mongoose.Schema({
    username:{
        type:String,
        required :true ,
        index :true ,
        lowercase :true ,
        trim : true  
    },
    email:{
        type:String,
        required :true ,
       unique : true ,
        lowercase :true ,
        trim : true  
    },
    avatar :{
        type : String  //cloudnary 
    }
    ,
    coverimg:{
        type : String 
        
    },
    password :{
        type:String ,
        required : true 
    },
    watchhistory :{
        type: mongoose.Schema.Types.ObjectId ,
        ref : "Video"
    },
    accessToken:{
        type:String
    },
    refreshToken:{
        type : String 
    }
} , {timestamps  : true})

//cloudinary

// cloudinary.v2.config({
//     cloud_name:"dczngjmsb" ,
//     api_secret:"p3H7IaGIcrI8uKG6357cRQ6PqmQ",
//     api_key:"899889586444528"
// })

// userschema.methods.uploadfile = async function(path){
//     const res = await  cloudinary.v2.uploader.upload(path);
//     return res ;

// }



// password encrpted ............
userschema.pre("save" ,  async function (next){

    if(!this.isModified("password")) return next() ;

    this.password =  await bcrypt.hash(this.password , 10) ;
    return next() ; 
})

userschema.methods.ispasswordcorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}



 const User = mongoose.model("User2" , userschema) ;
export default User ;