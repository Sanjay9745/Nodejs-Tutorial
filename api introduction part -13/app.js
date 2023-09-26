//create server using http
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  if (url === "/") {
    const filePath = path.join(__dirname, "index.html");
    const fileStream = fs.createReadStream(filePath); //read file

    fileStream.on("error", (err) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
    });

    res.setHeader("Content-Type", "text/html");
    fileStream.pipe(res);
  }
  if (url === "/submit") {
    const name = req.url.split("?")[1];
    const newName = name.split("=")[1];
    fs.appendFile("names.txt", newName + "\n", (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello " + newName);
  }
});

server.listen(3000, () => {
  console.log("Server running at port 3000");
});
