import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import ApiError from './ApiError';

cloudinary.config({
    cloud_name: 'raftaar',
    api_key: '251283991289817',
    api_secret: 'jlAsLDRrB3MbzIuc_P0Z64TKGbE'
});

let folder = "blogger/user-images"
//uploads\others\app.js

const uploadOnCloudinary = async function (localFilePath: string) {
    try {
        if (!localFilePath) return null

        if (localFilePath.match(/others/i))
            folder = "blogger/others"
        if (localFilePath.match(/videos/i))
            folder = "blogger/videos"
        if (localFilePath.match(/images/i))
            folder = "blogger/images"

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder
        })

        //File uploaded on cloudinary successfully and we can now delete our file stored on server
        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {
        //Remove file from server as file upload failed and we don't 
        //want our server to get filled by files on err.
        console.log("Error in file upldoad ", error)
        fs.unlinkSync(localFilePath);

        throw new ApiError(400, 'File Upload Failed', ['File Upload Failed'])
    }
}

export default uploadOnCloudinary;
