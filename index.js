const fs = require('fs');
const matter = require('gray-matter');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Parse incoming request bodies in a middleware before your handlers
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const path = require('path');

app.set('views', path.join(__dirname, 'blog'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get('/blog/:article', (req, res) => {
  const file = matter.read(__dirname + '/blog/contents/' + req.params.article + '.md');

  // convert markdown content to HTML
  let md = require('markdown-it')();
  let content = file.content;
  let result = md.render(content);

  res.render('index', {
    post: result,
    title: file.data.title,
    description: file.data.description,
    image: file.data.image
  });
});

app.get('/blog', (req, res) => {
  const posts = fs.readdirSync(__dirname + '/blog/contents').filter(file => file.endsWith('.md'));
  res.render('blog', {
    posts: posts
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

