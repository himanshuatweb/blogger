import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user who made the comment
    text: String,
    createdAt: { type: Date, default: Date.now },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' } // Reference to the blog post
});

export const Comment = mongoose.model('Comment', commentSchema);
