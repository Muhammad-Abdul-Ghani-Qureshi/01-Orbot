const db = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

function getCreatePost(req, res) {
  res.render("authors/create-post");
}

async function createPost(req, res) {
  try {
    const newPost = {
      title: req.body.title,
      summary: req.body.summary,
      body: req.body.body,
    };

    await db.getDb().collection("posts").insertOne(newPost);
    res.redirect("/");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("An error occurred while creating the post.");
  }
}

async function getPost(req, res) {
  try {
    const postId = req.params.id;
    const post = await db
      .getDb()
      .collection("posts")
      .findOne({ _id: new ObjectId(postId) });

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.render("authors/post", { post: post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("An error occurred while fetching the post.");
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    const result = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: new ObjectId(postId) });

    if (result.deletedCount === 0) {
      return res.status(404).send("Post not found");
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("An error occurred while deleting the post.");
  }
}

async function getUpdatePost(req, res) {
  try {
    const postId = req.params.id;
    const post = await db
      .getDb()
      .collection("posts")
      .findOne({ _id: new ObjectId(postId) });

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.render("authors/update-post", { post: post });
  } catch (error) {
    console.error("Error fetching post for update:", error);
    res.status(500).send("An error occurred while fetching the post for update.");
  }
}

async function updatePost(req, res) {
  try {
    const postId = new ObjectId(req.params.id);
    const result = await db
      .getDb()
      .collection("posts")
      .updateOne(
        { _id: postId },
        {
          $set: {
            title: req.body.title,
            summary: req.body.summary,
            body: req.body.body,
          },
        }
      );

    if (result.matchedCount === 0) {
      return res.status(404).send("Post not found");
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send("An error occurred while updating the post.");
  }
}

module.exports = {
  getCreatePost,
  createPost,
  getPost,
  deletePost,
  getUpdatePost,
  updatePost,
};
