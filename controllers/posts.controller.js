const db = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
function getCreatePost(req, res) {
  res.render("authors/create-post");
}

async function createPost(req, res) {
  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.body,
  };
  await db.getDb().collection("posts").insertOne(newPost);
  res.redirect("/");
}

async function getPost(req, res) {
  const postId = req.params.id;
  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(postId) });
  res.render("authors/post", { post: post });
}

async function deletePost(req, res) {
  const postId = req.params.id;
  await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: new ObjectId(postId) });
  res.redirect("/");
}

async function getUpdatePost(req, res) {
  const postId = req.params.id;

  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: new ObjectId(postId) });

  res.render("authors/update-post", { post: post });
}

async function updatePost(req, res) {
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



  console.log(result);

  res.redirect("/");
}

module.exports = {
  getCreatePost: getCreatePost,
  createPost: createPost,
  getPost: getPost,
  deletePost: deletePost,
  getUpdatePost: getUpdatePost,
  updatePost: updatePost,
};
