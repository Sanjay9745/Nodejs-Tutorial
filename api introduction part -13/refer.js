// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const server = http.createServer((req, res) => {
//   const url = req.url.split("?")[0];
//   const method = req.method;
//   console.log(url, method);

//   if (url === "/") {
//     // Send HTML file
//     const filePath = path.join(__dirname, "index.html");

//using fs.readFile
// fs.readFile(path.join(__dirname, routes[url]), 'utf8', (err, data) => {
//   if (err) {
//     res.writeHead(500, { 'Content-Type': 'text/plain' });
//     res.end('500 Internal Server Error');
//     return;
//   }
//   res.end(data);
// });//readFile ends here

//     const fileStream = fs.createReadStream(filePath);

//     fileStream.on("error", (err) => {
//       res.writeHead(500, { "Content-Type": "text/plain" });
//       res.end("500 Internal Server Error");
//     });

//     res.setHeader("Content-Type", "text/html");
//     fileStream.pipe(res);
//   } else if (url === "/submit") {
//     // Get data from query string
//     const query = req.url.split("?")[1];
//     const name = query.split("=")[1].split("&")[0];
//     const email = query.split("=")[2].split("&")[0];
//     console.log(name,email);
//     fs.appendFile("names.txt", name + "\n", (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//     res.setHeader("Content-Type", "text/plain");

//     res.end("Hello " + name);

//     // Write data to file (you can implement this part as needed)
//   }
// });

// server.listen(8080, "localhost", () => {
//   console.log("Server is listening on port 8080");
// });
