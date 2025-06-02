import express from 'express'
import User from '../models/user.js'
import generatetoken from "../utils/jwtAuth.js"
import generaterefreshtoken from '../utils/Refresetoken.js'
import jwt from "jsonwebtoken"
import { configDotenv } from 'dotenv'
// import cookie from "cookie-parser"
const createuser = async(req , res)=>{

    try {
        // req.body.password = ;
        const data =req.body ;
        const saveuser = await User.create(data);
        res.json({
            message:"add user sucessfully" ,
            data :saveuser
        })
    } catch (error) {
        res.json({
            message:"error occured..",
            data :error
        })
        console.log(error);
        
        
    }


}

const loginuser = async(req,res)=>{

    const {email,password} = req.body;
    const myuser = await  User.findOne({email:email});


    if(myuser!=null)
    {
       const ispassword = await myuser.ispasswordcorrect(password); 
       if(ispassword)
        {
            const accesstoken = generatetoken(myuser._id);
            const refreshtoken = generaterefreshtoken(myuser._id);


          //  myuser.accessToken = accesstoken;
            myuser.refreshToken = refreshtoken; 
            await  myuser.save({validateBeforeSave:false});
            
         //cookies-
         const  loguser = await User.findById(myuser._id);
         const options = {
            httpOnly:true ,
            secure:true

         }
            return res
            .status(200)
            .cookie("accesstoken",accesstoken,options)
            .cookie("refreshtoken",refreshtoken,options)
            .json({
                message:"sucessfully user login",
                data : loguser ,accesstoken,refreshtoken,
                token :accesstoken
            })
            
        } 
        else{
            res.status(401).json({
                    message:"error password",

            })
        } 
    }
    else{
        res.status(404).json({
            message:"user not found",
            data : error
        })
    }

}

const logout = async(req , res)=>{
 await User.findByIdAndUpdate(req.user1._id, {
  $set: {
    refreshToken: undefined,
  },
}, { new: true });


const options = {
    httpOnly : true  ,
    secure :true 
}
return res
.status(200)
.clearCookie("accesstoken",options)
.clearCookie("refreshtoken",options)
.json({
    message:"logout user",
   

})
}

const refreshaccesstoken = async(req,res)=>{

    const myrefreshtoken = req.cookies.refreshToken ;

    if(!myrefreshtoken)
    {
       return  res.status(401).json({
            message:"anuthrized request ..>"
        })
    }
    try {
        const decodedtoken = jwt.verify(myrefreshtoken,process.env.REFRESHSECRECTKEY) ;

        const user = await User.findById(decodedtoken?._id); 

        if(!user)
        {
           return  res.status(401).json({
                message:"invalid user by refreshtoken..."
            })
        }

        //for check expire or not refresh token ..>
        if(myrefreshtoken!==user?.refreshToken)
        {
           return  res.status(401).json({
                message:"refreshtoken is expired.."
            })

            //throw the directed login page ..
        }

           const options = {
            httpOnly: true,
            secure: true
        }

        //then all done to create to access_token..
       const accesstoken = generatetoken(user?._id);
       return res
       .status(200)
       .cookie("accesstoken",accesstoken,options)
       .json({
            message:"new regenerated access_token",
            token : accesstoken
       })
    
       
    } catch (error) {
        return res.status(401).json({
            message:"invalid refresh token ..>>"
            
        })
        console.log(error);
    }
}

export default {createuser,loginuser,logout,refreshaccesstoken};