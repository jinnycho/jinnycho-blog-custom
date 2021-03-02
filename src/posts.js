const fs = require("fs");
const config = require("./config");
const fm = require("front-matter");
const marked = require("marked");

const createPost = (postPath) => {
  const data = fs.readFileSync(`${config.dev.postsdir}/${postPath}.md`, "utf8");
  const content = fm(data);
  content.body = marked(content.body);
  content.path = postPath;
  return content;
};

module.exports = createPost;
