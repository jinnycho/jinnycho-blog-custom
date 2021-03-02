const fs = require("fs");
const fm = require("front-matter");
const config = require("./config");
const createPost = require("./posts.js");

const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => post.slice(0, -3))
  .map(post => createPost(post));

console.log(posts);

const createPosts = (posts) => {
  posts.forEach(post => {
    if (!fs.existsSync(`${config.dev.outdir}/${post.path}`)) {
      fs.mkdirSync(`${config.dev.outdir}/${post.path}`);
    }

    fs.writeFile(
      `${config.dev.outdir}/${post.path}/index.html`,
      posthtml
    );
  });
};
