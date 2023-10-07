const express = require('express');
const app = express();
const port = 3000; // You can change the port number

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to handle POST request data
app.use(express.urlencoded({ extended: true }));

// Sample data (you can replace this with your data source)
const posts = [];

// Render the initial page with EJS
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Handle form submission
app.post('/add-post', (req, res) => {
  const { title, author } = req.body;
  const newPost = { title, author };
  posts.push(newPost);
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
