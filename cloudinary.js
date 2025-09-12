import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"
import { log } from 'console';

dotenv.config()

//configure cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUINARY_CLOUD_NAME,
    api_key: process.env.CLOUINARY_API_KEY, 
    api_secret: process.env.CLOUINARY_API_SECRET  
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath, {
                resource_type: "auto"
            }
        )
        console.log("file uploaded on cloudinary. file src:"+response.url);
        //once the file is uploaded,we are going to delete it from our servers.
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        console.log("deleted from cloudinary, publicid ",publicId);
    } catch (error) {
        console.log("error deleting from cloudinary",error);
        return null
    }
}

export {uploadOnCloudinary, deleteFromCloudinary}