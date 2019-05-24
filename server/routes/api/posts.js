const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// {host}/api/posts *

// Get posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send(); // created
});

// Delete post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send(); // ok
});

async function loadPostsCollection() {
  const uri =
    "mongodb+srv://admin:admin123@cluster0-q3yyh.mongodb.net/test?retryWrites=true";
  const client = await mongodb.MongoClient.connect(uri, {
    useNewUrlParser: true
  });
  return client.db("forumy").collection("posts");
}

module.exports = router;
