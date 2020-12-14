const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");

let posts = require("./posts.json");

app.use(express.json());

app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  delete posts[id];
  fs.writeFileSync("./posts.json", JSON.stringify(posts, null, 2));
  res.json(posts);
});

app.delete("/api/posts", (req, res) => {
  const queryParams = req.query;
  const { post, comment } = queryParams;
  console.log(queryParams);
  console.log(posts[post].comments[comment]);
  delete posts[post].comments[comment];
  fs.writeFileSync("./posts.json", JSON.stringify(posts, null, 2));
  res.json(posts);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
