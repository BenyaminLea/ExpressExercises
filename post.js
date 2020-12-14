const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");

let posts = require("./posts.json");

app.use(express.json());

app.post("/api/posts", (req, res) => {
  const newPost = req.body;
  const keys = Object.keys(newPost);
  if (
    !keys.includes("userId") ||
    !keys.includes("body") ||
    !keys.includes("title")
  ) {
    return res.status(404).json({ err: "Post is not in the right format" });
  }
  const postsKeys = Object.keys(posts);
  const postId = Math.max(...postsKeys) + 1;
  newPost["id"] = postId;
  posts[postId] = newPost;
  fs.writeFileSync("./posts.json", JSON.stringify(posts, null, 2));
  res.json(posts);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
