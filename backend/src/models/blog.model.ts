import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'blog name is required'],
        trim: true,
        index: true,
        unique: true,
        lowercase: true,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    blogImage: {
        type: String, // cloudinary url
        required: true,
    },

    description: {
        type: String,
        required: [true, 'blog description is required'],
        trim: true,
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the blog
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who disliked the blog

    // References to comments
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {
        timestamps: true
    }
)

export const Blog = mongoose.model('Blog', blogSchema)
