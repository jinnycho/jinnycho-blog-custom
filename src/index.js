const fs = require("fs");
const fm = require("front-matter");
const config = require("./config");
const postsLib = require("./posts.js");

// This will return an array of posts with corresponding data
const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => post.slice(0, -3))
  .map(post => postsLib.createPost(post));

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

postsLib.createPosts(posts);
