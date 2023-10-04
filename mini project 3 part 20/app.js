const express = require("express");
const app = express();
const fs = require("fs");
const cookieParser = require("cookie-parser");
//urlencoded
app.use(express.urlencoded({ extended: true }));
//cookie parser express
app.use(cookieParser());

app.get("/", (req, res) => {
    //get cookies

  const sessionId = req.cookies.session;
  if (!sessionId) {
      res.redirect("/login");
      return;
    }
const sessions = JSON.parse(fs.readFileSync("./sessions.json"));

  const session = sessions.find((session) => session.id.toString() === sessionId);
  console.log(session);
  if (!session) {
    res.redirect("/login");
    return;
  }

  res.sendFile(__dirname + "/home.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const users = JSON.parse(fs.readFileSync("./users.json"));
  const user = users.find((user) => user.username === username);
  if (!user) {
    res.send("User not found");
    return;
  }
  if (user.password !== password) {
    res.send("Password is incorrect");
    return;
  }

  const sessions = JSON.parse(fs.readFileSync("./sessions.json"));
  const sessionId = Math.floor(Math.random() * 900000);
  sessions.push({
    id: sessionId,
    username: username,
  });
  fs.writeFileSync("./sessions.json", JSON.stringify(sessions));
  res.writeHead(302, {
    "Set-Cookie": `session=${sessionId}; HttpOnly`,
    Location: "/",
  });
  res.end();
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const users = JSON.parse(fs.readFileSync("./users.json"));
  const user = users.find((user) => user.username === username);
  if (user) {
    res.send("User already exists");
    return;
  }
  users.push({
    id: Math.floor(Math.random() * 900000),
    username: username,
    password: password,
  });

  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
