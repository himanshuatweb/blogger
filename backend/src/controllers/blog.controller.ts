import { Request, Response } from "express";

import { User } from "../models/user.model";
import { Blog } from "../models/blog.model";

import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResonse";

//Create Blog

export const createBlog = asyncHandler(async (req: Request, res: Response) => {

    const { title, description, blogImage } = req.body;

    // Check for required fields
    if (!title || !description || !blogImage) {
        throw new ApiError(
            400,
            "Please fill the required fields",
            ['Please fill the required fields']
        )

    }

    // Create new blog post
    const blog = await Blog.create({
        title,
        //@ts-ignore
        author: req.user._id, // Assuming user is authenticated and user ID is available in req.user._id
        description,
        blogImage,
        comments: [] // Initialize with empty array for comments
    });

    if (blog) {
        return res.status(201)
            .json(
                new ApiResponse(200, { blog }, "blog created")
            )

    } else {
        console.error('Error creating blog');
        throw new ApiError(500, "Something went wrong during blog creation", ['Something went wrong during blog creation'])
    }

});

export const likeBlog = asyncHandler(async (req: Request, res: Response) => {
    const blogId = req.params.id;
    //@ts-ignore
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(
            404,
            "Blog not found",
            ['Blog not found']
        )
    }
    if (blog.likedBy.includes(userId)) {
        throw new ApiError(
            400,
            "You have already liked this blog",
            ['You have already liked this blog']
        )
    }
    blog.likes++;
    blog.likedBy.push(userId);

     // If the user had previously disliked the blog post, remove the user from dislikedBy array and decrease the dislike count
     if (blog.dislikedBy.includes(userId)) {
        blog.dislikes--;
        blog.dislikedBy = blog.dislikedBy.filter((id: any) => id.toString() !== userId.toString());
    }

    await blog.save();

    return res.status(200).json(new ApiResponse(200, { blog }));
});
export const dislikeBlog = asyncHandler(async (req: Request, res: Response) => {
    const blogId = req.params.id;
    //@ts-ignore
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(
            404,
            "Blog not found",
            ['Blog not found']
        )
    }
    if (blog.dislikedBy.includes(userId)) {
        throw new ApiError(
            400,
            "You have already dislike this blog",
            ['You have already dislike this blog']
        )
    }
    blog.dislikes++;
    blog.dislikedBy.push(userId);

     // If the user had previously disliked the blog post, remove the user from dislikedBy array and decrease the dislike count
     if (blog.likedBy.includes(userId)) {
        blog.likes--;
        blog.likedBy = blog.likedBy.filter((id: any) => id.toString() !== userId.toString());
    }
    
    await blog.save();

    return res.status(200).json(new ApiResponse(200, { blog }));
});