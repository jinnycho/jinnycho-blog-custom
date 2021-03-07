const fs = require("fs");
const fm = require("front-matter");
const config = require("./config");
const postsLib = require("./posts");
const addHomePage = require("./homepage");


// This will return an array of posts with corresponding data
const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => post.slice(0, -3))
  .map(post => postsLib.createPost(post))
  .sort(function(a, b) {
    return b.attributes.date - a.attributes.date;
  });

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

// generate HTML files of all docs
postsLib.createPosts(posts);
// generate homepage
addHomePage(posts);
