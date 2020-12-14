const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");

let posts = require("./posts.json");

app.use(express.json());

app.put("/api/posts", (req, res) => {
  const queryParams = req.query;
  const { post, comment } = queryParams;
  const modifiedComment = req.body;
  posts[post].comments[comment] = modifiedComment;
  fs.writeFileSync("./posts.json", JSON.stringify(posts, null, 2));
  res.json(posts);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
