const express = require("express")

const postController = require("../controller/postController");

const router = express.Router()
//localhost:3000/
router.route("/").get(postController.getAllPosts).post(postController.createPost)

router.
    route("/:id").
    get(postController.getOnePost).
    patch(postController.UpdatePost).
    delete(postController.deletePost)

module.exports = router;