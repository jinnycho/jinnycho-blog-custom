const fs = require("fs");
const config = require("./config");

const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => post.slice(0, -3));

console.log(posts);
