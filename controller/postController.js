const Post = require("../models/postModels")

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "fail",
        });
    }
};
//localhost:3000/posts/:id
exports.getOnePost = async (req, res, next) => {
    try {
        const posts = await Post.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "fail",
        });
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const posts = await Post.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                posts
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "fail",
        });
    }
};

exports.UpdatePost = async (req, res, next) => {
    try {
        const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "fail",
        });
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const posts = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
        })
    } catch (e) {
        res.status(400).json({
            status: "fail",
        });
    }
};