import cloudinary from 'cloudinary'
import User from '../models/user.js'

cloudinary.v2.config({
    cloud_name:"dczngjmsb" ,
    api_secret:"p3H7IaGIcrI8uKG6357cRQ6PqmQ",
    api_key:"899889586444528"
})

const uploadfile = async(path)=>{
   const res =  cloudinary.v2.uploader.upload(path);
   return res ;
}

export default uploadfile ;
