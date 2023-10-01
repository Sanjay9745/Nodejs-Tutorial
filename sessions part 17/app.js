const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  const method = req.method;

  if (url === "/signup" && method === "GET") {
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
        const session = {
          id: Math.floor(Math.random() * 1000000000),
          username,
        };
        fs.readFile(path.join(__dirname, "sessions.json"), (err, data) => {
          if (err) throw err;
          const sessions = JSON.parse(data);
          sessions.push(session);
          fs.writeFile(
            path.join(__dirname, "sessions.json"),
            JSON.stringify(sessions),
            (err) => {
              if (err) throw err;
              res.writeHead(302, {
                Location: "/",
                "Set-Cookie": `sessionId=${session.id}; HttpOnly`,
              });
              res.end();
            }
          );
        });
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
            id: Math.floor(Math.random() * 1000000000),
            username,
          };
          fs.readFile(
            path.join(__dirname, "sessions.json"),
            (err, data) => {
              if (err) throw err;
              const sessions = JSON.parse(data);
              sessions.push(session);
              fs.writeFile(
                path.join(__dirname, "sessions.json"),
                JSON.stringify(sessions),
                (err) => {
                  if (err) throw err;
                  res.writeHead(302, {
                    Location: "/",
                    "Set-Cookie": `sessionId=${session.id}; HttpOnly`,
                  });
                  res.end();
                }
              );
            }
          );
        } else {
          res.writeHead(401, { "Content-Type": "text/html" });
          res.end("Login Failed");
        }
      });
    });
  } else if (url === "/" && method === "GET") {
    //check session 
    if(!req.headers.cookie){
      res.writeHead(302, {Location: "/login"});
      res.end();
      return;
    }
    const sessionId = req.headers.cookie.split("=")[1];
    fs.readFile(path.join(__dirname, "sessions.json"), (err, data) => {
      if(err) throw err;
      const sessions = JSON.parse(data);
      const session = sessions.find(session => session.id === Number(sessionId));
      console.log(session);
      if(session !== undefined){
        fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
          if (err) throw err;
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        });
      }else{
        //redirect to login
        res.writeHead(302, {Location: "/login"});
      }
    })
  
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
