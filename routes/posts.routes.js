const express = require("express");

const postsController = require("../controllers/posts.controller");

const router = express.Router();


router.get("/create-post", postsController.getCreatePost);

router.post("/create-post", postsController.createPost);

router.get("/post/:id", postsController.getPost);

router.post("/post/:id/delete", postsController.deletePost);

router.get("/post/:id/update", postsController.getUpdatePost);

router.post("/post/:id/edit", postsController.updatePost);

module.exports = router;
