import express from 'express'
import User from '../usermodel.js'
import generateaccessToken from '../utils/axcesstoken.js';
import generaterefreshToken from '../utils/refreshtoken.js';

const addUser = async(req,res)=>{
    const data = req.body;

    const getdata =  await User.create(data);

    if(!getdata){
        res.json({
            message:"data not insert .."
        })
    }
    else{
        res.json({
            message:"data add sucess"
        })
    }

}


const loginuser = async(req,res)=>{

    const{Email,Password} = req.body ;

     const luser= await  User.findOne({Email:Email});

     if(!luser)
     {
        // res.status(404)
      return   res.status(404).json({
            message:"user not found"
        })
     }

     const passcheck = await luser.ispasswordcorrect(Password);

     if(!passcheck)
     {
        return res.json({
            message:"password not correct"
        })
     }
     console.log(luser._id);
     
     const actoken = generateaccessToken(luser._id);
     const rtoken  = generaterefreshToken(luser._id);

     luser.refreshToken = rtoken ;
     luser.save({validateBeforeSave:false});
     console.log(actoken);
     


      const options = {
            httpOnly:true,
            secure:true

         }
         res.status(200)
         .cookie("accesstoken",actoken,options)
         .cookie("refreshtoken",rtoken,options)
         .json({
            message:"login sucess fully",
            data:actoken
         })
     
}
export default {addUser,loginuser}