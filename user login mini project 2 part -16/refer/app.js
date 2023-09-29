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
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const paramsForms = parseFormData(body);
      const username = paramsForms.username;
      const password = paramsForms.password;

      // Read user data from a JSON file
      fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("500 Internal Server Error");
          return;
        }

        const users = JSON.parse(data);
        let found = false;

        for (const user of users) {
          if (user.username === username && user.password === password) {
            found = true;
            break;
          }
        }

        if (found) {
          // Redirect to the dashboard page
          res.writeHead(302, { Location: "/dashboard" });
          res.end();
        } else {
          // Invalid credentials
          res.writeHead(401, { "Content-Type": "text/html" });
          res.write("<h1>Unauthorized</h1>");
          res.end();
        }
      });
    });
  } else if (url === "/signup" && method === "GET") {
    fs.readFile("signup.html", "utf8", (err, data) => {
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
  } else if (url === "/signup" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const paramsForms = parseFormData(body);
      const username = paramsForms.username;
      const password = paramsForms.password;

      const users = JSON.parse(fs.readFileSync("users.json", "utf8"));
      const newUser = {
        id: users.length+1,
        username,
        password,
      };
      users.push(newUser);
      fs.writeFileSync("users.json", JSON.stringify(users));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1>Signup Success</h1>");
      res.end();
    });
  }else if(url === '/dashboard' && method === 'GET'){
    fs.readFile('home.html', 'utf8', (err, data) => {
      if(err){
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>Page not found</h1>');
        res.end();
      }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      }
    })
  }else{
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('<h1>Page not found</h1>');
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function parseFormData(formData) {
  const data = {}; // Create an empty object to store the form data

  // Split the formData string into individual key-value pairs using '&'
  formData.split("&").forEach((pair) => {
    // For each key-value pair, split it into its key and value using '='
    const [key, value] = pair.split("=");
    
    // Use decodeURIComponent to decode the URL-encoded value
    // and assign it to the corresponding key in the 'data' object
    data[key] = decodeURIComponent(value);
  });

  // Return the 'data' object containing the parsed form data
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
