import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResonse";
import uploadOnCloudinary from "../utils/uploadCloudinary";

export const uploadMedia = asyncHandler(async function (req: Request, res: Response) {

    let mediaPath = '',
        mediaLink: any,
        mediaPaths: typeof req.files;
    //Get Media Path for single File
    if (req.file) {
        mediaPath = req?.file?.path;
    }
    if (req.files) {
        mediaPaths = req.files;
    }

    //If path not found, throw error,
    if (!mediaPath && !mediaPaths) {
        throw new ApiError(400, "File is Required, upload again", ['File is Required, upload again'])
    }

    //Upload single media and get media link
    if (mediaPath) {
        //Upload media on cloudinary and get url of it
        mediaLink = await uploadOnCloudinary(mediaPath);
        if (!mediaLink)
            throw new ApiError(400, "Upload file Again !", ['Upload file Again !'])

        return res.status(200)
            .json(
                new ApiResponse(200, { "media": mediaLink?.url }, "File upload successfully")
            )
    }

    //Upload mutiple media and get medias link
    if (mediaPaths) {
        const medias = await uploadMultipleMedia(mediaPaths)
        if(mediaPaths.length !== medias.length){
            throw new ApiError(400, "Upload file Again!", ['Upload file Again!'])
        }
        return res.status(200)
            .json(
                new ApiResponse(200, { "media": medias }, "Files upload successfully")
            )
    }

});

async function uploadMultipleMedia(array: any) {
    const links: any = []; // Initialize an empty array to store links
    for (const media of array) {
        const link = await uploadOnCloudinary(media?.path);
        if (link)
            links.push(link?.url);
    }
    return links;
}