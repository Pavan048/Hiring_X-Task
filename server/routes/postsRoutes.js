const express = require('express');
const router = express.Router();

// Import controllers
const { getPosts, createPost } = require('../controllers/postsController');
const validateToken = require('../middleware/validateTokenHandler');

// Set up routes with controllers
router.use(validateToken);

// Route for getting all posts and creating a new post
router.route("/").get(getPosts).post(createPost);



module.exports = router;
