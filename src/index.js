const fs = require("fs");
const config = require("./config");

const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => post.slice(0, -3));

const posthtml = (data) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="${data.attributes.description}" />
    <title>${data.attributes.title}</title>
       </head>
      <body>
 11         <header>
 12             <a href="/">Go back home</a>
 13         </header>
 14         <div class="content">
 15                 <h1>${data.attributes.title}</h1>
 16             <p>${new Date(parseInt(data.attributes.date)).toDateString()}</p>
 17             <hr />
 18             ${data.body}
 19         </div>
 20     </body>
 21 </html>
`;

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
