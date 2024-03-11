const asyncHandler = require("express-async-handler");

const Post = require('../models/postsModel');

// @desc ....Get all posts
// @route .....GET /api/posts
// @access ......Private
// Controller for fetching posts with pagination
exports.getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page number, default is 1
        const limit = parseInt(req.query.limit) || 10; // Number of posts per page, default is 10

        const startIndex = (page - 1) * limit; // Start index of posts for the current page
        const endIndex = page * limit; // End index of posts for the current page

        const totalPosts = await Post.countDocuments(); // Total number of posts

        const posts = await Post.find().populate('user_id').limit(limit).skip(startIndex).exec(); // Fetch posts with pagination

        const pagination = {}; // Object to hold pagination info
        if (endIndex < totalPosts) {
            pagination.next = {
                page: page + 1,
                limit: limit
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit: limit
            };
        }

        res.status(200).json({
            success: true,
            count: posts.length,
            pagination: pagination,
            data: posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


// @desc ....Create a new posts
// @route .....POST /api/posts
// @access ......Private
// Controller for creating a new post

exports.createPost = async (req, res) => {
    try {
        const { user_id, name, description, image } = req.body;

        // Create a new post
        const post = await Post.create({ user_id, name, description, image });

        res.status(201).json({
            success: true,
            data: post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};



