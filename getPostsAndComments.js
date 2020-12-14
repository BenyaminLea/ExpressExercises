const express = require("express");
const app = express();
const port = 5000;

const posts = require("./posts.json");
app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  let post = posts[id];
  res.json(post || {});
});

app.get("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  let post = posts[id].comments;
  res.json(post || {});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
