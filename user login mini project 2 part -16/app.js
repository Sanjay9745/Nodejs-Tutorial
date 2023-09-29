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
        const user = users.find((user)=>user.username === username);
        if(user){
            res.writeHead(409,{"Content-Type":"text/html"});
            res.end("User already exists");
            return;
        }
        users.push({
          id: users.length + 1,
          username,
          password,
        });
        fs.writeFile(
          path.join(__dirname, "users.json"),
          JSON.stringify(users),
          (err) => {
            if (err) throw err;
            res.writeHead(201, { Location: "/" });
            res.end();
          }
        );
      });
    });
  }else if(url === "/login" && method === "GET"){
    fs.readFile(path.join(__dirname,"login.html"),(err,data)=>{
      if(err) throw err;
      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(data);
    })
}else if(url === "/login" && method==="POST"){
    let body = "";
    req.on("data",(chunk)=>{
        body += chunk;
    })
    req.on("end",()=>{
        const obj = parseBody(body);
        const username = obj.username;
        const password = obj.password;
        fs.readFile(path.join(__dirname,"users.json"),(err,data)=>{
            if(err) throw err;
            const users = JSON.parse(data);
           const user = findUser(users,username,password)

          
            if(user){
                res.writeHead(200,{"Content-Type":"text/html"});
                res.end("Login Success");
            }
            else{
                res.writeHead(401,{"Content-Type":"text/html"});
                res.end("Login Failed");
            }
        })
    })
}else if(url==="/" && method==="GET"){
    fs.readFile(path.join(__dirname,"index.html"),(err,data)=>{
        if(err) throw err;
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data);
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
function findUser(users,username,password){
    for(let user of users){
        if(user.username === username && user.password === password){
            return user;
        }
    }
    return null;
}