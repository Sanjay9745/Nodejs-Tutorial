// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello, World!\n');
// });

// server.listen(8080, 'localhost', () => {
//   console.log('Server is listening on port 8080');
// });


//2


// const http = require('http');

// const server = http.createServer((req, res) => {
//   // Parse the URL to get the path (route)
//   const { url } = req;
  
//   // Define routes and their respective responses
//   const routes = {
//     '/': 'Welcome to the homepage!',
//     '/about': 'About us page.',
//     '/contact': 'Contact us page.',
//   };

//   // Check if the requested route exists in the routes object
//   if (routes[url]) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end(routes[url]);
//   } else {
//     // Handle a 404 Not Found error for unknown routes
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('404 Not Found');
//   }
// });

// server.listen(8080, 'localhost', () => {
//   console.log('Server is listening on port 8080');
// });

//3 send html files

// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((req, res) => {
//   // Parse the URL to get the path (route)
//   const { url } = req;

//   // Define routes and their respective file paths
//   const routes = {
//     '/': 'index.html',
//     '/about': 'about.html',
//     '/contact': 'contact.html',
//   };

//   // Check if the requested route exists in the routes object
//   if (routes[url]) {
//     const filePath = path.join(__dirname, routes[url]);
    
//     // Read the HTML file and send it as the response
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         res.end('500 Internal Server Error');
//       } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(data);
//       }
//     });
//   } else {
//     // Handle a 404 Not Found error for unknown routes
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('404 Not Found');
//   }
// });

// server.listen(8080, 'localhost', () => {
//   console.log('Server is listening on port 8080');
// });
