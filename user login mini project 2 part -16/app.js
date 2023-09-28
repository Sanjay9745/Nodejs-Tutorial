const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  const method = req.method;
  if (url === "/login" && method === "GET") {
    const loginPage = path.join(__dirname, "login.html");
    fs.readFile(loginPage, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>Page not found</h1>");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  } else if (url === "/login" && method === "POST") {
    console.log("POST");
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log(body);
      const username = body.split("&")[0].split("=")[1];
      const password = body.split("&")[1].split("=")[1];

      if (username === "admin" && password === "admin") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Login Success</h1>");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Login Failed</h1>");
        res.end();
      }
    });
  } else if (url === "/signup" && method === "GET") {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      // Parse the form data
      const formData = parseFormData(body);
      const username = formData.username;
      const password = formData.password;

      // Read existing user data from the JSON file
      fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
          return;
        }

        // Parse the JSON data into an array of user objects
        const users = JSON.parse(data);

        // Check if the user already exists
        const existingUser = users.find((user) => user.username === username);

        if (existingUser) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('User already exists');
          return;
        }

        // Create a new user with an ID
        const newUser = {
          id: generateUserId(users), // Generate a new unique ID
          username: username,
          password: password,
        };

        // Add the new user to the array
        users.push(newUser);

        // Write the updated user data back to the JSON file
        fs.writeFile('users.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
            return;
          }

          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('User registered successfully');
        });
      });
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function parseFormData(formData) {
    const data = {};
    formData.split('&').forEach((pair) => {
      const [key, value] = pair.split('=');
      data[key] = decodeURIComponent(value);
    });
    return data;
  }
  
  function generateUserId(users) {
    // Generate a unique user ID (in a real app, you may want to use a more robust method)
    let maxId = 0;
    for (const user of users) {
      if (user.id > maxId) {
        maxId = user.id;
      }
    }
    return maxId + 1;
  }