const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  const method = req.method;

  if (url === "/signup" && method === "GET") {
    // Serve the signup HTML page
    fs.readFile(path.join(__dirname, "signup.html"), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (url === "/signup" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const obj = parseBody(body);

      const username = obj.username;
      const password = obj.password;
      fs.readFile(path.join(__dirname, "users.json"), (err, data) => {
        if (err) throw err;
        const users = JSON.parse(data);
        const user = users.find((user) => user.username === username);
        if (user) {
          res.writeHead(409, { "Content-Type": "text/html" });
          res.end("User already exists");
          return;
        }
        users.push({
          id: users.length + 1,
          username,
          password,
        });

        // Generate a random session ID and store it in the sessions.json file
        const session = {
          id: Math.floor(Math.random() * 1000000),
          username,
        };

        fs.readFile("sessions.json", (err, sessionData) => {
          if (err) throw err;
          const sessions = JSON.parse(sessionData);
          sessions.push(session);

          // Write the updated sessions data back to sessions.json
          fs.writeFile("sessions.json", JSON.stringify(sessions), (err) => {
            if (err) throw err;

            // Redirect to the index page after successful signup
            res.writeHead(302, {
              Location: "/",
              "Set-Cookie": `sessionId=${session.id}; HttpOnly`,
            });
            res.end();
          });
        });

        // Update the users.json file with the new user
        fs.writeFile(
          path.join(__dirname, "users.json"),
          JSON.stringify(users),
          (err) => {
            if (err) throw err;
          }
        );
      });
    });
  } else if (url === "/login" && method === "GET") {
    fs.readFile(path.join(__dirname, "login.html"), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (url === "/login" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const obj = parseBody(body);
      const username = obj.username;
      const password = obj.password;

      fs.readFile(path.join(__dirname, "users.json"), (err, data) => {
        if (err) throw err;
        const users = JSON.parse(data);
        const user = findUser(users, username, password);

        if (user) {
          const session = {
            id: Math.floor(Math.random() * 1000000),
            username,
          };

          fs.readFile("sessions.json", (err, sessionData) => {
            if (err) throw err;
            const sessions = JSON.parse(sessionData);
            sessions.push(session);

            // Write the updated sessions data back to sessions.json
            fs.writeFile("sessions.json", JSON.stringify(sessions), (err) => {
              if (err) throw err;

              // Redirect to the index page after successful signup
              res.writeHead(302, {
                Location: "/",
                "Set-Cookie": `sessionId=${session.id}; HttpOnly`,
              });
              res.end();
            });
          });
        } else {
          res.writeHead(401, { "Content-Type": "text/html" });
          res.end("Login Failed");
        }
      });
    });
  } else if (url === "/" && method === "GET") {
    const cookie = req.headers.cookie;
    if (!cookie) {
      // No session cookie found, redirect to login page
      res.writeHead(302, { Location: "/login" });
      res.end();
      return;
    }

    const [key, value] = cookie.split("=");
    const sessionId = value;

    // Read session data from sessions.json
    fs.readFile("sessions.json", (err, data) => {
      if (err) throw err;
      const sessions = JSON.parse(data);
      const session = sessions.find(
        (session) => session.id === Number(sessionId)
      );

      if (session) {
        // Valid session found, serve the index page
        fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
          if (err) throw err;
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        });
      } else {
        // Session not found or expired, redirect to login page
        res.writeHead(302, { Location: "/login" });
        res.end();
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function parseBody(body) {
  const obj = {};
  const kvs = body.split("&"); //username=sourav&password=saasd ==== [username=sourav,password=saasd]
  for (let kv of kvs) {
    const [key, value] = kv.split("="); //[username,sourav]
    obj[key] = value; //{username:sourav}
  }
  return obj;
}
function findUser(users, username, password) {
  for (let user of users) {
    if (user.username === username && user.password === password) {
      return user;
    }
  }
  return null;
}
