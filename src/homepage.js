const fs = require("fs");
const config = require("./config");

/**
 * Front page of the blog
 */
const homepage = (posts) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content=${config.blogDescription}" />
        <title>${config.blogName}</title>
    </head>
    <body>
        <div class="grotesk">
            <header>
                <h1>${config.blogName}</h1>
                <p>-</p>
                <p>This blog is writtene by ${config.author}. Follow me on <a href="${config.authorGithub}">Github</a></p>
            </header>

            <div class="posts">
                ${posts.map(post =>
                    `<div class="post">
                     <h3><a href="./${post.path}">${post.attributes.title}</a></h3>
                     <small>${new Date(parseInt(post.attributes.date)).toDateString()}</small>
                     <p>${post.attributes.description}</p>
                     </div>`).join("")}
            </div>

            <footer>
                ${`<p>© ${new Date().getFullYear()}
                        ${config.author}
                   </p>`}
            </footer>
        </div>
    </body>
</html>
`;

const addHomepage = (posts) => {
  fs.writeFile(`${config.dev.outdir}/index.html`, homepage(posts), e => {
    if (e) throw e;
    console.log("index.html is created successfully");
  });
};

module.exports = addHomepage;
