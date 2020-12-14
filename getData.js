const fetch = require("node-fetch");
const fs = require("fs");

async function getData() {
  const url1 = "https://jsonplaceholder.typicode.com/posts";
  const response1 = await fetch(url1);
  const json1 = await response1.json();
  const postObjects = {};
  for (var i = 0; i < json1.length; i++) {
    postObjects[json1[i].id] = json1[i];
    postObjects[json1[i].id].comments = {};
  }
  const url2 = "https://jsonplaceholder.typicode.com/comments";
  const response2 = await fetch(url2);
  const json2 = await response2.json();
  for (var i = 0; i < json2.length; i++) {
    postObjects[json2[i].postId].comments[json2[i].id] = {
      name: json2[i].name,
      email: json2[i].email,
      body: json2[i].body,
    };
  }
  const data = JSON.stringify(postObjects);
  fs.writeFile("posts.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}

getData();
