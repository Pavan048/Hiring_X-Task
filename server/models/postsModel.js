const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please add the post name"],
    },
    description: {
        type: String,
        required: [true, "Please add a description for the post"],
    },
    image: {
        type: String,
        required: [true, "Please add the image URL for the post"],
    },
   
}, {
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
